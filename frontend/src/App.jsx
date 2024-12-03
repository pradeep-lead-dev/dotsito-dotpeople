// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Importing components and pages
// // import Login from './components/Login';
// import Register from './components/Register';
// import ForgotPassword from './components/ForgotPassword';

// import Calendar from './pages/calender/Calendar';
// import DocumentManagement from './pages/document/DocumentManagement';
// import LeaveApplication from './pages/leave/LeaveApplication';
// import TeamManagement from './pages/team/TeamManagement';
// import Role from './pages/roles/Role';
// import UserTable from './components/UserTable';
// import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
// import TimesheetForm from './pages/timesheet/TimesheetForm';
// import PaySlipUploadForm from './pages/salary/PaySlipUploadForm';
// import PaySlip from './components/PaySlipTable';

// const App = () => {
//   return (    
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<Login />} /> */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Protected Routes */}
//         <Route path="/dashboard" element={<PrivateRoute element={Dashboard} allowedRoles={['admin', 'user',"employee"]} />} />
//         <Route path="/timesheet" element={<PrivateRoute element={TimesheetForm} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/calendar" element={<PrivateRoute element={Calendar} allowedRoles={['admin', 'user',"employee"]} />} />
//         <Route path="/document" element={<PrivateRoute element={DocumentManagement} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/leave" element={<PrivateRoute element={LeaveApplication} allowedRoles={['admin','user',"employee"]} />} />
//         <Route path="/salary" element={<PrivateRoute element={PaySlipUploadForm} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/team" element={<PrivateRoute element={TeamManagement} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/role" element={<PrivateRoute element={Role} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/users" element={<PrivateRoute element={UserTable} allowedRoles={['admin',"employee"]} />} />
//         <Route path="/paysliptable" element={<PrivateRoute element={PaySlip} allowedRoles={['admin',"employee"]}/>}/>
//         {/* Unauthorized route */}
//         <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
//       </Routes>
//       <ToastContainer position="top-center" autoClose={3000} />
//     </Router>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './assets/auth/Login';
// import Register from './assets/auth/Register';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAuth } from './contexts/AuthContext';



// import Dashboard from './pages/Dashboard/Dashboard';
// import LeaveApplication from './pages/leave/LeaveApplication';
// import TimesheetForm from './pages/timesheet/TimesheetForm';
// import PaySlipUploadForm from './pages/salary/PaySlipUploadForm';
// import PaySlip from './components/PaySlipTable';
// import PrivateRoute from './components/PrivateRoute';
// import TeamManagement from './pages/team/TeamManagement'; 
// import Role from './pages/roles/Role';
// import UserTable from './components/UserTable';










// const App = () => {
 
 
//   return (
//     <Router>
//       <Routes>
        
//       <Route path="/dashboard" element={<Dashboard />} />
//         <Route path='/register' element={<Register/>} />
//         <Route path='/login' element={<Login />} />
//         <Route path="/leave" element={<LeaveApplication />} />
//         <Route path="/timesheet" element={<TimesheetForm/>} />
//         <Route path="/salary" element={<PaySlipUploadForm />} />
//         <Route path="/paysliptable" element={<PaySlip/>}/>
//         <Route path="/team" element={<TeamManagement/>} />
//         <Route path="/role" element={<Role />} />
//          <Route path="/users" element={<UserTable />} />
//          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
        
        
      
       
        
//       </Routes>
//     </Router>
//   )
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './assets/auth/Login';
// import Register from './assets/auth/Register';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAuth } from './contexts/AuthContext';
 
// import Dashboard from './pages/Dashboard/Dashboard';
// import LeaveApplication from './pages/leave/LeaveApplication';
// import TimesheetForm from './pages/timesheet/TimesheetForm';
// import PaySlipUploadForm from './pages/salary/PaySlipUploadForm';
// import PaySlip from './components/PaySlipTable';
// import TeamManagement from './pages/team/TeamManagement';
// import Role from './pages/roles/Role';
// import UserTable from './components/UserTable';
 
// const App = () => {
//   const { isAuthenticated } = useAuth();
// console.log(isAuthenticated ,"in routes");
 
//   return (
//     <Router>
//       <Routes>
//         {isAuthenticated ? (
//           <>
//             {/* Authenticated Routes */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/login" element={<Login/>} />
//             <Route path="/leave" element={<LeaveApplication />} />
//             <Route path="/timesheet" element={<TimesheetForm />} />
//             <Route path="/salary" element={<PaySlipUploadForm />} />
//             <Route path="/paysliptable" element={<PaySlip />} />
//             <Route path="/team" element={<TeamManagement />} />
//             <Route path="/role" element={<Role />} />
//             <Route path="/users" element={<UserTable />} />
//             {/* Redirect '/' and '/register' to '/dashboard' if already logged in */}
//             <Route path="/dashboard" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/register" element={<Navigate to="/dashboard" replace />} />
//           </>
//         ) : (
//           <>
//             {/* Public Routes */}
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             {/* Redirect any unauthenticated route to '/' */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </>
//         )}
 
//         {/* Unauthorized Page */}
//         <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
//       </Routes>
//     </Router>
//   );
// };
 
// export default App;
 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './assets/auth/Login';
import Register from './assets/auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './contexts/AuthContext';
 
import Dashboard from './pages/Dashboard/Dashboard';
import LeaveApplication from './pages/leave/LeaveApplication';
import TimesheetForm from './pages/timesheet/TimesheetForm';
import PaySlipUploadForm from './pages/salary/PaySlipUploadForm';
import PaySlip from './components/PaySlipTable';
import TeamManagement from './pages/team/TeamManagement';
import Role from './pages/roles/Role';
import UserTable from './components/UserTable';
import ViewTimesheet from './components/ViewTimesheet';
import AddRole from './components/addRole';
import RoleManagement from './pages/roles/roleManagement';


const App = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, "in routes");
 
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          // Authenticated Routes
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leave" element={<LeaveApplication />} />
            <Route path="/timesheet" element={<TimesheetForm />} />
            <Route path="/salary" element={<PaySlipUploadForm />} />
            <Route path="/paysliptable" element={<PaySlip />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/users" element={<UserTable />} /> {/* Default: User Table */}
            <Route path="/role" element={<Role />} />
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/add-role" element={<AddRole />} />
            <Route path="/view-timesheet" element={<ViewTimesheet />} />
            

            {/* Redirect '/' and '/register' to '/dashboard' if authenticated */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />
            {/* Catch-all fallback for authenticated users */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          // Unauthenticated Routes
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect any unauthenticated route to '/' */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </Router>
  );
};
 
export default App;