import React from 'react';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink as Link } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" bg="primary" variant="dark" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {/* <Link className="nav-link" to="">Places</Link> */}
                    <NavDropdown title="Complains">
                        <Link className="dropdown-item" to="/electricity/complains" exact>View</Link>
                        {/* <Link className="dropdown-item" to="/electricity/complains/add">Add Complain</Link> */}
                    </NavDropdown>
                    <NavDropdown title="Schedules">
                        <Link className="dropdown-item" to="/electricity/schedules" exact>View</Link>
                        <Link className="dropdown-item" to="/electricity/schedules/add">Add Schedule</Link>
                    </NavDropdown>
                    <NavDropdown title="Users">
                        <Link className="dropdown-item" to="/electricity/users" exact>View</Link>
                        <Link className="dropdown-item" to="/electricity/users/add">Add User</Link>
                    </NavDropdown>
                    <NavDropdown title="Places">
                        <Link className="dropdown-item" to="/electricity/places/all">All</Link>
                        <Link className="dropdown-item" to="/electricity/places/provinces">Provinces</Link>
                        <Link className="dropdown-item" to="/electricity/places/areaOffices">Area Offices</Link>
                        <Link className="dropdown-item" to="/electricity/places/areas">Areas</Link>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustomNavbar;