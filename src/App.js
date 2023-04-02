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
          <Route exact path="/embryo-app-frontend/" element={<PatientList/>}/>
          <Route exact path="/embryo-app-frontend/patientform/" element={<PatientForm/>} />
          <Route path='/embryo-app-frontend/patient/:id/' element={<PatientProfile/>}/>
          <Route path='/embryo-app-frontend/embryoform/:id/' element={<EmbryoForm/>}/>
          <Route path='/embryo-app-frontend/embryo/:patientid/:embryoid/' element={<EmbryoProfile/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
