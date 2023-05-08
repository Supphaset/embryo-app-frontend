import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { listPatients } from '../actions/patientActions';

function PatientList() {
  const nevigate = useNavigate()
  const dispatch = useDispatch()

  function handleClick(path) {
    nevigate(path);
  }

  useEffect(()=>{
    dispatch(listPatients())
  },[dispatch])

  const patientList = useSelector((state)=>state.patientList)
  const { loading, error, patients } = patientList

  return (
    <div className='table'>
    <Table striped bordered hover size="l" >
      <thead>
        <tr>
          <th>Hospital No.</th>
          <th>IVF No.</th>
          <th>Name</th>
          <th>Patient Profile</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient)=>(
          <tr key={patient.fmHN}>
            <td>{patient.fmHN}</td>
            <td>{patient.ivfNo}</td>
            <td>{patient.fmName}</td>
            <td><Link to={`/embryo-app-frontend/patient/${patient.fmHN}`}>Patient Profile</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <div className="text-center">
      <Button onClick={() => handleClick("/embryo-app-frontend/patientform")}  variant="primary" className="">Add Patient</Button>
    </div>
      
    </div>
  );
}

export default PatientList;
