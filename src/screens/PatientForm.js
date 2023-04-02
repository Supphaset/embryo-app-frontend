import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PatientForm() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    
  };

  return (
    <div className='form'>
    <h3 className='head-form'>Add Patient</h3>
    <Form onSubmit={handleSubmit} >
      <h4>Female</h4>
      <Row className="mb-3">
        <Form.Group as={Col} xs={2} controlId="id">
          <Form.Label>Hospital No.</Form.Label>
          <Form.Control type="text" placeholder="HN" required size="sm"/>
        </Form.Group>

        <Form.Group as={Col} xs={2} controlId="id">
          <Form.Label>IVF No.</Form.Label>
          <Form.Control type="text" placeholder="IVF No." required size="sm"/>
        </Form.Group>

        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" required size="sm"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="age" >
        <Form.Label>Age (at OPU)</Form.Label>
        <Form.Control placeholder="Age" required size="sm"/>
      </Form.Group>

      <Form.Group as={Col} controlId="bmi">
        <Form.Label>BMI</Form.Label>
        <Form.Control placeholder="BMI" required size="sm"/>
      </Form.Group>

      <Form.Group as={Col} controlId="bmi">
        <Form.Label>ICSI Cycle No.</Form.Label>
        <Form.Control placeholder="ICSI Cycle No." required size="sm"/>
      </Form.Group>

      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="age">
        <Form.Label>Type of Ganadotropin</Form.Label>
        <Form.Control placeholder="Type of Ganadotropin" required size="sm"/>
      </Form.Group>

      <Form.Group as={Col} controlId="bmi">
        <Form.Label>Starting Dose</Form.Label>
        <Form.Control placeholder="Starting Dose" required size="sm"/>
      </Form.Group>

      <Form.Group as={Col} controlId="bmi" size="sm">
        <Form.Label>Duration of Simulation</Form.Label>
        <Form.Control placeholder="Duration of Simuation" required size="sm"/>
      </Form.Group>

      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="age">
        <Form.Label>AMH Level</Form.Label>
        <Form.Control placeholder="AMH Level" required size="sm"/>
      </Form.Group>

      <Form.Group as={Col} controlId="bmi">
        <Form.Label>FSH Baseline Level</Form.Label>
        <Form.Control placeholder="FSH Baseline Level" required size="sm"/>
      </Form.Group>
      </Row>

      <h4>Male</h4>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" required size="sm"/>
        </Form.Group>
        <Form.Group as={Col} xs={3} controlId="name">
          <Form.Label>Age</Form.Label>
          <Form.Control type="text" placeholder="Age" required size="sm"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>BMI</Form.Label>
          <Form.Control type="text" placeholder="BMI" required size="sm"/>
        </Form.Group>
        <Form.Group as={Col} controlId="name">
          <Form.Label>TC (M/ml)</Form.Label>
          <Form.Control type="text" placeholder="TC (M/ml)" required size="sm"/>
        </Form.Group>
        <Form.Group as={Col} controlId="name">
          <Form.Label>Motility (%)</Form.Label>
          <Form.Control type="text" placeholder="Motility (%)" required size="sm"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="name">
          <Form.Label>Progressive Motility (%)</Form.Label>
          <Form.Control type="text" placeholder="Progressive motility (%)" required size="sm"/>
        </Form.Group>
        <Form.Group as={Col} controlId="name">
          <Form.Label>Normal Morphology (%)</Form.Label>
          <Form.Control type="text" placeholder="Normal morphology (%)" required size="sm"/>
        </Form.Group>
        <Form.Group as={Col} controlId="name">
          <Form.Label>Semen Analysis</Form.Label>
          <Form.Control type="text" placeholder="Semen analysis" required size="sm"/>
        </Form.Group>
      </Row>
      
      <div className="d-grid gap-2 formbt">
        <Button variant="primary" type="submit" >Submit</Button>
      </div>
    </Form>
    </div>
  );
}

export default PatientForm;