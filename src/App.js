import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PatientList from './screens/PatientList';
import PatientForm from './screens/PatientForm';
import PatientProfile from './screens/PatientProfile';
import Header from './components/Header';
import EmbryoForm from './screens/EmbryoForm';
import EmbryoProfile from './screens/EmbryoProfile';

function App() {
  return (
    <Router>
      <Header/>
      <Container>
        <Routes>
          <Route exact path="/" element={<PatientList/>}/>
          <Route exact path="/patientform" element={<PatientForm/>} />
          <Route path='/patient/:id' element={<PatientProfile/>}/>
          <Route path='embryoform/:id' element={<EmbryoForm/>}/>
          <Route path='embryo/:patientid/:embryoid' element={<EmbryoProfile/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
