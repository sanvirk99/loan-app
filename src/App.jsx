import { useEffect, useState } from 'react'
import Calculator from './Calculator'
import Input from './Input'
import Amortization from './Amortization'

// function calculateMonthlyPayment(principal, annualInterestRate, loanTermYears) {
//   loanTermYears=Math.floor(loanTermYears);
//   const monthlyInterestRate = (annualInterestRate/100) / 12 ;
//   const numberOfPayments = loanTermYears * 12;
  
//   const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
//   return monthlyPayment; 
// }

// function currentMonthPayment(principal,annualInterestRate,months){

//   const monthlyInterestRate = (annualInterestRate/100) / 12 ;
//   const numberOfPayments = months;
  
//   const monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
//   return monthlyPayment; 


// }

// // Function to calculate interest for a specific month
// function calculateInterestForMonth(remainingPrincipal, annualInterestRate) {
//   const monthlyInterestRate = annualInterestRate / 12 / 100;
  
//   const interestPayment = remainingPrincipal * monthlyInterestRate;
  
//   return interestPayment; 
// }



// function calculatePrincipal(total,interest){

//   return (total-interest);
// }



// function arrayFactory(principal, annualInterestRate, loanTermYears){
//   loanTermYears=Math.floor(loanTermYears)
//   let months=loanTermYears*12;
//   let arr=[];
//   let payment=currentMonthPayment(principal,annualInterestRate,months)
//   let total_interest=0;
//   for(let i=0;i<months;i++){

//     if(payment>principal){
//       console.log(principal);
//       payment=currentMonthPayment(principal,annualInterestRate,months-i)
//       console.log(payment);
//     }
//     let interest=calculateInterestForMonth(principal,annualInterestRate)
//     let towardsPrincipal=payment-interest;
//     total_interest+=interest;
//     principal=principal-towardsPrincipal;
//     arr.push(new monthlyPayment(payment,towardsPrincipal,interest,(i+1),principal,total_interest))
    
//   }

//   return arr;
// }
// function monthlyPayment(payment,principal,interest,month,loan_balance,interest_paid) {

//   this.month= month;
//   this.payment = payment;
//   this.principal = principal;
//   this.interest = interest;
//   this.loan_balance=loan_balance;
//   this.interest_paid=interest_paid
// }


// //check boundries 
// function lumpArrayFactory(arr,month,lump,interestRate){

//   //copy the array < then the month , update amounts 
//   const sliceArr=arr.slice(0,month-1).map(item => {
//     return{...item}
//   })  
//   console.log('lump factory')
//   console.log(arr);
//   console.log(month)
//   console.log(sliceArr)
//   console.log(sliceArr[sliceArr.length-1].loan_balance)

//   //create the new payment and adjust the balacne for the nth month
//   //create the next based on the this month unitil balacne 0

//   const lastItem = arr[sliceArr.length];
//   let newTranscation = new monthlyPayment(lastItem.payment + Number(lump), lastItem.principal + Number(lump), lastItem.interest, lastItem.month, lastItem.loan_balance - lump, lastItem.total_interest);
//   sliceArr.push(newTranscation);

//   let payment=arr[0].payment //keeping same payment
  
//   while(sliceArr[sliceArr.length-1].loan_balance>0){

//     let last=sliceArr[sliceArr.length-1];
//     let monthLeft=arr.length-last.month;
//     if(payment>last.loan_balance){
//       console.log(last.loan_balancel);
//       payment=currentMonthPayment(last.loan_balance,interestRate,1)
//       console.log(payment);
//     }
//     let interest=calculateInterestForMonth(last.loan_balance,interestRate);
//     let paidToPrincipal=payment-interest;
//     newTranscation=new monthlyPayment(payment,paidToPrincipal,interest,last.month+1,last.loan_balance-paidToPrincipal,last.total_interest+interest);
//     sliceArr.push(newTranscation);



//   }

//   console.log(sliceArr)
//   return sliceArr


// }


// const List = (props) => {
//   const payments = props.payments;
//   const setPayments=props.setPayments;
//   const interestRate=props.interestRate;
//   const [lumps,setLumps]=useState([]); // this is for the history aspect 
//   const [input,setInputs]=useState([]);
  
//   useEffect(()=>{

//     //if payments change then input must be cleared and new index must be genereated 
//     let temp=payments.map(payment => {
//       return 0
//     })

//     setInputs(temp)
    
//   },[payments])


