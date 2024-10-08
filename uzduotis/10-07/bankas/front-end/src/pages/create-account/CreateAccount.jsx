import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    axios
      .post("http://localhost:3000/api/account/create", data)
      .then((resp) => {
        setMessage({
          data: resp.data.message,
          status: "success",
        });
        setTimeout(() => {
          navigate("/account");
        }, 3000);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.error || "ID number already exists";
        setMessage({
          data: errorMessage,
          status: "danger",
        });
      });
  };

  return (
    <div className="container">
      <h1>Add new account</h1>
      {message && (
        <div className={"alert alert-" + message.status}>{message.data}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Enter name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="surname">Enter surname</label>
          <input
            name="surname"
            placeholder="Your surname"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Upload copy of ID or passport</label>
          <input type="file" name="idPhoto" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="idNumber">Enter national ID number</label>
          <input
            name="idNumber"
            placeholder="Enter 11 numbers"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="money">
            Enter amount of money to take in account
          </label>
          <input
            type="number"
            name="money"
            defaultValue={0}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
