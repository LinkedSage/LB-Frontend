import React from 'react';
import { useState } from 'react';
import './CSS/CompareList.css';
import PersonalLoanCompareListDetails from './PersonalLoanCompareListDetails';

export default function PersonalLoanCompareList({ compareList, removeCompareList, removeCompareItem }) {
    const [openCompareListDetails, setOpenCompareListDetails] = useState(false);
    const handleOpenCompareListDetails = () => setOpenCompareListDetails(true);
    const handleCloseCompareListDetails = () => setOpenCompareListDetails(false);
    console.log(compareList)
    return (
        <>
            <div className='row shadow compare-list'>
                <div className='close-compare-list' onClick={removeCompareList}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='col-md-10'>
                    <div className='row h-100'>
                        <div className='col-md-3'>
                            {
                                compareList[0] && <>

                                    <div className='close-compare-item' onClick={() => removeCompareItem(compareList[0]._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <img src={compareList[0].image_url} className="img-fluid" />
                                </>
                            }
                        </div>
                        <div className='col-md-3'>
                            {
                                compareList[1] && <>

                                    <div className='close-compare-item' onClick={() => removeCompareItem(compareList[1]._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <img src={compareList[1] && compareList[1].image_url} className="img-fluid" />
                                </>
                            }
                        </div>
                        <div className='col-md-3'>
                            {
                                compareList[2] && <>

                                    <div className='close-compare-item' onClick={() => removeCompareItem(compareList[2]._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <img src={compareList[2] && compareList[2].image_url} className="img-fluid" />
                                </>
                            }
                        </div>
                        <div className='col-md-3'>
                            {
                                compareList[3] && <>

                                    <div className='close-compare-item' onClick={() => removeCompareItem(compareList[3]._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <img src={compareList[3] && compareList[3].image_url} className="img-fluid" />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='d-flex justify-content-center align-items-center compare-now-btn'>
                        <button className='btn glow-on-hover' disabled={compareList.length >= 2 ? false : true} onClick={handleOpenCompareListDetails}>Compare Now</button>
                    </div>
                </div>

            </div>
            {
                openCompareListDetails &&
                <PersonalLoanCompareListDetails handleCloseCompareListDetails={handleCloseCompareListDetails} compareList={compareList} />
            }

        </>
    );
};

