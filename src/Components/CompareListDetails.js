import React from 'react';

const compareList = [
    { image_url: "https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg", name: "Details", interestRate: "Interest Rate", minimumLoanAmount: "Minimum Loan Amount", maximumLoanAmount: "Maximum Loan Amount", minimumLoanTenure: "Minimum Loan Tenure", otherFact: "Other Fact", feature: "Feature", eligibility: "Eligibility", feesCharges: "Fees & Charges" },
    { image_url: "https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg", name: "Details", interestRate: "Interest Rate", minimumLoanAmount: "Minimum Loan Amount", maximumLoanAmount: "Maximum Loan Amount", minimumLoanTenure: "Minimum Loan Tenure", otherFact: "Other Fact", feature: "Feature", eligibility: "Eligibility", feesCharges: "Fees & Charges" },
    { image_url: "https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg", name: "Details", interestRate: "Interest Rate", minimumLoanAmount: "Minimum Loan Amount", maximumLoanAmount: "Maximum Loan Amount", minimumLoanTenure: "Minimum Loan Tenure", otherFact: "Other Fact", feature: "Feature", eligibility: "Eligibility", feesCharges: "Fees & Charges" }
]

const CompareListDetails = ({ handleCloseCompareListDetails }) => {

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
                                        compareList.map((item, i) =>
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
                                                        <h5 className='mt-2 mb-0'>{Object.values(item)[1]}</h5>
                                                    </div>
                                                </div>
                                        )
                                    }
                                </div>
                                :
                                index !== 1 &&
                                <div className='row' key={index}>
                                    {
                                        compareList.map(item =>
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
                    {/* <div className='row'>
                        <div className='col details px-0'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <h5>Details</h5>
                            </div>
                            <div>
                                <h5>Interest Rate</h5>
                            </div>
                            <div>
                                <h5>Minimum Loan Amount</h5>
                            </div>
                            <div>
                                <h5>Maximum Loan Amount</h5>
                            </div>
                            <div>
                                <h5>Minimum Loan Tenure</h5>
                            </div>
                            <div>
                                <h5>Other Fact</h5>
                            </div>
                            <div>
                                <h5>Feature</h5>
                            </div>
                            <div>
                                <h5>Eligibility</h5>
                            </div>
                            <div>
                                <h5>Fees & Charges</h5>
                            </div>
                        </div>
                        <div className='col details px-0'>
                            <div>
                                <img src='https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg' className='img-fluid' />
                                <h5 className='mt-1'>SCB</h5>
                            </div>
                        </div>
                        <div className='col details px-0'>
                            <div>
                                <img src='https://backend.loanerbazar.com/public/uploads/1654329074988_1.jpeg' className='img-fluid' />
                                <h5 className='mt-1'>SCB</h5>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CompareListDetails;