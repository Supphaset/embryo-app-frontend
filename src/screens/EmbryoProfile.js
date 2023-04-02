import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Image, Button, } from 'react-bootstrap'
import ProgressBar from '../components/ViabilityChart'
import { useNavigate } from 'react-router-dom'

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

const EmbryoProfile = () => {
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }

  const {patientid, embryoid} = useParams()
  const embryos = patients.find((p)=> p.hospitalNo === patientid).embryos
  const embryo = embryos.find((e)=> e.embryoId === embryoid)
  return (
    <>
        <Row  className='my-3'>
            <Col>
                <div className='embryoInfo'>
                <Row>
                <h5>Embryo Information</h5>
                <div className='div-embryoInfo'>
                    <Image src={embryo.imgPath} alt={embryo.imgName} fluid rounded width="50%"/>
                </div>
                </Row>
                <Row>
                    <Col>{embryo.stage !== '' ? <div className='div-embryoInfotext'><h6>Stage</h6><p>{embryo.stage}</p></div>: null}</Col>
                    <Col>{embryo.icm !== '' ? <div className='div-embryoInfotext'><h6>ICM</h6><p>{embryo.icm}</p></div>: null}</Col>
                    <Col>{embryo.te !== '' ? <div className='div-embryoInfotext'><h6>TE</h6><p>{embryo.te}</p></div>: null}</Col>
                </Row>
                </div>
                <div className='my-3'>
                    <Button onClick={() => handleClick(`/embryo-app-frontend/patient/${patientid}`)}>Patient Profile</Button>
                </div>
            </Col>
            <Col className='embryoPred'>
                <Row>
                
                <div className='div-embryoInfo'>
                    <Image src={embryo.imgGradPath} alt='Grad Cam Image' fluid rounded width="50%"/>
                    <h6 className='embryoPredh'>Grad Cam Image</h6>
                </div>
                </Row>
                <h5 className='embryoPredh'>Prediction Result</h5>
                <Row className='div-embryoInfotext'>
                    <h6 >Viablity</h6>
                    <ProgressBar  value={embryo.viablity*0.01}/>
                    <Row className='my-3'>
                        <Col className='pred-val'>
                            <h6>Stage</h6>
                            <p>{embryo.pStage}</p>
                        </Col>
                        <Col className='pred-val'>
                            <h6>ICM</h6>
                            <p>{embryo.pIcm}</p>
                        </Col>
                        <Col className='pred-val'>
                            <h6>TE</h6>
                            <p>{embryo.pTe}</p>
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Row>
        
    </>
  )
}

export default EmbryoProfile