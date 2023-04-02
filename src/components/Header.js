import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div >
      <Navbar className='center-div' expand="lg" variant="light" bg="secondary">
        <Container  >
          <Navbar.Brand href="/embryo-app-frontend/" className='center-div' ><h3>Embryo Selection for IVF Using Machine Learning Techniques</h3></Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;