// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// require('dotenv').config()
// const dotenv=require('dotenv');
// import dotenv from "dotenv";


function App() {
  const [name, setName] = useState('');
  const [ok ,setOk]=useState(0);
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  // var ok=1;
  // const navigate=useNavigate();
  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);

    })


  }, [ok])

  async function getTransactions() {
    const url = process.env.REACT_APP_URL + '/transactions';
    const res = await fetch(url);
    return await res.json();

  }
  // require('dotenv').config()
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_URL + '/transaction';
    // const url="http://localhost:4040/api/transaction";
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price, name: name.substring(price.length + 1), datetime, description })
    })
      .then(res => {
        res.json()
          .then(json => {
            console.log('result', json);
            setOk(1-ok);
            console.log(ok);
            setName('');
            setDatetime('');
            setDescription('');
          })
          .catch(jsonErr => {
            console.log(`Error parsing JSON: ${jsonErr}`);
          });
      })
      .catch(err => {
        console.log(`Your error is ${err}`);
      });

    // fetch
  }
  let balance = 0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }
  balance=balance.toFixed(2);
  const fraction=balance.split('.')[1];
  balance=balance.split('.')[0];
  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">

          <input type="text" value={name}
            onChange={(ev) => {
              setName(ev.target.value)
              console.log(name)
            }}
            placeholder={'+200 new samsung galaxy'} />
          <input value={datetime}
            onChange={ev => setDatetime(ev.target.value)}
            type="datetime-local" />
        </div>
        <div className="description">
          <input type="text" value={description} onChange={ev => setDescription(ev.target.value)}
            placeholder={'description'} />

        </div>
        <button type="submit">Add New Transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div>
            <div className="transaction">
              <div className='left'>
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className='right'>
                <div className={"price " + ((transaction.price < 0) ? 'red' : 'green')}>{transaction.price}</div>
                <div className='datetime'>{transaction.datetime}</div>
              </div>

            </div>

          </div>
        ))}



      </div>


    </main>

  );
}

export default App;
