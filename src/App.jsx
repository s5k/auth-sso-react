import { useState } from "react";
import "./App.css";
import Login from "./container/Login";
import Register from "./container/Register";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && <Login setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "dashboard" && <div>Dashboard</div>}
    </>
  );
}

export default App;
