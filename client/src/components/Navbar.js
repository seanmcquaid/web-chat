import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logoutAction } from '../store/user/actions';
import { tokenSelector } from '../store/user/selectors';
import { memo } from 'react';

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const logoutButtonOnClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const navLinks = !token ? (
    <>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </>
  ) : (
    <>
      <NavLink to='/userHome'>User Home</NavLink>
      <NavLink to='/friendsList'>Friends List</NavLink>
      <NavLink to='/userSearch'>User Search</NavLink>
      <LogoutButton onClick={logoutButtonOnClick}>Logout</LogoutButton>
    </>
  );

  return (
    <StyledNav>
      <NavList>{navLinks}</NavList>
    </StyledNav>
  );
});

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  background-color: #153243;
`;

const NavList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 1rem;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-family: 'PT Serif', serif;
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  text-align: center;
  background-color: #153243;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-family: 'PT Serif', serif;
  color: white;
  border: none;
`;

export default Navbar;
