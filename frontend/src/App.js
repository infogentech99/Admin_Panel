// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;






// // // Frontend (React)
// // // Install dependencies: npm install react-router-dom axios

// // // index.js (Entry Point)
// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import App from './App';
// // ReactDOM.render(<App />, document.getElementById('root'));

// // App.js (Routing)
// //import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/CreateUser';
// import UserLogin from './components/UserLogin';
// //import UserDashboard from './components/UserDashboard';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<AdminLogin />} />
//                 <Route path="/admin/dashboard" element={<AdminDashboard />} />
//                 <Route path="/user/login" element={<UserLogin />} />
//                 {/* <Route path="/user/dashboard" element={<AdminDashboard />} /> */}
//             </Routes>
//         </Router>
//     );
// }
// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "../src/components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
