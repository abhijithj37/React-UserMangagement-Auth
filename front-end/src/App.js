import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserHomePage from "./Pages/UserPages/UserHomePage";
import "./App.css";
import Register from "./Pages/UserPages/Register/Register";
import Login from "./Pages/UserPages/Login/Login";

import AdminLogin from "./Pages/AdminPages/AdminLogin";
import AdminHomePage from "./Pages/AdminPages/AdminHomePage";
import EditUserPage from "./Pages/AdminPages/EditUserPage";
import AddUserPage from "./Pages/AdminPages/AddUserPage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<UserHomePage />}></Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="adminLogin" element={<AdminLogin />} />
        <Route path="admin" element={<AdminHomePage />}></Route>
        <Route path="editUser/:id" element={<EditUserPage />} />
        <Route path="addUser" element={<AddUserPage />}/>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
