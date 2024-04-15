import { useEffect, useState } from 'react'

// Function to calculate monthly payment
function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
  loanTermYears=Math.floor(loanTermYears);
  const monthlyInterestRate = (annualInterestRate/100) / 12 ;
  const numberOfPayments = loanTermYears * 12;
  
  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment; // Return monthly payment rounded to 2 decimal places
}

function currentMonthPayment(principal,annualInterestRate,months){

  const monthlyInterestRate = (annualInterestRate/100) / 12 ;
  const numberOfPayments = months;
  
  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment; // Return monthly payment rounded to 2 decimal places


}

// Function to calculate interest for a specific month
function calculateInterestForMonth(remainingPrincipal, annualInterestRate) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  
  const interestPayment = remainingPrincipal * monthlyInterestRate;
  
  return interestPayment; // Return interest payment rounded to 2 decimal places
}

function calculatePrincipal(total,interest){

  return (total-interest);
}

const List = (props) => {
  const payments = props.payments;
  console.log(payments)
  return (<>

    <table>
      <thead>
        <tr>
          <th>#month</th>
          <th>payment</th>
          <th>principal</th>
          <th>intrest</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((item) => (
          <tr key={item.month}>
            <td>{item.month}</td>
            <td>{(item.payment).toFixed(2)}</td>
            <td>{(item.principal.toFixed(2))}</td>
            <td>{(item.interest).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>


  </>)
}

function monthlyPayment(payment,principal,interest,month) {

  this.month= month;
  this.payment = payment;
  this.principal = principal;
  this.interest = interest;
}

function arrayFactory(principal, annualInterestRate, loanTermYears){
  loanTermYears=Math.floor(loanTermYears)
  let months=loanTermYears*12;
  let arr=[];
  let payment=currentMonthPayment(principal,annualInterestRate,months)
  for(let i=0;i<months;i++){

    if(payment>principal){
      payment=currentMonthPayment(principal,annualInterestRate,months-i)
    }
    let interest=calculateInterestForMonth(principal,annualInterestRate)
    let towardsPrincipal=payment-interest
    arr.push(new monthlyPayment(payment,towardsPrincipal,interest,(i+1)))
    principal=principal-towardsPrincipal;
  }

  return arr;
}

const Calculator= (props) =>{

  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [info, setInfo] =useState('enter loan information')
  const [payments,setPayments]=useState([])

  useEffect(()=>{

    let monthlyPayment = calculateMonthlyPayment(loanAmount,interestRate,loanTerm)
    let interest=calculateInterestForMonth(loanAmount,interestRate)
    let principal=calculatePrincipal(monthlyPayment,interest)
    if(!isNaN(monthlyPayment) && isFinite(monthlyPayment)){
      
      let arr=arrayFactory(loanAmount,interestRate,loanTerm)
      setPayments(arr)
      
      setInfo(`First Payment total ${monthlyPayment}, interest: ${interest}, principal ${principal}`)
    }

  },[loanAmount,interestRate,loanTerm])

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  };

  const handleLoanTermChange = (event) => {
    setLoanTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Loan Amount:', loanAmount);
    console.log('Interest Rate:', interestRate);
    console.log('Loan Term:', loanTerm);
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Loan Amount:</label>
        <input
          type="number"
          value={loanAmount}
          onChange={handleLoanAmountChange}
          required
        />
      </div>
      <div>
        <label>Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={handleInterestRateChange}
          required
        />
      </div>
      <div>
        <label>Loan Term (years):</label>
        <input
          type="number"
          value={loanTerm}
          onChange={handleLoanTermChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p>{info}</p>  
    <List payments={payments}></List>
    <p>values rounded to second decimal place</p>
    </div>
  
    
  );


}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Loan Calculator with insights</h1>
      <Calculator/>
    </>
  )
}

export default App
