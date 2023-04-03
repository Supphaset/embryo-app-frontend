import React from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';


const EmbryoForm = () => {
  const {id} = useParams()
  const nevigate = useNavigate();
  function handleClick(path) {
    nevigate(path);
  }
  return (
    <div>
    <div className='form'>
    <h4 className='head-form'>EmbryoForm</h4>
    <Form>
      <Form.Group controlId="embryoName" className="mb-3">
        <Form.Label>Embryo Name</Form.Label>
        <Form.Control type="text"  placeholder="Embryo Name" required/>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Embryo Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Row>
        <Col>
            <Form.Group controlId="stage" className="mb-3">
                <Form.Label>Stage</Form.Label>
                <Form.Control type="text" placeholder="Optional"/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="icm" className="mb-3">
                <Form.Label>ICM</Form.Label>
                <Form.Control type="text"  placeholder="Optional"/>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="te" className="mb-3">
                <Form.Label>TE</Form.Label>
                <Form.Control type="text"  placeholder="Optional"/>
            </Form.Group>
        </Col>
      </Row>
      <div className="d-grid gap-2 formbt">
        <Button variant="primary" type="submit" >Submit</Button>
      </div>
    </Form>
    </div>
    <Button onClick={() => handleClick(`/embryo-app-frontend/patient/${id}`)}>Patient Profile</Button>
    </div>
  )
}

export default EmbryoForm