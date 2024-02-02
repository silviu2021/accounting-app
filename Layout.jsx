import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useFirebase } from "./components/contexts/Firebase";
import { signOut } from "firebase/auth";

const StyledMenu = styled.div`
  a {
    background-color: red;
    &.active {
      background-color: blue;
    }
  }
`;

export default ({ children }) => {
  const _firebase = useFirebase();
  const auth = _firebase?.auth;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <StyledMenu>
      <div className="menu">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/projects"
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/parents"
            >
              Parents
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/payments"
            >
              Payments
            </NavLink>
          </li>
        </ul>

        <div onClick={handleLogout}>Logout</div>
      </div>
      {children}
    </StyledMenu>
  );
};
