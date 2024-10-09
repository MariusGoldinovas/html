import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { generate, validate } from "../../utils/id.js";

const CreateAccount = () => {
  const [message, setMessage] = useState();
  const [idNumber, setIdNumber] = useState(""); // State to store the idNumber
  const navigate = useNavigate();

  // Handle form submission to create account
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

  // Button 1: Generate a random ID number and set it in the input field
  const handleGenerate = () => {
    const generatedId = generate(); // Call the generate() function
    setIdNumber(generatedId); // Update state with generated ID
  };

  // Button 2: Validate the current ID number in the input field
  const handleValidate = () => {
    const result = validate(idNumber); // Call the validate() function with the idNumber
    if (result.isValid) {
      setMessage({ data: "ID number is valid", status: "success" });
    } else {
      setMessage({
        data: result.error || "Invalid ID number",
        status: "danger",
      });
    }
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
          <div className="row">
            <div className="col-md-6">
              <input
                name="idNumber"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)} // Update the state with input value
                placeholder="Enter 11 numbers"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleGenerate} // Button 1 triggers generate function
              >
                Generate ID
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleValidate} // Button 2 triggers validate function
              >
                Validate ID
              </button>
            </div>
          </div>
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
