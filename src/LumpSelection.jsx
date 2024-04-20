import { useEffect, useState } from "react";

function lumpObject(month, amount) {
    this.month = month;
    this.amount = amount;
}


const LumpSelection = (props) => {

    //based on the term of the loan, i genereate each possible month a lump can be made
    //also have to verify that for agiven month not excedding the max amount of the loan remaining

    //which is why in need to look at the payments array and see what the remaining balance at each given month 
    //const [lumps, setLumps] = useState([]);
    const lumps=props.lumps;
    const setLumps=props.setLumps;
    const payments=props.payments;  
    const [infoMsg, setInfoMsg] = useState(null);

    //just create new month if the month already exists
    //may need modification when recalculating the payments but can i can squash all months
    const handleSubmit = (event) => { 
        event.preventDefault();
        if(infoMsg!==null){
            return;
        }
        console.log(event.target)
        console.log(event.target.lumpSelection.value)
        console.log(event.target.lumpAmount.value)
        let temp=[...lumps];
        let month=parseInt(event.target.lumpSelection.value);
        let amount=Number(event.target.lumpAmount.value);

        if(temp.find((lump)=>lump.month===month)){
            console.log('month already exists addind to existing lump')
            let index=temp.findIndex((lump)=>lump.month===month);
            temp[index].amount+=amount;
            setLumps(temp);
            return;
        }
        temp.push(new lumpObject(month,amount))
        setLumps(temp);
       
    }

    const handelClick = (month) => {
        let temp=[...lumps];
        let index=temp.findIndex((lump)=>lump.month===month);
        temp.splice(index,1);
        setLumps(temp);

    }

    const [selectedMonth, setSelectedMonth] = useState(1);
    const [input, setInput] = useState('');
    const [lumpAmount, setLumpAmount] = useState(0);

    useEffect(() => {
        
        if(payments.length===0){ //edge catch if the payments array is empty usally on start up this compoenets is rendered before the payments are calculated
            return;
        }
       
        if(lumpAmount<0){
            setInfoMsg('Enter valid amount greater than 0')
            return;
        }
        
        let balance=payments[selectedMonth-1].loan_balance;
        if(lumpAmount>balance){
            setInfoMsg('Lump amount exceeds loan balance, Enter valid amount')
            return;
        }
        setInfoMsg(null)

    },[selectedMonth,lumpAmount,payments])

  
    useEffect(()=>{ //when ever new lump is created clear the input and set lump amount to 0
        setInput('') //using two variables to clear the input field and pervent the value 0 from being displayed
        setLumpAmount(0)
    },[lumps])

    const handelSelection = (event) => {
        console.log(event.target.value)
        setSelectedMonth(event.target.value)
    }

    const handelInput = (event) => {    
        console.log(event.target.value)
        setInput(event.target.value)
        let amount=Number(event.target.value);
        setLumpAmount(amount)        
    }


    return (
        <>
        <div>
            <h3> Lump Selection</h3>
            <form onSubmit={handleSubmit}>
            <label> Select Month</label>
            <select name='lumpSelection' id='lumpSelection' onChange={handelSelection}>
                {payments.map((payment) => {
                    return <option key={payment.month} value={payment.month}> {payment.month}</option>
                })}
            </select>
            <label> Lump Amount $</label>
            <input type='number' name='lumpAmount' id='lumpAmount' step="0.01" min="0" onInput={handelInput} value={input} />
            <button> Add Lump</button>
            </form>   
        </div> 
        <p style={{ color: 'red' }}>{infoMsg}</p>
        {lumps.length>0 && <div>
            <h3> Lump Summary</h3>
            <ul>
                {lumps.map((lump) => {
                    return <li key={lump.month}> Month: {lump.month} Amount: {lump.amount} <button onClick={()=>handelClick(lump.month)}>Remove</button></li>
                })}
            </ul>
        </div>
           
        }

        </>
        
    
    
    );
}

export default LumpSelection;