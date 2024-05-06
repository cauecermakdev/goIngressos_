import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

// import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import ChooseCategories from './pages/chooseCategories';
import Home from './pages/Home';
import { UserProvider } from './contexts/UserContext';
import { Navigate } from 'react-router-dom';
import useToken from './hooks/useToken';

export default function App() {
  return (
    <AppContainer>
      <ToastContainer />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-up" element={<Enroll />} />
            <Route path="/chooseCategories" element={<ChooseCategories />} />
            <Route path="/sign-in" element={<SignIn />} />
            {/* <Route path="/home" element={<Home />} /> */}

            <Route
              path="/home"
              element={
                <ProtectedRouteGuard>
                  <Home />
                </ProtectedRouteGuard>
              }
            ></Route>

          </Routes>
        </Router>
      </UserProvider>
    </AppContainer>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}

export const AppContainer = styled.div`
  width: 100w;
  align-items:center;
  justify-content:center;
  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }import Home from './pages/Home/index';

  }
`;
