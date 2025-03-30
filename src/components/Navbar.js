import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #00f;
  padding: 1rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    &:hover {
      color: #ff0;
    }
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/">Home</Link></NavItem>
        <NavItem><Link to="/news">News</Link></NavItem>
        <NavItem><Link to="/sports">Sports</Link></NavItem>
        <NavItem><Link to="/weather">Weather</Link></NavItem>
      </NavList>
    </Nav>
  );
}

export default Navbar;