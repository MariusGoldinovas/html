import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Heading from "./components/heading/Heading";
import Login from "./pages/login/Login";
import CreateAccount from "./pages/create-account/CreateAccount";
import Accounts from "./pages/accounts/Accounts";
import Users from "./pages/users/Users";
import MoneyAddRemove from "./pages/moneyAddRemove/MoneyAddRemove ";
import "./App.css";
import Card from "./components/card/Card";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Heading />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/account" element={<Accounts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/moneyAdd/:id" element={<MoneyAddRemove action="add" />} />
        <Route
          path="/moneyRemove/:id"
          element={<MoneyAddRemove action="remove" />}
        />
        <Route path="/card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
