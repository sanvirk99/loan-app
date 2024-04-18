import { useState } from "react";


const Input = (props) =>{

   
    const loanTerm=props.loanTerm;
    const interestRate=props.interestRate;
    const loanAmount=props.loanAmount

    const setLoanAmount=props.setLoanAmount;
    const setInterestRate=props.setInterestRate;
    const setLoanTermYear=props.setLoanTermYear;
  

    //can do input validation here before setting these values
  
    const handleLoanAmountChange = (event) => {

      setLoanAmount(event.target.value);
    };
  
    const handleInterestRateChange = (event) => {
      setInterestRate(event.target.value);
    };
  
    const handleLoanTermChange = (event) => {
      setLoanTermYear(event.target.value);
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
        {/* <div>
          <label>Loan Term (month):</label>
          <input
            type="number"
            value={loanTermMonth}
            onChange={handleLoanTermChange}
            required
          />
        </div> */}
        <button>Calculate</button>
      </form>
      </div>
    );
  
}


export default Input;