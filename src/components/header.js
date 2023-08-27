import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link href="/" className='navbar-brand'>Bao Nguyen</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className='nav-link'>Home</Link>
            <Link href="/dashboard" className='nav-link'>Dashboard</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <Link href="/blogs" className='dropdown-item'>Blogs</Link>
              <NavDropdown.Divider />
              <Link href="/tictactoe" className='dropdown-item'>Tictactoe</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;