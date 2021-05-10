import "./App.css";
import React, { useState } from "react";
import { Row, Col, Button, Input, Table } from "reactstrap";

function App() {
  const [Balance, setBalance] = useState(0);
  const [Income, setIncome] = useState(0);
  const [Expense, setExpense] = useState(0);
  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState("");
  const [Arr, setArr] = useState([]);

  const calculation = () => {
    if (Title !== "" && Amount !== "") {
      setBalance((preTotal) => preTotal + parseInt(Amount));

      if (Amount > 0) {
        setIncome((prevIncome) => prevIncome + parseInt(Amount));
      } else {
        setExpense((preExpense) => preExpense + parseInt(Amount));
      }

      const newValue = Arr.concat({ id: Date.now(), Title, Amount });
      setArr(newValue);
    } else {
      alert("Enter correct value");
    }
  };
  const deleteItem = (id) => {
    const filteredItems = Arr.filter((value) => value.id !== id);
    setArr(filteredItems);
    Arr.map((val) => {
      if (val.id === id) {
        if (val.Amount > 0) {
          setBalance(Balance - Math.abs(val.Amount));
          setIncome(Income - val.Amount);
        } else {
          setBalance(Balance + Math.abs(val.Amount));
          setExpense(Expense - val.Amount);
        }
      }
    });
  };

  return (
    <div className="App">
      <h1 className="title">Tracker</h1>
      <div>
        <div className="container">
          <h3>Balance</h3>
          <h5 className="Balance">₹{Balance}</h5>
        </div>
        <br />

        <div className="Income">
          <div className="container">
            <Row>
              <Col>
                <h3>Income</h3>
                <h5 className="Inc">₹{Income}</h5>
              </Col>
              <Col>
                <h3>Expense</h3>
                <h5 className="Exp">₹{Expense}</h5>
              </Col>
            </Row>
          </div>
        </div>

        <div className="container form">
          <Input
            type="text"
            name="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <br />
          <Row>
            <Col>
              <Input
                type="number"
                name="amount"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </Col>
            <Col>
              <Button color="primary" onClick={calculation}>
                Add
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="List">
        <h1 className="listtitle">List of Items</h1>
        <Table dark>
          <tbody>
            {Arr.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.Title}</td>
                  <td> {val.Amount}</td>
                  <td className={val.Amount > 0 ? "Pos" : "Neg"}>
                    <i
                      className="far fa-trash-alt"
                      onClick={() => {
                        deleteItem(val.id);
                      }}></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
