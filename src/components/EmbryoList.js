import React from 'react'
import { Row, Col, Button, ListGroup, Image} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {Delete, AddCircle, DoDisturbOn} from '@mui/icons-material'

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
        transfered:true,
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
        transfered:false,
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
        transfered:true,
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
        transfered:false,
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
  const embryosList = embryos.filter((e)=> !e.transfered)
  const embryosTransfered = embryos.filter((e)=> e.transfered)
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }

  return (
    <Col className='center-div'>
        <EmbryoListComponent embryosList={embryosList} transfered={false} id={id}/>
        <Button onClick={() => handleClick(`/embryo-app-frontend/embryoform/${id}`)} variant="primary" className="">Add Embryo</Button>
        <EmbryoListComponent embryosList={embryosTransfered} transfered={true} id={id}/>
    </Col>
  )
}

const EmbryoListComponent = (props) =>{
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }
  const id = props.id
  
  return (
    <div className='patient-profile center-div'>
          <h4>
            {props.transfered=== false ? 'Embryo' : 'Transfered Embryo'}
          </h4>
          <ListGroup>
            {props.embryosList.map((embryo)=>(
              <Row>
                <Col>
              <ListGroup.Item action onClick={() => handleClick(`/embryo-app-frontend/embryo/${id}/${embryo.embryoId}`)}>
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
              <Col md={1}>
                {
                  embryo.transfered=== false ?
                  <Button type='button' variant='success' className='delete' >
                    <AddCircle/>
                  </Button>
                  :
                  <Button type='button' variant='light' className='delete' >
                    <DoDisturbOn/>
                  </Button>
                }
                
              </Col>
              <Col md={1}>
                <Button type='button' variant='danger' className='delete' >
                  <Delete/>
                </Button>
              </Col>
            </Row>
            ))}
          </ListGroup>
        </div>
  )
}

export default EmbryoList