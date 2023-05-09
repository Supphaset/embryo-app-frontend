import React, { useEffect } from 'react'
import { Row, Col, Button, ListGroup, Image, ButtonGroup} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {Delete, AddCircle, Block, Undo} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmbryo, listEmbryos, updateEmbryoStatus } from '../actions/embryoActions'

// const patients = [
//   {
//     hospitalNo: '1',
//     ivfNo:'1',
//     fmName:'Supphaset Engphaiboon',
//     fmAge:25,
//     fmBmi:'Unknown',
//     icsiNo:'Unknown',
//     typeGanad:'Unknown',
//     startDose:'Unknown',
//     durationSim:'Unknown',
//     amhLv:'Unknown',
//     fshBsLv:'Unknown',
//     mName:'Unknown',
//     mAge:'Unknown',
//     mBmi:'Unknown',
//     tc:'Unknown',
//     motility:'Unknown',
//     pMotility:'Unknown',
//     nMotility:'Unknown',
//     semenAnalysis:'Unknown',
//     embryos:[
//       {
//         imgPath:'/embryo-app-frontend/images/embryo_img.png',
//         imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
//         embryoId:'1',
//         viablity:87,
//         stage:'Blastocyst',
//         icm:'Good',
//         te:'Good',
//         status:'transfered',
//         transferedImage:'/embryo-app-frontend/images/embryo_img.png',
//         success:''
//       }
//     ]
//   },
//   {
//     hospitalNo: '2',
//     ivfNo:'2',
//     fmName:'Supphaset Engphaiboon',
//     fmAge:25,
//     fmBmi:'Unknown',
//     icsiNo:'Unknown',
//     typeGanad:'Unknown',
//     startDose:'Unknown',
//     durationSim:'Unknown',
//     amhLv:'Unknown',
//     fshBsLv:'Unknown',
//     mName:'Unknown',
//     mAge:'Unknown',
//     mBmi:'Unknown',
//     tc:'Unknown',
//     motility:'Unknown',
//     pMotility:'Unknown',
//     nMotility:'Unknown',
//     semenAnalysis:'Unknown',
//     embryos:[
//         {
//         imgPath:'/embryo-app-frontend/images/embryo_img.png',
//         imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
//         embryoId:'1',
//         viablity:82,
//         stage:'Blastocyst',
//         icm:'Good',
//         te:'Good',
//         pStage:'Blastocyst',
//         pIcm:'Good',
//         pTe:'Good',
//         patientId:'1',
//         status:'freeze',
//         transferedImage:'',
//         success:''
//       },
//       {
//         imgPath:'/embryo-app-frontend/images/embryo_img.png',
//         imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
//         embryoId:'2',
//         viablity:85,
//         stage:'',
//         icm:'',
//         te:'',
//         pStage:'Blastocyst',
//         pIcm:'Good',
//         pTe:'Good',
//         patientId:'1',
//         status:'transfered',
//         transferedImage:'',
//         success:'Success'
//       },
//       {
//         imgPath:'/embryo-app-frontend/images/embryo_img.png',
//         imgGradPath:'/embryo-app-frontend/images/grad_cam_img.png',
//         embryoId:'3',
//         viablity:23,
//         stage:'',
//         icm:'',
//         te:'',
//         pStage:'Blastocyst',
//         pIcm:'Poor',
//         pTe:'Poor',
//         patientId:'1',
//         status:'discarded',
//         transferedImage:'',
//         success:''
//       }
//     ]
//   },
//   {
//     hospitalNo: '3',
//     ivfNo:'3',
//     fmName:'Supphaset Engphaiboon',
//     fmAge:25,
//     fmBmi:'Unknown',
//     icsiNo:'Unknown',
//     typeGanad:'Unknown',
//     startDose:'Unknown',
//     durationSim:'Unknown',
//     amhLv:'Unknown',
//     fshBsLv:'Unknown',
//     mName:'Unknown',
//     mAge:'Unknown',
//     mBmi:'Unknown',
//     tc:'Unknown',
//     motility:'Unknown',
//     pMotility:'Unknown',
//     nMotility:'Unknown',
//     semenAnalysis:'Unknown',
//     embryos:[]
//   },
// ]

const EmbryoList = () => {
  const dispatch = useDispatch()
  const {patientHN} = useParams()
  const nevigate = useNavigate();
 
  const embryos = useSelector((state)=>state.embryoList)
  const { loading, error, embryosList, embryosTransfered, embryosDiscared } = embryos

  const embryosStatus = useSelector((state)=>state.embryoStatus)
  const { success } = embryosStatus

  useEffect(()=>{
    dispatch(listEmbryos(patientHN))
  },[dispatch,success])

  
  
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
  function handleClick(path) {
    nevigate(path);
  }

  const statusHandler = (embryo,embryoStatus) => {
    dispatch(updateEmbryoStatus(embryo.patientHN,embryo.embryoNo,embryoStatus))
  }

  const deleteHandler = (embryo) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteEmbryo(embryo.patientHN,embryo.embryoNo))
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