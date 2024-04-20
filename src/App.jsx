import { useEffect, useState } from 'react'
import Calculator from './Calculator'
import Input from './Input'
import Amortization from './Amortization'
import LumpSelection from './LumpSelection' 


function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
  loanTermYears = Math.floor(loanTermYears);
  const monthlyInterestRate = (annualInterestRate / 100) / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
}

function App() {

  const [count, setCount] = useState(0)
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermYear, setLoanTermYear] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [payments, setPayments] = useState([]);
  const [lumps, setLumps] = useState([]);

  useEffect(() => {
    let monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermYear)
    console.log(`Monthly Payment = ${monthlyPayment} `)
    setMonthlyPayment(monthlyPayment)

  }, [loanAmount, interestRate, loanTermYear])

  useEffect(() => {
    if (payments.length === 0) {
      return
    }

    //accumulate the total payment and interest
    let totalPayment = 0
    let totalInterest = 0
    payments.forEach((payment) => {
      totalPayment += payment.payment
      totalInterest += payment.interest
    })

    setTotalPayment(totalPayment)
    setTotalInterest(totalInterest)

  }, [payments])

  return (
    <>
      <h1>Loan Calculator with insights</h1>
      <Input
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTermYear={loanTermYear}
        setLoanAmount={setLoanAmount}
        setInterestRate={setInterestRate}
        setLoanTermYear={setLoanTermYear}
      />
      <h3>Loan Summary</h3>
      <p>Monthly Payment: {monthlyPayment.toFixed(2)}</p>
      <p>Interest Paid Duration of Loan: {totalInterest.toFixed(2)}</p>

      <LumpSelection //make this handel only input and output the values, its months selection is dependedent on the amortization
        payments={payments} //only read
        lumps={lumps}
        setLumps={setLumps}
      />
      <Amortization //read the values from the input and calculate the monthly payment and interest return a info string
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTermYear={loanTermYear}
        monthlyPayment={monthlyPayment}

        payments={payments}
        setPayments={setPayments} //mondify the payments
        lumps={lumps}
        //setLumps={setLumps}

      />

    </>
  )
}

export default App
