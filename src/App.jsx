import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { UserProvider } from "./contexts/UserContext";
import useToken from "./hooks/useToken";
import Main from "./pages/Main";
import Feed from "./pages/Main/Feed";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/main"
              element={
                <ProtectedRouteGuard>
                  <Main />
                </ProtectedRouteGuard>
              }
            >
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<div>profile</div>} />
              <Route index path="*" element={<Navigate to="/main/feed" />} />
            </Route>
            <Route index path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default App;
