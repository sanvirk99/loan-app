import { useEffect, useState } from 'react'
import Calculator from './Calculator'
import Input from './Input'
import Amortization from './Amortization'
import LumpSelection from './LumpSelection'
import './styles/styles.css'

function calculateMonthlyPayment(principal, annualInterestRate, loanTermMonths) {

  const monthlyInterestRate = (annualInterestRate / 100) / 12;
  const numberOfPayments = loanTermMonths;

  const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  return monthlyPayment;
}

function App() {

  const [count, setCount] = useState(0)
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermYear, setLoanTermYear] = useState(1);
  const [loanTermMonths, setLoanTermMonths] = useState(12);
  const [amoortizedMonths, setAmortizedMonths] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [payments, setPayments] = useState([]);
  const [lumps, setLumps] = useState([]);

  useEffect(() => {
    let monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermMonths)
    console.log(`Monthly Payment = ${monthlyPayment} `)
    setMonthlyPayment(monthlyPayment)

  }, [loanAmount, interestRate, loanTermMonths])

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

    setAmortizedMonths(payments.length)
    setTotalPayment(totalPayment)
    setTotalInterest(totalInterest)

  }, [payments])

  return (
    <>

      <div className='container'>
        <h1>Loan Analysis </h1>
        <Input
          loanAmount={loanAmount}
          interestRate={interestRate}
          loanTermYear={loanTermYear}
          setLoanAmount={setLoanAmount}
          setInterestRate={setInterestRate}
          setLoanTermYear={setLoanTermYear}
          setLoanTermMonths={setLoanTermMonths}
        />
        <h3>Loan Summary</h3>
        <table className='styled-table'>
          <tbody>
            <tr>
              <td>Loan Amount $:</td>
              <td>{loanAmount}</td>
            </tr>
            <tr>
              <td>Interest Rate APR %:</td>
              <td>{interestRate}</td>
            </tr>
            <tr>
              <td>Loan Term Months:</td>
              <td>{loanTermMonths}</td>
            </tr>
            <tr>
              <td>Monthly Payment:</td>
              <td>{monthlyPayment.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Interest Paid:</td>
              <td>{totalInterest.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Amortized Months:</td>
              <td>{amoortizedMonths}</td>
            </tr>
          </tbody>
        </table>
        <p>Note adding lump payments will reduce total interest paid over term and change duration </p>
      
      <LumpSelection //make this handel only input and output the values, its months selection is dependedent on the amortization
        payments={payments} //only read
        lumps={lumps}
        setLumps={setLumps}
      />
      </div>
      <Amortization //read the values from the input and calculate the monthly payment and interest return a info string
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTermYear={loanTermYear}
        loanTermMonths={loanTermMonths}
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
