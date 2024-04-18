import React, { useState, useEffect } from 'react';

function monthlyPayment(payment,principal,interest,month,loan_balance,interest_paid) {

  this.month= month;
  this.payment = payment;
  this.principal = principal;
  this.interest = interest;
  this.loan_balance=loan_balance;
  this.interest_paid=interest_paid

}

// Function to calculate interest based on remaining principal and annual interest rate
function calculateInterestForMonth(remainingPrincipal, annualInterestRate) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const interestPayment = remainingPrincipal * monthlyInterestRate;
  return interestPayment; 
}


function currentMonthPayment(principal,annualInterestRate,months){

    const monthlyInterestRate = (annualInterestRate/100) / 12 ;
    const numberOfPayments = months;
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment; 
  
}

function calculatePrincipalPaid(total,interest){

  return (total-interest);
}

function arrayFactory(principal, annualInterestRate, loanTermYears){
  loanTermYears=Math.floor(loanTermYears)
  let months=loanTermYears*12;
  let arr=[];
  let payment=currentMonthPayment(principal,annualInterestRate,months)
  let total_interest=0;
  for(let i=0;i<months;i++){

    if(payment>principal){
      console.log(principal);
      payment=currentMonthPayment(principal,annualInterestRate,months-i)
      console.log(payment);
    }
    let interest=calculateInterestForMonth(principal,annualInterestRate)
    let towardsPrincipal=payment-interest;
    total_interest+=interest;
    principal=principal-towardsPrincipal;
    arr.push(new monthlyPayment(payment,towardsPrincipal,interest,(i+1),principal,total_interest))
    
  }

  return arr;
}

const Amortization = (props) => { 


    const loanTermYear = props.loanTermYear;
    const interestRate = props.interestRate;
    const loanAmount = props.loanAmount
    const monthlyPayment = props.monthlyPayment;

   // const [payments, setPayments] = useState([])
    const payments=props.payments;
    const setPayments=props.setPayments;
    const lumps=props.lumps; //only read lumps which will change the payments 

    useEffect(() => {
        let paymentArray = arrayFactory(loanAmount, interestRate, loanTermYear);
        console.log(paymentArray);
        setPayments(paymentArray);
    }, [monthlyPayment]);

    return (
        <div>
            <h3>Amortization Schedule</h3>
            <table>
                <thead>
                    <tr>
                        <th>#month</th>
                        <th>payment</th>
                        <th>principal</th>
                        <th>interest</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((item) => (
                        <tr key={item.month}>
                            <td>{item.month}</td>
                            <td>{item.payment.toFixed(2)}</td>
                            <td>{item.principal.toFixed(2)}</td>
                            <td>{item.interest.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Amortization;