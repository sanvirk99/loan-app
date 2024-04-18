import { useEffect, useState } from 'react'

function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
    loanTermYears=Math.floor(loanTermYears);
    const monthlyInterestRate = (annualInterestRate/100) / 12 ;
    const numberOfPayments = loanTermYears * 12;
    
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment; 
  }
  
  function currentMonthPayment(principal,annualInterestRate,months){
  
    const monthlyInterestRate = (annualInterestRate/100) / 12 ;
    const numberOfPayments = months;
    
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment; 
  
  
  }
  
  // Function to calculate interest for a specific month
  function calculateInterestForMonth(remainingPrincipal, annualInterestRate) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    
    const interestPayment = remainingPrincipal * monthlyInterestRate;
    
    return interestPayment; 
  }



const Calculator = (props) => {

    const loanTermYear = props.loanTermYear;
    const interestRate = props.interestRate;
    const loanAmount = props.loanAmount


    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [info, setInfo] = useState('')

    useEffect(() => {

        let monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermYear)
        let interest = calculateInterestForMonth(loanAmount, interestRate)

        console.log(`Monthly Payment = ${monthlyPayment} interest paid = ${interest}`)
        setInfo(`Monthly Payment = ${monthlyPayment.toFixed(2)} interest paid = ${interest}`)
        setMonthlyPayment(monthlyPayment)

    }, [loanAmount, interestRate, loanTermYear])



    return (

        <div>
            <p>{info}</p>
        </div>
    );

}



export default Calculator;