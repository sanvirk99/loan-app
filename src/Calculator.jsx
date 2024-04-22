import { useEffect, useState } from 'react'

function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
    loanTermYears = Math.floor(loanTermYears);
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = loanTermYears * 12;

    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment;
}

function currentMonthPayment(principal, annualInterestRate, months) {

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = months;

    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment;


}


const Calculator = (props) => {

    const loanTermYear = props.loanTermYear;
    const interestRate = props.interestRate;
    const loanAmount = props.loanAmount
    const setMonthlyPayment = props.setMonthlyPayment;
    const [info, setInfo] = useState('')

    useEffect(() => {
        let monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermYear)
        //console.log(`Monthly Payment = ${monthlyPayment} `)
        setInfo(`Monthly Payment = ${monthlyPayment.toFixed(2)}`)
        setMonthlyPayment(monthlyPayment)

    }, [loanAmount, interestRate, loanTermYear])
    return (

        <div>
            <p>{info}</p>
        </div>
    );
}


export default Calculator;