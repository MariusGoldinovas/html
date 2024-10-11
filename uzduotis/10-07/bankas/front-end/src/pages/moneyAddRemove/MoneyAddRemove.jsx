import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";

const MoneyAddRemove = ({ action }) => {
  const [account, setAccount] = useState({
    name: "",
    surname: "",
    balance: 0,
    accountNumber: "",
    iban: "",
  });

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const { id } = useParams();

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/account/${id}`
      );
      const accountData = response.data;

      setAccount({
        name: accountData.name,
        surname: accountData.surname,
        balance: accountData.money,
        accountNumber: accountData.accountNumber,
        iban: accountData.iban,
      });
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

    let updatedBalance = account.balance;

    if (action === "add") {
      updatedBalance = account.balance + newAmount;
    } else if (action === "remove") {
      if (newAmount > account.balance) {
        setMessage({
          data: "Cannot remove more than the current balance.",
          status: "danger",
        });
        return;
      }
      updatedBalance = account.balance - newAmount;
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

      fetchAccountDetails();
      setAmount("");
    } catch (error) {
      console.error("Error updating balance:", error);
      setMessage({
        data: "Failed to update balance.",
        status: "danger",
      });
    }
  };

  const handleSetAmount = (value) => {
    const currentAmount = parseFloat(amount) || 0;
    setAmount((currentAmount + value).toString());
  };

  const handleSetAllAmount = () => {
    setAmount(account.balance.toString());
  };

  return (
    <div className="container d-flex gap-5 justify-content-center align-items-center">
      <Card
        name={account.name}
        surname={account.surname}
        accountNumber={account.iban}
      />
      <div className="balance" style={{ height: 300 }}>
        <h1>Your balance: {account.balance} EUR</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              {action === "add" ? "Add Money:" : "Remove Money:"}
            </label>
            <div className="d-flex gap-2">
              <input
                style={{ width: "60%" }}
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount to ${action}`}
                min="0"
                required
              />

              {action === "remove" && (
                <button
                  type="button"
                  className="btn btn-org"
                  onClick={handleSetAllAmount}
                >
                  All
                </button>
              )}
            </div>
          </div>

          {action === "add" && (
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className="btn btn-outline-org"
                onClick={() => handleSetAmount(50)}
              >
                50 EUR
              </button>
              <button
                type="button"
                className="btn btn-outline-org"
                onClick={() => handleSetAmount(100)}
              >
                100 EUR
              </button>
              <button
                type="button"
                className="btn btn-outline-org"
                onClick={() => handleSetAmount(500)}
              >
                500 EUR
              </button>
            </div>
          )}

          <button type="submit" className="btn btn-org">
            {action === "add" ? "Add Money" : "Take out money"}
          </button>
        </form>

        {message && (
          <div
            style={{ width: "100%" }}
            className={`alert alert-${message.status} mt-5`}
          >
            {message.data}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyAddRemove;
