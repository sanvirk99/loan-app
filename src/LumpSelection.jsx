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
    const lumps = props.lumps;
    const setLumps = props.setLumps;
    const payments = props.payments;
    const [infoMsg, setInfoMsg] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [input, setInput] = useState('');
    const [lumpAmount, setLumpAmount] = useState(0);


    //just create new month if the month already exists
    //may need modification when recalculating the payments but can i can squash all months
    const handleSubmit = (event) => {
        event.preventDefault();
        if (infoMsg !== null) {
            return;
        }
    
        console.log(selectedMonth)
        console.log(lumpAmount)
        let temp = [...lumps];
        let month = selectedMonth;
        let amount = lumpAmount;

        if (temp.find((lump) => lump.month === month)) {
            console.log('month already exists addind to existing lump')
            let index = temp.findIndex((lump) => lump.month === month);
            temp[index].amount += amount;
            setLumps(temp);
            return;
        }
        temp.push(new lumpObject(month, amount))
        setLumps(temp);

    }

    const handelClick = (month) => {
        let temp = [...lumps];
        let index = temp.findIndex((lump) => lump.month === month);
        temp.splice(index, 1);
        setLumps(temp);

    }

 
    useEffect(() => {

        if (payments.length === 0) { //edge catch if the payments array is empty usally on start up this compoenets is rendered before the payments are calculated
            return;
        }

        if (lumpAmount < 0) {
            setInfoMsg('Enter valid amount greater than 0')
            return;
        }

        let balance = payments[selectedMonth - 1].loan_balance;
        if (lumpAmount > balance) {
            setInfoMsg('Lump amount exceeds loan balance, Enter valid amount')
            return;
        }
        setInfoMsg(null)

    }, [selectedMonth, lumpAmount, payments])


    useEffect(() => { //when ever new lump is created clear the input and set lump amount to 0
        setInput('') //using two variables to clear the input field and pervent the value 0 from being displayed
        setLumpAmount(0)
    }, [lumps])

    const handelSelection = (event) => {
        console.log(event.target.value)
        setSelectedMonth(event.target.value)
    }

    const handelInput = (event) => {
        console.log(event.target.value)
        setInput(event.target.value)
        let amount = Number(event.target.value);
        setLumpAmount(amount)
    }


    return (
        <div>
            <div>
                <h3> Lump Selection</h3>
                <form onSubmit={handleSubmit} className="form-row">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="lumpSelection">Select Month</label>
                                </td>
                                <td>
                                    <select name="lumpSelection" id="lumpSelection" onChange={handelSelection}>
                                        {payments.map((payment) => (
                                            <option key={payment.month} value={payment.month}>{payment.month}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <label htmlFor="lumpAmount">Lump Amount $</label>
                                </td>
                                <td>
                                    <input type="number" name="lumpAmount" id="lumpAmount" step="0.01" min="0" onInput={handelInput} value={input} />
                                </td>
                                <td>
                                    <button onClick={handleSubmit}>Add Lump</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <p style={{ color: 'red' }}>{infoMsg}</p>
            {lumps.length > 0 && <div>
                <h3> Applied Lumps</h3>
                <ul>
                    {lumps.map((lump) => {
                        return <li key={lump.month}> Month: {lump.month} Amount: {lump.amount} <button onClick={() => handelClick(lump.month)}>Remove</button></li>
                    })}
                </ul>
            </div>

            }
            <p>Only applicable lumps amounts will be applied<br />
                Applied lumps will be added to the total payment for the specifc month<br />
                Remove lumps if you no longer wish to apply it  </p>
        </div>



    );
}

export default LumpSelection;