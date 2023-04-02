import React from 'react'
import { Row } from 'react-bootstrap'
import PatientInfo from '../components/PatientInfo'
import EmbryoList from '../components/EmbryoList'


const PatientProfile = () => {
  return (
    <Row className='my-3'>
      <PatientInfo/>
      <EmbryoList/>
    </Row>
  )
}

export default PatientProfile
{/* <h5>Female</h5>
            <Row className="mb-3">
              <Col md={3}>
                <Row><h6 className='patient-infohead'>Hospital No.</h6></Row>
                <Row className='info-value'>{patient.hospitalNo}</Row>
              </Col>
              <Col md={3}>
                <Row><h6 className='patient-infohead'>IVF No.</h6></Row>
                <Row className='info-value'>{patient.ivfNo}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Name</h6></Row>
                <Row className='info-value'>{patient.fmName}</Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>Age(at OPU)</h6></Row>
                <Row className='info-value'>{patient.fmAge}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>BMI</h6></Row>
                <Row className='info-value'>{patient.fmBmi}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>ICSI Cycle No.</h6></Row>
                <Row className='info-value'>{patient.icsiNo}</Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>AMH Level</h6></Row>
                <Row className='info-value'>{patient.amhLv}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Starting Dose</h6></Row>
                <Row className='info-value'>{patient.startDose}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Duration Simulation</h6></Row>
                <Row className='info-value'>{patient.durationSim}</Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>Type of Ganadotropin</h6></Row>
                <Row className='info-value'>{patient.typeGanad}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>FSH Baseline Level</h6></Row>
                <Row className='info-value'>{patient.fshBsLv}</Row>
              </Col>
            </Row>
            <h5>Male</h5>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>Name</h6></Row>
                <Row className='info-value'>{patient.mName}</Row>
              </Col>
              <Col md={3}>
                <Row><h6 className='patient-infohead'>Age</h6></Row>
                <Row className='info-value'>{patient.mAge}</Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>BMI</h6></Row>
                <Row className='info-value'>{patient.mBmi}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>TC (M/ml)</h6></Row>
                <Row className='info-value'>{patient.tc}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Motility (%)</h6></Row>
                <Row className='info-value'>{patient.motility}</Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Row><h6 className='patient-infohead'>Progressive  Motility (%)</h6></Row>
                <Row className='info-value'>{patient.pMotility}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Normal Motility (%)</h6></Row>
                <Row className='info-value'>{patient.nMOtility}</Row>
              </Col>
              <Col>
                <Row><h6 className='patient-infohead'>Semen Analysis</h6></Row>
                <Row className='info-value'>{patient.semenAnalysis}</Row>
              </Col>
            </Row> */}