import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/auth/OpenRoute";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./components/core/Dashboard/MyProfile";
import UpdatePassword from "./pages/UpdatePassword";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings";
import {ACCOUNT_TYPE} from "./utils/constants"
import AddCourse from "./components/core/Dashboard/Add course";
import { useSelector } from "react-redux";

function App() {

  const {user} = useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />

        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />


        <Route path="signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />

        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />

        <Route path="about" element={<About />} />

        <Route path="contact" element={
          
            <ContactUs />
         
        } />


        <Route element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
          <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
          <Route path="/dashboard/Settings" element={<Settings/>}></Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
              
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <Route path="/dashboard/add-course" element={<AddCourse/>}></Route>
            )
          }

        </Route>

<Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;
