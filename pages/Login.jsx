import { useState } from "react";
import { useFirebase } from "../components/contexts/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  .wrapper {
    max-width: 320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      label {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 20px;
      }
      .err {
        color: red;
      }
    }
  }
`;

export default () => {
  const _firebase = useFirebase();
  const auth = _firebase?.auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((urs) => {
        console.log("ok");
      })
      .catch((error) => {
        setErrMsg("Invalid user / email");
      });
  };

  return (
    <StyledLogin>
      <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
          </label>

          <label>
            <span>Password:</span>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
          </label>
          {errMsg && <div className="err"> {errMsg}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </StyledLogin>
  );
};
