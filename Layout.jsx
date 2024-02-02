import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  a {
    background-color: red;
    &.active{
        background-color: blue;
    }
  }
`;

export default ({ children }) => {
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
      </div>
      {children}
    </StyledMenu>
  );
};
