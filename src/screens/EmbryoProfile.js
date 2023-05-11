import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Image, Button, Form } from 'react-bootstrap'
import ProgressBar from '../components/ViabilityChart'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listEmbryosDetails, updateEmbryoSuccess, updateEmbryoTransferedImage } from '../actions/embryoActions'
import AWS from 'aws-sdk'

const EmbryoProfile = () => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick(path) {
    nevigate(path);
  }
  const s3Bucket = 'https://embryos-project-s3.s3.ap-southeast-2.amazonaws.com/'
  const {embryoNo,patientHN} = useParams()
  const s3 = new AWS.S3();
  
  const [isEdit,setIsEdit] = useState(false)
  const [file,setFile] = useState(null)
  const [embryoSuccess,setEmbryoSuccess] = useState('')

  const embryoDetail = useSelector((state) => state.embryoDetail)
  const { loading, error, embryo } = embryoDetail

  useEffect(() =>{
    if (!embryo.embryoNo||embryo.embryoNo!==embryoNo||embryo.patientHN!==patientHN) {
      dispatch(listEmbryosDetails(patientHN,embryoNo))
    }
  },[dispatch,embryo,embryoNo,patientHN])

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'embryos-project-s3', 
      Key: `${patientHN}_${embryoNo}_transfered.${file.name.split('.').pop()}`, 
      Body: file 
    };
    const { Location } = await s3.upload(params).promise();
    console.log('uploading to s3', Location);
    dispatch(
      updateEmbryoTransferedImage(
        embryo.patientHN,
        embryo.embryoNo,
        `${patientHN}_${embryoNo}_transfered.${file.name.split('.').pop()}`
      )
    )
  }

  const handleFileInput = (e) => {
      setFile(e.target.files[0]);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    uploadToS3()
  }

  const submitSuccess = (e) =>{
    e.preventDefault()
    dispatch(
      updateEmbryoSuccess(
        embryo.patientHN,
        embryo.embryoNo,
        embryoSuccess
      )
    )
    setIsEdit(false)
  }

  return (
    <>
        <Row  className='my-3'>
            <Col>
                <div className='embryoInfo'>
                <Row>
                <h4>Embryo Information</h4>
                <div className='div-embryoInfo'>
                    <Image src={`${s3Bucket}${embryo.embryoImg}`} alt={embryo.embryoNo} fluid rounded width="50%"/>
                </div>
                </Row>
                <Row>
                    <Col>{embryo.stage !== '' ? <div className='div-embryoInfotext'><h6>Stage</h6><p>{embryo.stage}</p></div>: null}</Col>
                    <Col>{embryo.icm !== '' ? <div className='div-embryoInfotext'><h6>ICM</h6><p>{embryo.icm}</p></div>: null}</Col>
                    <Col>{embryo.te !== '' ? <div className='div-embryoInfotext'><h6>TE</h6><p>{embryo.te}</p></div>: null}</Col>
                </Row>
                {
                  embryo.embryoStatus==='transfered' ?
                  <>
                    <Row className='my-3' >
                      <h4>Transfered Information</h4>
                    </Row>
                    {
                      embryo.embryoTransferedImg !== "" ?
                      <div className='div-embryoInfo'>
                          <Image src={`${s3Bucket}${embryo.embryoTransferedImg}`} alt='transfered embryo image' fluid rounded width="50%"/>
                      </div>
                      : <Row>
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="formFile" className="mb-3" onChange={handleFileInput}>
                            <Form.Label>Transfered Embryo Image</Form.Label>
                            <Form.Control type="file" />
                          </Form.Group>
                          <Button variant="primary" type="submit" >Submit</Button>
                        </Form>
                      </Row>
                    }
                    {
                      embryo.embryoSuccess === '' || isEdit?
                      <Row className='my-3'>
                        <Col>
                          <h6>Embryo Status:</h6>
                        </Col>
                        <Form onSubmit={submitSuccess}>
                        <Col>
                          <Form.Select size='sm' value={embryoSuccess}
                            onChange={e => {
                              setEmbryoSuccess(e.target.value);
                            }}>
                            <option></option>
                            <option value="success" >Success</option>
                            <option value="fail" >Fail</option>
                          </Form.Select>
                        </Col>
                        <Col>
                          <Button variant="primary" type='submit'>Submit</Button>
                        </Col>
                        </Form>
                      </Row>:<div className='div-embryoInfo my-3'>
                      <Row className='my-3 left'>
                        <Col>
                          <h6>Embryo Status:</h6>
                        </Col>
                        <Col>
                          <p>{embryo.embryoSuccess}</p>
                        </Col>
                        <Col>
                          <Button variant="light" onClick={()=>setIsEdit(true)}>Edit</Button>
                        </Col>
                      </Row>
                      </div>
                    }
                  </>:<></>
                }
                </div>
                <div className='my-3'>
                    <Button onClick={() => handleClick(`/embryo-app-frontend/patient/${embryo.patientHN}`)}>Patient Profile</Button>
                </div>
            </Col>
            <Col className='embryoPred'>
                <Row>
                
                <div className='div-embryoInfo'>
                    <Image src={`${s3Bucket}${embryo.embryoGradImg}`} alt='Grad Cam Image' fluid rounded width="50%"/>
                    <h6 className='embryoPredh'>Grad Cam Image</h6>
                </div>
                </Row>
                <h5 className='embryoPredh'>Prediction Result</h5>
                <Row className='div-embryoInfotext'>
                    <h6 >Viablity</h6>
                    <ProgressBar  value={embryo.viability}/>
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