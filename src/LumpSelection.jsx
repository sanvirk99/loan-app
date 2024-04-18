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

    useEffect(() => {
        
        //when payments modified, need lumps no longer taken into account should be removed 

    },[payments])


    //just create new month if the month already exists
    //may need modification when recalculating the payments but can i can squash all months
    const handleSubmit = (event) => { 
        event.preventDefault();
        console.log(event.target)
        console.log(event.target.lumpSelection.value)
        console.log(event.target.lumpAmount.value)
        let temp=[...lumps];
        let month=parseInt(event.target.lumpSelection.value);
        let amount=Number(event.target.lumpAmount.value);
        temp.push(new lumpObject(month,amount))
        setLumps(temp);
       
    }

    const handelClick = (month) => {
        let temp=[...lumps];
        let index=temp.findIndex((lump)=>lump.month===month);
        temp.splice(index,1);
        setLumps(temp);

    }



    return (
        <>
        <div>
            <h3> Lump Selection</h3>
            <form onSubmit={handleSubmit}>
            <select name='lumpSelection' id='lumpSelection'>
                <option value='1'>month 1</option>
                <option value='2'>month 2</option>
                <option value='3'>month 3</option>
                <option value='4'>month 4</option>
            </select>
            <input type='number' name='lumpAmount' id='lumpAmount' />
            <button> Add Lump</button>
            </form>   
        </div> 
        
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