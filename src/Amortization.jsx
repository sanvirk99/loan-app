import React, { useState, useEffect } from 'react';

function monthlyPayment(payment, principal, interest, month, loan_balance, interest_paid) {

    this.month = month;
    this.payment = payment;
    this.principal = principal;
    this.interest = interest;
    this.loan_balance = loan_balance;
    this.interest_paid = interest_paid

}

// Function to calculate interest based on remaining principal and annual interest rate
function calculateInterestForMonth(remainingPrincipal, annualInterestRate) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const interestPayment = remainingPrincipal * monthlyInterestRate;
    return interestPayment;
}


function currentMonthPayment(principal, annualInterestRate, months) {

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = months;
    const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    return monthlyPayment;

}




function calculatePrincipalPaid(total, interest) {

    return (total - interest);
}


function arrayFactoryLumps(loan_amount, annualInterestRate, loanTermMonths, lumps) {
    //loanTermYears = Math.floor(loanTermYears)
    let months = loanTermMonths;
    let arr = [];
    let payment = currentMonthPayment(loan_amount, annualInterestRate, months)
    let loan_balance = loan_amount;
    let total_interest = 0;
    let i = 0;
    let lumps_applied = []
    while (loan_balance > 0) {


        if (payment > loan_balance) { //should be triggered when the last payment is less than the principal

            payment = currentMonthPayment(loan_balance, annualInterestRate, 1)
            let lump = lumps.find((lump) => lump.month === (i + 1))?.amount || 0;
            let interest = calculateInterestForMonth(loan_balance, annualInterestRate)
            let towardsPrincipal = payment - interest + lump;
            total_interest += interest;
            loan_balance = loan_balance - towardsPrincipal;
            arr.push(new monthlyPayment(payment + lump, towardsPrincipal, interest, (i + 1), 0, total_interest))
            lumps_applied.push(i + 1);
            break;
        }

        //check if there is are lumps for this month
        let lump = lumps.find((lump) => lump.month === (i + 1))?.amount || 0;
        let interest = calculateInterestForMonth(loan_balance, annualInterestRate)
        let towardsPrincipal = payment - interest + lump;
        total_interest += interest;
        loan_balance = loan_balance - towardsPrincipal;
        arr.push(new monthlyPayment(payment + lump, towardsPrincipal, interest, (i + 1), loan_balance, total_interest))
        //lumps_applied.push(i + 1);
        i++;
    }

  //  const filteredLumps = lumps.filter((lump) => !lumps_applied.includes(lump.month));

    return arr;


}


const Amortization = (props) => {


    const loanTermYear = props.loanTermYear;
    const loanTermMonths = props.loanTermMonths;
    const interestRate = props.interestRate;
    const loanAmount = props.loanAmount
    const monthlyPayment = props.monthlyPayment;

    // const [payments, setPayments] = useState([])
    const payments = props.payments;
    const setPayments = props.setPayments;
    const lumps = props.lumps; //only read lumps which will change the payments 
    //const setLumps=props.setLumps;  //only set lumps which will change the payments
    useEffect(() => {
        let paymentArray = arrayFactoryLumps(loanAmount, interestRate, loanTermMonths, lumps);
        setPayments(paymentArray);
    }, [monthlyPayment, lumps]);

    return (
        <div>
            <h3>Amortization Schedule</h3>
            <div >
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>month</th>
                            <th>payment</th>
                            <th>principal</th>
                            <th>interest</th>
                            <th>loan balance</th>
                            <th>accumlated interest</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item) => (
                            <tr key={item.month}>
                                <td>{item.month}</td>
                                <td>{(item.payment).toFixed(2)}</td>
                                <td>{item.principal.toFixed(2)}</td>
                                <td>{(item.interest).toFixed(2)}</td>
                                <td>{(item.loan_balance).toFixed(2)}</td>
                                <td>{(item.interest_paid).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p>Values show only to second decimal place</p>
        </div>
    );

}

export default Amortization;