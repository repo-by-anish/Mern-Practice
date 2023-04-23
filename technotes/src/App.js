import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NoteList from "./features/notes/NoteList";
import UsersLists from "./features/users/UsersLists";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          <Route path="notes">
            <Route index element={<NoteList />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersLists />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
