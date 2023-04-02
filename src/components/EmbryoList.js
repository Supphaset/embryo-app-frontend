import React from 'react'
import { Row, Col, Button, ListGroup, Image} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

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
        te:'Good'
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
        patientId:'1'
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
        patientId:'1'
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
        patientId:'1'
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

  return (
    <Col className='center-div'>
        <div className='patient-profile center-div'>
          <h4>Embryo</h4>
          <ListGroup>
            {embryos.map((embryo)=>(
              <Row>
                <Col>
              <ListGroup.Item action href={`/embryo-app-frontend/embryo/${id}/${embryo.embryoId}`}>
                <Row>
                  <Col md={4}>
                      <Image src={embryo.imgPath} alt={embryo.imgName} fluid rounded/>
                  </Col>
                  <Col className='embryolist'>
                      <Row>
                          <Col md={4}><h6>Embryo ID</h6></Col>
                          <Col>{embryo.embryoId}</Col>
                      </Row>
                      <Row>
                          <Col md={4}><h6>Viablity</h6></Col>
                          <Col>{embryo.viablity}%</Col>
                      </Row>
                      <Row>
                          <Col md={4}><h6>Stage</h6></Col>
                          <Col>{embryo.stage=== '' ? `${embryo.pStage} (predicted)` : embryo.stage }</Col>
                      </Row>
                      <Row>
                          <Col md={4}><h6>ICM</h6></Col>
                          <Col>{embryo.icm=== '' ? `${embryo.pIcm} (predicted)` : embryo.icm }</Col>
                      </Row>
                      <Row>
                          <Col md={4}><h6>TE</h6></Col>
                          <Col>{embryo.te=== '' ? `${embryo.pTe} (predicted)` : embryo.te }</Col>
                      </Row>
                  </Col>
                  {/* <Col md={1}>
                    <Button type='button' variant='danger' className='delete' ></Button>
                  </Col> */}
                </Row>
              </ListGroup.Item>
              </Col>


                  <Col md={1}>
                    <Button type='button' variant='danger' className='delete' ></Button>
                  </Col>
                  </Row>
            ))}
          </ListGroup>
        </div>
        <Button href={`/embryo-app-frontend/embryoform/${id}`} variant="primary" className="">Add Embryo</Button>
    </Col>
  )
}

export default EmbryoList