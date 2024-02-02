import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useFirebase } from "./components/contexts/Firebase";
import { signOut } from "firebase/auth";
import Button from "./components/common/Button";

const StyledMenu = styled.div`
  .menu {
    display: flex;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    justify-content: space-between;
    a {
      color: white;
      padding: 5px;
      &.active {
        background-color: purple;
      }
    }
  }
  .wrapper {
    margin: 40px auto;
    max-width: 1024px;
    width: 100%;

    @media (min-width: 1044px) {
      margin: 40px 10px;
    }
  }
  .logout {
    position: fixed;
    bottom: 5px;
    right: 5px;
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
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/"
        >
          Dashboard
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/projects"
        >
          Projects
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/parents"
        >
          Parents
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/payments"
        >
          Payments
        </NavLink>
      </div>
      <div className="wrapper">{children}</div>
      <Button onClick={handleLogout} className="logout">
        Log Out
      </Button>
    </StyledMenu>
  );
};
