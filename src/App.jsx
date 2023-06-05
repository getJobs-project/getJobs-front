import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={SignInPage()} />
          <Route path="*" element={"Nenhum caminho encontrado!"} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
