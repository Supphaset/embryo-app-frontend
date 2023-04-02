import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'

const patients = [
  {
    hospitalNo: '1',
    ivfNo:'1',
    name:'Supphaset Engphaiboon'
  },
  {
    hospitalNo: '2',
    ivfNo:'2',
    name:'Supphaset Engphaiboon'
  },
  {
    hospitalNo: '3',
    ivfNo:'3',
    name:'Supphaset Engphaiboon'
  },
]

function PatientList() {
  return (
    <div className='table'>
    <Table striped bordered hover size="l" padding>
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
          <tr>
            <td>{patient.hospitalNo}</td>
            <td>{patient.ivfNo}</td>
            <td>{patient.name}</td>
            <td><Link to={`/patient/${patient.ivfNo}`}>Patient Profile</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <div className="text-center">
      <Button href="/patientform" variant="primary" className="">Add Patient</Button>
    </div>
      
    </div>
  );
}

export default PatientList;
