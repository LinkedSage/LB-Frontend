import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PersonalLoanCompareListDetails = ({ handleCloseCompareListDetails, compareList }) => {
    const [newCompareList, setNewCompareList] = useState([{ image_url: "https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg", name: "Details", interest_rate: "Interest Rate", max_loan_amount: "Max Loan Amount", max_loan_duration: "Max Loan Duration", min_loan_amount: "Min Loan Amount", min_loan_duration: "Min Loan Duration", max_tenor: "Max Tenor", min_tenor: "Min Tenor", _id: "" }]);
    useEffect(() => {
        const newArr = compareList.map(item => {
            const newObj = {
                image_url: item.image_url,
                name: item.name,
                interest_rate: item.interest_rate,
                max_loan_amount: item.max_loan_amount,
                max_loan_duration: item.max_loan_duration,
                min_loan_amount: item.min_loan_amount,
                min_loan_duration: item.min_loan_duration,
                max_tenor: item.max_tenor,
                min_tenor: item.min_tenor,
                _id: item._id
            }
            return newObj;
        })
        return setNewCompareList([...newCompareList, ...newArr])
    }, [compareList])
    return (
        <div className="modal-overlay">
            <div className="compare-list-modal">
                <div className='close-compare-list' onClick={handleCloseCompareListDetails}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='compare-list-modal-header'>
                    <h4>Choose your best suitable loan</h4>
                </div>
                <div className='compare-list-modal-body'>
                    {
                        Array(10).fill(0).map((_, index) =>
                            index === 0 ?
                                <div className='row' key={index}>
                                    {
                                        newCompareList.map((item, i) =>
                                            i === 0 ?
                                                <div className='col details px-0'>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                        </svg>
                                                        <h5>Details</h5>
                                                    </div>
                                                </div>
                                                :
                                                <div className='col details px-0'>
                                                    <div className='h-100'>
                                                        <img src={Object.values(item)[index]} className='img-fluid' />
                                                        <Link
                                                            className="btn btn-warning mt-1 btn-sm"
                                                            to={{
                                                                pathname: `/personal-loan-application/${item._id}`,
                                                                state: { item },
                                                            }}
                                                        >
                                                            Apply Now
                                                        </Link>
                                                    </div>
                                                </div>
                                        )
                                    }
                                </div>
                                :
                                (index !== 1 && index !== 9) &&
                                <div className='row' key={index}>
                                    {
                                        newCompareList.map(item =>
                                            <div className='col details px-0'>
                                                <div>
                                                    <h5>{Object.values(item)[index]}</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PersonalLoanCompareListDetails;