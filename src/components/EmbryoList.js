import React, { useEffect } from 'react'
import { Row, Col, Button, ListGroup, Image, ButtonGroup} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {Delete, AddCircle, Block, Undo} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmbryo, listEmbryos, updateEmbryoStatus } from '../actions/embryoActions'
import AWS from 'aws-sdk'
import { EMBRYO_DETAIL_RESET } from '../constants/embryoConstants'

AWS.config.update({
  accessKeyId: 'AKIAQ564KCCVNAOD3ZOK',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
  signatureVersion: 'v4',
});

const EmbryoList = () => {
  const dispatch = useDispatch()
  const {patientHN} = useParams()
  const nevigate = useNavigate();
 
  const embryos = useSelector((state)=>state.embryoList)
  const { loading, error, embryosList, embryosTransfered, embryosDiscared } = embryos

  const embryosStatus = useSelector((state)=>state.embryoStatus)
  const { success } = embryosStatus

  const embryoDelete = useSelector((state) => state.embryoDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = embryoDelete

  useEffect(()=>{
    dispatch(listEmbryos(patientHN))
  },[dispatch,success,successDelete])
  
  function handleClick(path) {
    nevigate(path);
  }

  return (
    <Col className='center-div'>
        <EmbryoListComponent key={'embryoList'} embryosList={embryosList} embryoStatus={'Embryo'}/>
        <Button onClick={() => handleClick(`/embryo-app-frontend/embryoform/${patientHN}`)} variant="primary" className="">Add Embryo</Button>
        <EmbryoListComponent key={'transfered'} embryosList={embryosTransfered} embryoStatus={'Transfered Embryo'} />
        <EmbryoListComponent key={'discarded'} embryosList={embryosDiscared} embryoStatus={'Discarded Embryo'} />
    </Col>
  )
}

const EmbryoListComponent = (props) =>{
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const s3Bucket = 'https://embryos-project-s3.s3.ap-southeast-2.amazonaws.com/'
  const s3 = new AWS.S3();
  function handleClick(path) {
    nevigate(path);
  }

  const statusHandler = async (embryo,embryoStatus) => {
    await dispatch(updateEmbryoStatus(embryo.patientHN,embryo.embryoNo,embryoStatus))
    dispatch({type:EMBRYO_DETAIL_RESET})
  }

  const deleteHandler = async (embryo) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEmbryo(embryo.patientHN,embryo.embryoNo))
      const params_img = { 
        Bucket: 'embryos-project-s3', 
        Key: embryo.embryoImg
      };
      await s3.deleteObject(params_img).promise();
      const params_grad = { 
        Bucket: 'embryos-project-s3', 
        Key: embryo.embryoGradImg
      };
      await s3.deleteObject(params_grad).promise();
    }
  }
  
  return (
    <div className='patient-profile center-div'>
          <h4>
            {props.embryoStatus}
          </h4>
          <ListGroup>
            {props.embryosList.map((embryo)=>(
              <Row >
                <Col>
              <ListGroup.Item key={embryo.embryoNo} action onClick={() => handleClick(`/embryo-app-frontend/embryo/${embryo.patientHN}/${embryo.embryoNo}`)}>
                <Row>
                  <Col md={4}>
                      <Image src={`${s3Bucket}${embryo.embryoImg}`} alt={embryo.embryoNo} fluid rounded/>
                  </Col>
                  <Col className='embryolist'>
                      <Row>
                          <Col md={5}><h6>Embryo ID</h6></Col>
                          <Col>{embryo.embryoNo}</Col>
                      </Row>
                      <Row>
                          <Col md={5}><h6>Viability</h6></Col>
                          <Col>{Math.round(embryo.viability*10000)/100}%</Col>
                      </Row>
                      <Row>
                          <Col md={5}><h6>Stage</h6></Col>
                          <Col>{embryo.stage=== '' ? `${embryo.pStage} (predicted)` : embryo.stage }</Col>
                      </Row>
                      <Row>
                          <Col md={5}><h6>ICM</h6></Col>
                          <Col>{embryo.icm=== '' ? `${embryo.pIcm} (predicted)` : embryo.icm }</Col>
                      </Row>
                      <Row>
                          <Col md={5}><h6>TE</h6></Col>
                          <Col>{embryo.te=== '' ? `${embryo.pTe} (predicted)` : embryo.te }</Col>
                      </Row>
                      {
                        embryo.embryoSuccess !== ''?
                        <Row>
                          <Col md={5}><h6>Status</h6></Col>
                          <Col>
                            {embryo.embryoSuccess}
                          </Col>
                        </Row>:<></>
                      }
                  </Col>
                </Row>
              </ListGroup.Item>
              </Col>
              <Col md={2}>
                <ButtonGroup vertical className='verticalbtn'>
                {
                  embryo.embryoStatus=== 'discarded' ?
                  <Button type='button' variant='light' onClick={() => statusHandler(embryo,'freeze')} >
                    <Undo/>
                  </Button>
                  :
                  <Button type='button' variant='warning' onClick={() => statusHandler(embryo,'discarded')} >
                    <Block/>
                  </Button>                 
                }

                {
                  embryo.embryoStatus=== 'transfered' ?
                  <Button type='button' variant='light' onClick={() => statusHandler(embryo,'freeze')} >
                    <Undo/>
                  </Button>
                  :
                  <Button type='button' variant='success' onClick={() => statusHandler(embryo,'transfered')} >
                    <AddCircle/>
                  </Button>
                }

                <Button type='button' variant='danger' onClick={() => deleteHandler(embryo)}>
                  <Delete/>
                </Button>
                </ButtonGroup>
              </Col>
            </Row>
            ))}
          </ListGroup>
        </div>
  )
}

export default EmbryoList