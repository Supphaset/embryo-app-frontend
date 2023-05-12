import React, { useEffect } from 'react'
import { Button, Row } from 'react-bootstrap'
import PatientInfo from '../components/PatientInfo'
import EmbryoList from '../components/EmbryoList'
import { deletePatient, listPatientsDetails } from '../actions/patientActions'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PATIENT_DELETE_RESET } from '../constants/patientConstants'


const PatientProfile = () => {
  const {patientHN} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const patientDelete = useSelector((state) => state.patientDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = patientDelete

  const deleteHandler = (patientHN) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePatient(patientHN))
    }
  }

  useEffect(() =>{
    if(successDelete){
      dispatch({ type: PATIENT_DELETE_RESET})
      navigate('/embryo-app-frontend')
    }
  })



  return (
    <div>
    <Row className='my-3'>
      <PatientInfo/>
      <EmbryoList/>
    </Row>
    <Button variant='danger' onClick={() => deleteHandler(patientHN)}>Delete Profile</Button>
    </div>
  )
}

export default PatientProfile