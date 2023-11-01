import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/list'} replace />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<AddEmployee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
