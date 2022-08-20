import React from 'react';
import { useState } from 'react';

const DBRCalculator = () => {
    const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [DBR, setDBR] = useState(0);
    const calculateDBR = (e) => {
        e.preventDefault();

        const monthlyIncome = parseFloat(e.target.monthlyIncome.value || 0);
        const otherIncome = parseFloat(e.target.otherIncome.value || 0);

        const personalLoan = parseFloat(e.target.personalLoan.value || 0);
        const carLoan = parseFloat(e.target.carLoan.value || 0);
        const creditCard = parseFloat(e.target.creditCard.value || 0);
        const homeLoan = parseFloat(e.target.homeLoan.value || 0);
        const otherPayment = parseFloat(e.target.otherPayment.value || 0);

        const totalMonthlyIncome = monthlyIncome + otherIncome;
        setTotalMonthlyIncome(totalMonthlyIncome);

        const totalMonthlyPayment = personalLoan + carLoan + creditCard + homeLoan + otherPayment;
        setMonthlyPayment(totalMonthlyPayment);

        const dbr = (totalMonthlyPayment / totalMonthlyIncome) * 100;
        setDBR(dbr.toFixed(2));
    }
    return (
        <div className='container'>
            <div className='text-center my-5'>
                <h3>DBR Calculator</h3>
            </div>
            <div className='mb-5'>
                <form className='mb-5' onSubmit={calculateDBR}>
                    <h4 className='text-primary'>Income Details</h4>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label>Monthly Income</label>
                                <input type="number" className="form-control" name="monthlyIncome" />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label>Other Income (if any)</label>
                                <input type="number" className="form-control" name="otherIncome" />
                            </div>
                        </div>
                    </div>
                    <h4 className='text-primary'>Monthly Debt Payment Details</h4>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label>Personal Loan (if any)</label>
                                <input type="number" className="form-control" name="personalLoan" />
                            </div>
                            <div className='mb-3'>
                                <label>Car Loan (if any)</label>
                                <input type="number" className="form-control" name="carLoan" />
                            </div>
                            <div className='mb-3'>
                                <label>Other Payment (if any)</label>
                                <input type="number" className="form-control" name="otherPayment" />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label>Monthly Credit Card Bill (if any)</label>
                                <input type="number" className="form-control" name="creditCard" />
                            </div>
                            <div className='mb-3'>
                                <label>Home Loan (if any)</label>
                                <input type="number" className="form-control" name="homeLoan" />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-success' type='submit'>Calculate</button>
                    </div>
                </form>
                <div className='p-3 bg-info'>
                    <h5 className='text-center text-white'>Your Debt to Burden Ratio details are below</h5>
                    <div className='row pt-4'>
                        <div className='col-md-4 text-center text-white mb-3'>
                            <h4>{totalMonthlyIncome}</h4>
                            <h5>Monthly Income</h5>
                        </div>
                        <div className='col-md-4 text-center text-white mb-3'>
                            <h4>{monthlyPayment}</h4>
                            <h5>Monthly Debt Payment</h5>
                        </div>
                        <div className='col-md-4 text-center text-white mb-3'>
                            <h4>{DBR} %</h4>
                            <h5>Debt Rate</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DBRCalculator;