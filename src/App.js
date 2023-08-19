import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";

import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import LabDeshBoard from "./pages/lab/LabDeshboard";
import PatientDeshboard from "./pages/patient/PatientDeshboard";
import SideBar from "./components/SideBar";
import LabUsers from "./components/LabUsers";
import CreateUserForm from "./components/UserCreateForm";
import UserUpdateForm from "./components/UserUpdateForm";
import LabPatients from "./components/LabPatient";
import PatientForm from "./components/CreatePatient";
import PatientUpdateForm from "./components/PatientUpdateForm";
import LabBills from "./components/LabBills";
import BillDetailPage from "./components/BillDetailPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patient/signup" element={<CreateAccount />} />
        <Route path="/lab/dashboard" element={<LabDeshBoard />}>

          <Route path="users" element={<LabUsers />} />
          <Route path="users/create" element={<CreateUserForm />} />
          <Route path="users/update/:userId" element={<UserUpdateForm />} />

          <Route path="patients" element={<LabPatients />} />
          <Route path="patient/create" element={<PatientForm />} />
          <Route path="patient/update/:patientId" element={<PatientUpdateForm />} />

          <Route path="bill" element={<LabBills />} />
          <Route path="bill/create" element={<LabBills />} />
          <Route path="bill/:billId" element={<BillDetailPage />} />



          <Route />
        </Route>
        <Route path="/patient/dashboard" element={<PatientDeshboard />}>
          <Route index element={<SideBar />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
