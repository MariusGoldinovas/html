import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";

const MoneyAddRemove = ({ action }) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [name, setName] = useState(""); // For account holder's name
  const [surname, setSurname] = useState(""); // For account holder's surname
  const [accountNumber, setAccountNumber] = useState(""); // For account number
  const [iban, setIban] = useState(""); // For IBAN
  const [message, setMessage] = useState(null);
  const { id } = useParams();

  // Fetch account details including balance, name, surname, and account number
  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/account/${id}`
      );
      const accountData = response.data;

      // Set state with account details
      setBalance(accountData.money);
      setName(accountData.name);
      setSurname(accountData.surname);
      setAccountNumber(accountData.accountNumber);
      setIban(accountData.iban);
    } catch (error) {
      console.error("Error fetching account details:", error);
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAmount = parseFloat(amount);

    if (isNaN(newAmount) || newAmount <= 0) {
      setMessage({ data: "Invalid amount entered", status: "danger" });
      return;
    }

    let updatedBalance = balance;

    if (action === "add") {
      updatedBalance = balance + newAmount;
    } else if (action === "remove") {
      if (newAmount > balance) {
        setMessage({
          data: "Cannot remove more than the current balance.",
          status: "danger",
        });
        return;
      }
      updatedBalance = balance - newAmount;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/account/${id}`,
        {
          money: updatedBalance,
        }
      );

      setMessage({
        data: response.data.message || "Operation successful.",
        status: "success",
      });

      fetchAccountDetails(); // Refresh account details after update
    } catch (error) {
      console.error("Error updating balance:", error);
      setMessage({
        data: "Failed to update balance.",
        status: "danger",
      });
    }
  };

  return (
    <div className="container">
      <Card name={name} surname={surname} accountNumber={iban} />
      <h1>Your balance: {balance} EUR</h1>
      {message && (
        <div
          style={{ width: "30%" }}
          className={`alert alert-${message.status}`}
        >
          {message.data}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            {action === "add" ? "Add Money:" : "Remove Money:"}
          </label>
          <input
            style={{ width: "30%" }}
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount to ${action}`}
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {action === "add" ? "Add Money" : "Remove Money"}
        </button>
      </form>
    </div>
  );
};

export default MoneyAddRemove;
