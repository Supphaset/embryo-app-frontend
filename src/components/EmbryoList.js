import React from 'react'
import { Row, Col, Button, ListGroup, Image, ButtonGroup} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {Delete, AddCircle, DoDisturbOn, Block, Undo} from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { deleteEmbryo, updateEmbryoStatus } from '../actions/embryoActions'

const patients = [
  {
    hospitalNo: '1',
    ivfNo:'1',
    fmName:'Supphaset Engphaiboon',
    fmAge:25,
    fmBmi:'Unknown',
    icsiNo:'Unknown',
    typeGanad:'Unknown',
    startDose:'Unknown',
    durationSim:'Unknown',
    amhLv:'Unknown',
    fshBsLv:'Unknown',
    mName:'Unknown',
    mAge:'Unknown',
    mBmi:'Unknown',
    tc:'Unknown',
    motility:'Unknown',
    pMotility:'Unknown',
    nMotility:'Unknown',
    semenAnalysis:'Unknown',
    embryos:[
      {
        imgPath:'/embryo-app-frontend/images/embryo_img.png',
        imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
        embryoId:'1',
        viablity:87,
        stage:'Blastocyst',
        icm:'Good',
        te:'Good',
        status:'transfered',
        transferedImage:'/embryo-app-frontend/images/embryo_img.png',
        success:''
      }
    ]
  },
  {
    hospitalNo: '2',
    ivfNo:'2',
    fmName:'Supphaset Engphaiboon',
    fmAge:25,
    fmBmi:'Unknown',
    icsiNo:'Unknown',
    typeGanad:'Unknown',
    startDose:'Unknown',
    durationSim:'Unknown',
    amhLv:'Unknown',
    fshBsLv:'Unknown',
    mName:'Unknown',
    mAge:'Unknown',
    mBmi:'Unknown',
    tc:'Unknown',
    motility:'Unknown',
    pMotility:'Unknown',
    nMotility:'Unknown',
    semenAnalysis:'Unknown',
    embryos:[
        {
        imgPath:'/embryo-app-frontend/images/embryo_img.png',
        imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
        embryoId:'1',
        viablity:82,
        stage:'Blastocyst',
        icm:'Good',
        te:'Good',
        pStage:'Blastocyst',
        pIcm:'Good',
        pTe:'Good',
        patientId:'1',
        status:'freeze',
        transferedImage:'',
        success:''
      },
      {
        imgPath:'/embryo-app-frontend/images/embryo_img.png',
        imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
        embryoId:'2',
        viablity:85,
        stage:'',
        icm:'',
        te:'',
        pStage:'Blastocyst',
        pIcm:'Good',
        pTe:'Good',
        patientId:'1',
        status:'transfered',
        transferedImage:'',
        success:'Success'
      },
      {
        imgPath:'/embryo-app-frontend/images/embryo_img.png',
        imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
        embryoId:'3',
        viablity:23,
        stage:'',
        icm:'',
        te:'',
        pStage:'Blastocyst',
        pIcm:'Poor',
        pTe:'Poor',
        patientId:'1',
        status:'discarded',
        transferedImage:'',
        success:''
      }
    ]
  },
  {
    hospitalNo: '3',
    ivfNo:'3',
    fmName:'Supphaset Engphaiboon',
    fmAge:25,
    fmBmi:'Unknown',
    icsiNo:'Unknown',
    typeGanad:'Unknown',
    startDose:'Unknown',
    durationSim:'Unknown',
    amhLv:'Unknown',
    fshBsLv:'Unknown',
    mName:'Unknown',
    mAge:'Unknown',
    mBmi:'Unknown',
    tc:'Unknown',
    motility:'Unknown',
    pMotility:'Unknown',
    nMotility:'Unknown',
    semenAnalysis:'Unknown',
    embryos:[]
  },
]

const EmbryoList = () => {

  const {id} = useParams()
  const embryos = patients.find((p)=> p.hospitalNo === id).embryos.sort((a,b) => b.viablity - a.viablity)
  const embryosList = embryos.filter((e)=> e.status === 'freeze')
  const embryosTransfered = embryos.filter((e)=> e.status === 'transfered')
  const embryosDiscared = embryos.filter((e)=> e.status === 'discarded')
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }

  return (
    <Col className='center-div'>
        <EmbryoListComponent embryosList={embryosList} embryoStatus={'Embryo'} id={id}/>
        <Button onClick={() => handleClick(`/embryo-app-frontend/embryoform/${id}`)} variant="primary" className="">Add Embryo</Button>
        <EmbryoListComponent embryosList={embryosTransfered} embryoStatus={'Transfered Embryo'} id={id}/>
        <EmbryoListComponent embryosList={embryosDiscared} embryoStatus={'Discarded Embryo'} id={id}/>
    </Col>
  )
}

const EmbryoListComponent = (props) =>{
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }
  const id = props.id

  const statusHandler = (embryoId,embryoStatus) => {
    dispatch(updateEmbryoStatus(embryoId,embryoStatus))
  }

  const deleteHandler = (embryoId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEmbryo(embryoId))
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
              <ListGroup.Item action onClick={() => handleClick(`/embryo-app-frontend/embryo/${embryo.embryoId}`)}>
                <Row>
                  <Col md={4}>
                      <Image src={embryo.imgPath} alt={embryo.imgName} fluid rounded/>
                  </Col>
                  <Col className='embryolist'>
                      <Row>
                          <Col md={5}><h6>Embryo ID</h6></Col>
                          <Col>{embryo.embryoId}</Col>
                      </Row>
                      <Row>
                          <Col md={5}><h6>Viablity</h6></Col>
                          <Col>{embryo.viablity}%</Col>
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
                        embryo.success !== ''?
                        <Row>
                          <Col md={5}><h6>Status</h6></Col>
                          <Col>
                            {embryo.success}
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
                  embryo.status=== 'discarded' ?
                  <Button type='button' variant='light' onClick={() => statusHandler(embryo.embryoId,'discarded')} >
                    <Undo/>
                  </Button>
                  :
                  <Button type='button' variant='warning' onClick={() => statusHandler(embryo.embryoId,'discarded')} >
                    <Block/>
                  </Button>                 
                }

                {
                  embryo.status=== 'transfered' ?
                  <Button type='button' variant='light' onClick={() => statusHandler(embryo.embryoId,'transfered')} >
                    <Undo/>
                  </Button>
                  :
                  <Button type='button' variant='success' onClick={() => statusHandler(embryo.embryoId,'transfered')} >
                    <AddCircle/>
                  </Button>
                }

                <Button type='button' variant='danger' onClick={() => deleteHandler(embryo.embryoId)}>
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