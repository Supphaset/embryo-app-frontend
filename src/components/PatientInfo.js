import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Row,Col, Button,Form} from 'react-bootstrap'
import { listPatientsDetails, updatePatient } from '../actions/patientActions'
import { useDispatch, useSelector } from 'react-redux'

const PatientInfo = () => {
  const {patientHN} = useParams()
  const dispatch = useDispatch()

  const patientDetail = useSelector((state) => state.patientDetail)
  const { loading, error, patient } = patientDetail

  const [fmName, setFmName] = useState('')
  const [fmHN,setFmHN] = useState('')
  const [ivfNo,setIvfNo] = useState('')
  const [fmAge,setFmAge] = useState('')
  const [fmBmi,setFmBmi] = useState('')
  const [icsiNo,setIcsiNo] = useState('')
  const [typeGanad,setTypeGanad] = useState('')
  const [startDose,setStartDose] = useState('')
  const [durationSim,setDurationSim] = useState('')
  const [amhLv,setAmhLv] = useState('')
  const [fshBsLv,setFshBsLv] = useState('')
  const [mHN,setMHN] = useState('')
  const [mName,setMName] = useState('')
  const [mAge,setMAge] = useState('')
  const [mBmi,setMBmi] = useState('')
  const [tc,setTc] = useState('')
  const [motility,setMotility] = useState('')
  const [pMotility,setPMotility] = useState('')
  const [nMotility,setNMotility] = useState('')
  const [remark,setRemark] = useState('')

  useEffect(() =>{
    if (!patient.fmHN||patient.fmHN !== patientHN) {
      dispatch(listPatientsDetails(patientHN))
    }else{
      setFmName(patient.fmName)
      setFmHN(patient.fmHN)
      setIvfNo(patient.ivfNo)
      setFmAge(patient.fmAge)
      setFmBmi(patient.fmBmi)
      setIcsiNo(patient.icsiNo)
      setTypeGanad(patient.typeGanad)
      setStartDose(patient.startDose)
      setDurationSim(patient.durationSim)
      setAmhLv(patient.amhLv)
      setFshBsLv(patient.fshBsLv)
      setMHN(patient.mHN)
      setMName(patient.mName)
      setMAge(patient.mAge)
      setMBmi(patient.mBmi)
      setTc(patient.tc)
      setMotility(patient.motility)
      setPMotility(patient.pMotility)
      setNMotility(patient.nMotility)
      setRemark(patient.remark)
    }
  },[dispatch,patient])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePatient({
        fmName,
        fmHN,
        ivfNo,
        fmAge,
        fmBmi,
        icsiNo,
        typeGanad,
        startDose,
        durationSim,
        amhLv,
        fshBsLv,
        mHN,
        mName,
        mAge,
        mBmi,
        tc,
        motility,
        pMotility,
        nMotility,
        remark
      })
    )
  }

  return (
    <Col className='center-div '>
    <div className='patient-profile center-div'>
        <h4>Patient Information</h4>
        <div className='patient-info'>
        <Form  id='editForm' onSubmit={submitHandler}>
            <h4>Female</h4>
            <Row className="mb-3">
            <Form.Group as={Col} xs={2} controlId="hospitalNo">
                <Form.Label>Hospital No.</Form.Label>
                <Form.Control type="text" placeholder="HN" required size="sm" value={fmHN} onChange={(e) => setFmHN(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} xs={2} controlId="id">
                <Form.Label>IVF No.</Form.Label>
                <Form.Control type="text" placeholder="IVF No." required size="sm" value={ivfNo} onChange={(e) => setIvfNo(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" required size="sm" value={fmName} onChange={(e) => setFmName(e.target.value)}/>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="age" >
            <Form.Label>Age (at OPU)</Form.Label>
            <Form.Control placeholder="Age" required size="sm"  value={fmAge} onChange={(e) => setFmAge(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="bmi">
            <Form.Label>BMI</Form.Label>
            <Form.Control placeholder="BMI" required size="sm" value={fmBmi} onChange={(e) => setFmBmi(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="bmi">
            <Form.Label>ICSI Cycle No.</Form.Label>
            <Form.Control placeholder="ICSI Cycle No." required size="sm" value={icsiNo} onChange={(e) => setIcsiNo(e.target.value)}/>
            </Form.Group>

            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="age">
            <Form.Label>Type of Ganadotropin</Form.Label>
            <Form.Control placeholder="Type of Ganadotropin" required size="sm" value={typeGanad} onChange={(e) => setTypeGanad(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="bmi">
            <Form.Label>Starting Dose</Form.Label>
            <Form.Control placeholder="Starting Dose" required size="sm" value={startDose} onChange={(e) => setStartDose(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="bmi" size="sm">
            <Form.Label>Duration of Simulation</Form.Label>
            <Form.Control placeholder="Duration of Simuation" required size="sm" value={durationSim} onChange={(e) => setDurationSim(e.target.value)}/>
            </Form.Group>

            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="age">
            <Form.Label>AMH Level</Form.Label>
            <Form.Control placeholder="AMH Level" required size="sm" value={amhLv} onChange={(e) => setAmhLv(e.target.value)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="bmi">
            <Form.Label>FSH Baseline Level</Form.Label>
            <Form.Control placeholder="FSH Baseline Level" required size="sm" value={fshBsLv} onChange={(e) => setFshBsLv(e.target.value)}/>
            </Form.Group>
            </Row>

            <h4>Male</h4>
            <Row className="mb-3">
            <Form.Group as={Col} xs={3} controlId="name">
                <Form.Label>Hospital No.</Form.Label>
                <Form.Control type="text" placeholder="Name" required size="sm" value={mHN} onChange={(e) => setMHN(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" required size="sm" value={mName} onChange={(e) => setMName(e.target.value)}/>
            </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}  controlId="name">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" placeholder="Age" required size="sm" value={mAge} onChange={(e) => setMAge(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
                <Form.Label>BMI</Form.Label>
                <Form.Control type="text" placeholder="BMI" required size="sm" value={mBmi} onChange={(e) => setMBmi(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
                <Form.Label>TC (M/ml)</Form.Label>
                <Form.Control type="text" placeholder="TC (M/ml)" required size="sm" value={tc} onChange={(e) => setTc(e.target.value)}/>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
                <Form.Label>Motility (%)</Form.Label>
                <Form.Control type="text" placeholder="Motility (%)" required size="sm" value={motility} onChange={(e) => setMotility(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
                <Form.Label>Progressive Motility (%)</Form.Label>
                <Form.Control type="text" placeholder="Progressive motility (%)" required size="sm" value={pMotility} onChange={(e) => setPMotility(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
                <Form.Label>Normal Morphology (%)</Form.Label>
                <Form.Control type="text" placeholder="Normal morphology (%)" required size="sm" value={nMotility} onChange={(e) => setNMotility(e.target.value)}/>
            </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Remark</Form.Label>
                <Form.Control as="textarea" placeholder="Remark"  size="sm" value={remark} onChange={(e) => setRemark(e.target.value)}/>
            </Form.Group>
            </Row>
        </Form>
        </div>
    </div>
    <Button variant="primary" type='submit' form='editForm'> Edit Profile</Button>
    </Col>
  )
}

export default PatientInfo