import { useEffect, useState } from "react";
import './styles/input.css';

const Input = (props) => {


    const loanTermYear = props.loanTermYear;
    const interestRate = props.interestRate;
    const loanAmount = props.loanAmount

    const setLoanAmount = props.setLoanAmount;
    const setInterestRate = props.setInterestRate;
    const setLoanTermYear = props.setLoanTermYear;
    const setLoanTermMonths = props.setLoanTermMonths;

    const [inputLoanAmount, setInputLoanAmount] = useState(loanAmount);
    const [inputInterestRate, setInputInterestRate] = useState(interestRate);
    const [inputLoanTermYear, setInputLoanTermYear] = useState(loanTermYear);

    const [info, setInfo] = useState({
        loanAmount: '',
        interestRate: '',
        loanTermYear: '',
    });



    //can do input validation here before setting these values
    const handleLoanAmountChange = (event) => {

        if (event.target.value.startsWith('0') && event.target.value.length > 1) {
            // Remove leading zeros
            event.target.value = event.target.value.replace(/^0+/, '');
        }
        if (event.target.value.startsWith('.')) {
            event.target.value = event.target.value.replace(/^./, '0.');
        }

        let amount = Number(event.target.value);
        setInputLoanAmount(amount);

        if (amount < 1 || amount > 10000000000000000) {
            //setInfo('Loan amount should be between 1 and 10000000000000000 ')
            setInfo({ ...info, loanAmount: 'Loan amount should be between 1 and 10000000000000000 ' })
            if (amount > 10000000000000000) {
                //setInfo('You need to hire me to calculate that amount of money personally for you.')
                setInfo({ ...info, loanAmount: 'You need to hire me to calculate that amount of money personally for you.' })

            }
            return;
        }
        setInfo({ ...info, loanAmount: '' });
        setLoanAmount(amount);
    };

    const handleInterestRateChange = (event) => {

        if (event.target.value.startsWith('0') && event.target.value.length > 1) {
            // Remove leading zeros
            event.target.value = event.target.value.replace(/^0+/, '');
        }
        if (event.target.value.startsWith('.')) {
            event.target.value = event.target.value.replace(/^./, '0.');
        }

        let rate = Number(event.target.value);
        setInputInterestRate(rate);

        if (rate <= 0 || rate > 100) {
            setInfo({ ...info, interestRate: 'Interest rate should be in range (0.1-100) ' })
            return;
        }
        setInfo({ ...info, interestRate: '' });
        setInterestRate(rate);
    };

    const handleLoanTermChange = (event) => {
        if (event.target.value.startsWith('0') && event.target.value.length > 1) {
            // Remove leading zeros
            event.target.value = event.target.value.replace(/^0+/, '');
        }
        if (event.target.value.startsWith('.')) {
            event.target.value = event.target.value.replace(/^./, '0.');
        }
        let years = Number(event.target.value);
        setInputLoanTermYear(years);

        if (years > 30 || years < 0.1) {

            setInfo({ ...info, loanTermYear: 'Loan term should be 1 and 30 years range' })
            //setLoanTermYear(1);
            return;
        }
        setInfo({ ...info, loanTermYear: '' });
        let months = Math.round(Number((event.target.value) * 12))
        console.log(months, 'months calculated from years')
        setLoanTermMonths(months);
        setLoanTermYear(years);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log('Loan Amount:', inputLoanAmount);
        console.log('Interest Rate:', inputInterestRate);
        console.log('Loan Term:', inputLoanTermYear);

    };

    return (
        <div>
            <form onSubmit={handleSubmit} className>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Loan Amount ($):</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={inputLoanAmount}
                                    onChange={handleLoanAmountChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Interest Rate APR (%):</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0.0"
                                    max="100"
                                    step="0.5"
                                    value={inputInterestRate}
                                    onChange={handleInterestRateChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Loan Term (years):</label>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0.1"
                                    step="0.1"
                                    value={inputLoanTermYear}
                                    onChange={handleLoanTermChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {info.loanAmount && (<p className="warning">{info.loanAmount}</p>)}
                {info.interestRate && (<p className="warning">{info.interestRate}</p>)}
                {info.loanTermYear && (<p className="warning">{info.loanTermYear}</p>)}
            </form>
        </div>
    );

}


export default Input;