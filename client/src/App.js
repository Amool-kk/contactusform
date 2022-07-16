import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [todayDate, setToday] = useState();

  useEffect(() => {
    const today = new Date();
    var month = today.getMonth() + 1;
    var day = today.getDate() + 1;
    const year = today.getFullYear();

    // console.log(month, day, today)

    if (month < 10)
      month = '0' + month.toString();
    if (day < 10)
      day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    // console.log(maxDate)

    setToday(maxDate)
  }, [])

  const submit = async () => {
    console.log(name, email, phone, date);

    const res = await fetch('http://localhost:3003/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name, email, phone, date
      })
    })

    const result = await res.json();
    console.log(result)
    if (res.status === 200) {
      document.querySelector('form').style.display = "none";
      document.querySelector('.msg').style.display = "block"
    }
  }


  return (
    <div className="App">
      <div className="main">
        <div className="form">
          <form action="/" method="post">
            <h1>Appointment Form</h1>
            <div className="itmes">
              <input type="text" name="name" id="name" placeholder="Name" autocomplete="off" onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div className="itmes">
              <input type="email" name="email" id="email" placeholder="Email" autocomplete="off" onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className="itmes">
              <input type="text" name="phone" id="phone" placeholder="Phone" autocomplete="off" onChange={(e) => { setPhone(e.target.value) }} />
            </div>
            <div className="itmes">
              <input type="date" name="date" id="date" placeholder="Date" autocomplete="off" onChange={(e) => { setDate(e.target.value) }} min={todayDate} />
            </div>
            <button type="button" onClick={submit}>Send</button>
          </form>
          <div className="msg" style={{"display":"none"}}>
            <h1>Thank you </h1>
            <h2 style={{ "textAlign": "center","margin":"5px 0px 50px 0px" }}>for submit the form. We will inform you as soon as possible.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
