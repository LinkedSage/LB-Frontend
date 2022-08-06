import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CarLoanCompareListDetails = ({ handleCloseCompareListDetails, compareList }) => {
    const [newCompareList, setNewCompareList] = useState([{ image_url: "https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg", name: "Details", free_anual_fee: "Free Annual Fee", regular_anual_fee: "Regular Annual Fee", anual_fee_waived_rewards: "Rewards Points", interest_free_period: "Interest Free Period", free_supplementary_card: "Free Supplementary Card", max_supplementary_card: "Max Supplementary Card", own_bank_atm_fee: "ATM Fee (own)", other_bank_atm_fee: "ATM Fee (other)", lounge_access_fee: "Lounge Facility (Local)", int_lounge_access_fee: "Lounge Facility (Int.)", _id: "" }]);
    useEffect(() => {
        const newArr = compareList.map(item => {
            const newObj = {
                image_url: item.image_url,
                name: item.name,
                free_anual_fee: item.free_anual_fee,
                regular_anual_fee: item.regular_anual_fee,
                anual_fee_waived_rewards: item.anual_fee_waived_rewards,
                interest_free_period: item.interest_free_period,
                free_supplementary_card: item.free_supplementary_card,
                max_supplementary_card: item.max_supplementary_card,
                own_bank_atm_fee: item.own_bank_atm_fee,
                other_bank_atm_fee: item.other_bank_atm_fee,
                lounge_access_fee: item.lounge_access_fee,
                int_lounge_access_fee: item.int_lounge_access_fee,
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
                                                                pathname: `/auto-loan-application/${item._id}`,
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
                                index !== 1 &&
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

export default CarLoanCompareListDetails;