import { createGlobalStyle } from "styled-components";
import { FirebaseProvider } from "./components/contexts/Firebase";
import { UserProvider } from "./components/contexts/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Parents from "./pages/Parents";
import Payments from "./pages/Payments";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const GlobalStypes = createGlobalStyle`
  body {
    background: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin:0;
  }
`;

export default () => {
  return (
    <BrowserRouter>
      <FirebaseProvider>
        <UserProvider>
          <GlobalStypes />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </FirebaseProvider>
    </BrowserRouter>
  );
};
