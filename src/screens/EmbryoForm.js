import React, { useEffect, useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmbryo } from '../actions/embryoActions';
import { EMBRYO_CREATE_RESET } from '../constants/embryoConstants';
import AWS from 'aws-sdk'
import { listPatientsDetails } from '../actions/patientActions';
import Spinner from 'react-bootstrap/Spinner'

AWS.config.update({
  accessKeyId: 'AKIAQ564KCCVNAOD3ZOK',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
  signatureVersion: 'v4',
});


const EmbryoForm = () => {
  const {patientHN} = useParams()
  const dispatch = useDispatch()
  const nevigate = useNavigate();
  const s3 = new AWS.S3();

  function handleClick(path) {
    nevigate(path);
  }

  const [embryoNo,setEmbryoNo] = useState('')
  const [stage,setStage] = useState('')
  const [icm,setIcm] = useState('')
  const [te,setTe] = useState('')
  const [file,setFile] = useState(null)
  const [patientAge,setPatientAge] = useState(28)

  const patientDetail = useSelector((state) => state.patientDetail)
  const { loading, error, patient } = patientDetail

  const embryoCreate = useSelector((state) => state.embryoCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate
  } = embryoCreate

  useEffect(() => {
    if (successCreate){
      dispatch({type: EMBRYO_CREATE_RESET})
      nevigate(`/embryo-app-frontend/embryo/${patientHN}/${embryoNo}`)
    }else if(!patient.fmHN||patient.fmHN !== patientHN) {
      dispatch(listPatientsDetails(patientHN))
    }else{
      setPatientAge(patient.fmAge)
    }
  },[dispatch,patientHN,successCreate,patient])

  const handleFileInput = (e) => {
      setFile(e.target.files[0]);
  }

  const uploadToS3NPredict = async () => {
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'embryos-project-s3', 
      Key: `${patientHN}_${embryoNo}.${file.name.split('.').pop()}`, 
      Body: file 
    };
    const { Location } = await s3.upload(params).promise();
    console.log('uploading to s3', Location);
    dispatch(
      createEmbryo({
        patientHN,
        patientAge,
        embryoNo,
        embryoImg:`${patientHN}_${embryoNo}.${file.name.split('.').pop()}`,
        stage,
        icm,
        te
      })
    )
  }
  

  const submitHandler = (e) => {
    e.preventDefault()
    uploadToS3NPredict()
  }
  

  return (
    <div>
    <div className='form'>
    <h4 className='head-form'>EmbryoForm</h4>
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="embryoNo" className="mb-3">
        <Form.Label>Embryo No.</Form.Label>
        <Form.Control type="text"  placeholder="Embryo No." value={embryoNo} onChange={(e) => setEmbryoNo(e.target.value)} required/>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3" onChange={handleFileInput}>
        <Form.Label>Embryo Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Row>
        <Col>
            <Form.Group controlId="stage" className="mb-3">
                <Form.Label>Stage</Form.Label>
                <Form.Control type="text" placeholder="Optional" value={stage} onChange={(e) => setStage(e.target.value)}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="icm" className="mb-3">
                <Form.Label>ICM</Form.Label>
                <Form.Control type="text"  placeholder="Optional" value={icm} onChange={(e) => setIcm(e.target.value)}/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="te" className="mb-3">
                <Form.Label>TE</Form.Label>
                <Form.Control type="text"  placeholder="Optional" value={te} onChange={(e) => setTe(e.target.value)}/>
            </Form.Group>
        </Col>
      </Row>
      <div className="d-grid gap-2 formbt">
        { loadingCreate ?
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        : <Button variant="primary" type="submit" >Submit</Button>
        }
      </div>
    </Form>
    </div>
     <Button onClick={() => handleClick(`/embryo-app-frontend/patient/${patientHN}`)}>Patient Profile</Button>
    </div>
  )
}

export default EmbryoForm