//   const addLump=(month,payment,event)=>{
//     console.log(month)
//     console.log(payment)
//     console.log(input[month-1])
//     let lumpPayment=input[month-1]

//     let tempLumps=[...lumps]
//     let prevlump=tempLumps.find(lump => {return lump.month===month})

//     if(prevlump){
//       prevlump.amount+=Number(lumpPayment)

//     }else{  
//       let lumpAddition = {
//         month: month,
//         amount: Number(lumpPayment),
//       }
//       tempLumps.push(lumpAddition)
//     }

//     let temp=lumpArrayFactory( payments.map(item=>{
//       return {...item}
//     }),month,lumpPayment,interestRate)
//     //i need to add the lump sum payment update the priciple at that point and update the values after that month
//     setPayments(temp)
//     setLumps(tempLumps)
//   }

//   const handelInput=(month,event)=>{
//     let temp=[...input]
//     temp[month-1]=event.target.value;
//     setInputs(temp)
    
//   }

//   return (<>
//     <div>
//       {lumps.length > 0 && (
//         <>
//           <p>Lump payments added</p>
//           <ul>
//             {lumps.map(payment => {
//               return <li key={payment.month}>{`${payment.amount} $ added to month ${payment.month}`}</li>
//             })
//             }
//           </ul>
//         </>
//       )
//       }
//     </div>
//     <table>
//       <thead>
//         <tr>
//           <th>#month</th>
//           <th>payment</th>
//           <th>principal</th>
//           <th>intrest</th>
//         </tr>
//       </thead>
//       <tbody>
//         {payments.map((item) => (
//           <tr key={item.month}>
//             <td>{item.month}</td>
//             <td>{(item.payment).toFixed(2)}</td>
//             <td>{(item.principal).toFixed(2)}</td>
//             <td>{(item.interest).toFixed(2)}</td>
//             <td><input
//               type='number'
//               value={input[item.month-1]||''}
//               onChange={(event)=>handelInput(item.month,event)}
//               >
//             </input>
//             <button onClick={(event) => addLump(item.month,item.payment,event)}>Add Lump</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>


//   </>)
// }



// const Calculator= (props) =>{

//   const [loanAmount, setLoanAmount] = useState(5000);
//   const [interestRate, setInterestRate] = useState(4.5);
//   const [loanTerm, setLoanTerm] = useState(1);
//   const [loanTermMonth,setLoanTermMonth]= useState(60)
//   const [info, setInfo] =useState('enter loan information')
//   const [payments,setPayments]=useState([])

//   useEffect(()=>{

//     let monthlyPayment = calculateMonthlyPayment(loanAmount,interestRate,loanTerm)
//     let interest=calculateInterestForMonth(loanAmount,interestRate)
//     let principal=calculatePrincipal(monthlyPayment,interest)
//     if(!isNaN(monthlyPayment) && isFinite(monthlyPayment)){
      
//       let arr=arrayFactory(loanAmount,interestRate,loanTerm)
//       setPayments(arr)
//     }

//   },[loanAmount,interestRate,loanTerm])

//   useEffect(()=>{ //if payments is updated then this triggerent to recalculate

//     let summary={
//       total_amount: 0,
//       total_interest: 0
//     }

//     payments.reduce((sum,transcation)=>{
//       sum.total_amount+=transcation.payment;
//       sum.total_interest+=transcation.interest;
//       return sum;
//     },summary)

//     setInfo(`Total amount paid: ${(summary.total_amount).toFixed(2)}, Total interest paid: ${(summary.total_interest).toFixed(2)}`)
//   },[payments])

//   const handleLoanAmountChange = (event) => {
//     setLoanAmount(event.target.value);
//   };

//   const handleInterestRateChange = (event) => {
//     setInterestRate(event.target.value);
//   };

//   const handleLoanTermChange = (event) => {
//     setLoanTerm(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//     console.log('Loan Amount:', loanAmount);
//     console.log('Interest Rate:', interestRate);
//     console.log('Loan Term:', loanTerm);
    


//   };

//   return (

//     <></>
    
//   );


// }


function App() {

  const [count, setCount] = useState(0)
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermYear, setLoanTermYear] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

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
      <Calculator //read the values from the input and calculate the monthly payment and interest return a info string
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTermYear={loanTermYear}
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
      />
      <Amortization //read the values from the input and calculate the monthly payment and interest return a info string
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTermYear={loanTermYear}
        monthlyPayment={monthlyPayment}
      />
    </>
  )
}

export default App
