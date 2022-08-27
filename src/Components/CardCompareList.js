import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AddExistingCardModal from './AddExistingCardModal';
import CardCompareListDetails from './CardCompareListDetails';
import './CSS/CompareList.css';

export default function CardCompareList({ compareList, removeCompareList, removeCompareItem, setCompareList }) {
    const [openCompareListDetails, setOpenCompareListDetails] = useState(false);
    const [openExistingCardModal, setOpenExistingCardModal] = useState(false);
    const [existingCard, setExistingCard] = useState(false);
    const handleOpenCompareListDetails = () => setOpenCompareListDetails(true);
    const handleCloseCompareListDetails = () => setOpenCompareListDetails(false);

    const handleOpenExistingCardModal = () => setOpenExistingCardModal(true);
    const handleCloseExistingCardModal = () => setOpenExistingCardModal(false);

    const handleAddExistingCard = (e) => {
        e.preventDefault();

        const newObj = {
            image_url: "https://i.postimg.cc/W3pxshNQ/fake-cradit-card.png",
            name: "Your existing card",
            free_anual_fee: e.target.free_anual_fee.value ? `1st Year ${e.target.free_anual_fee.value}% Free` : "",
            regular_anual_fee: e.target.regular_anual_fee.value ? e.target.regular_anual_fee.value + " BDT" : "",
            anual_fee_waived_rewards: e.target.anual_fee_waived_rewards.value ? e.target.anual_fee_waived_rewards.value + " Points" : "",
            interest_free_period: e.target.interest_free_period.value ? e.target.interest_free_period.value + " Days" : "",
            free_supplementary_card: e.target.free_supplementary_card.value ? e.target.free_supplementary_card.value + " Cards" : "",
            max_supplementary_card: e.target.max_supplementary_card.value ? e.target.max_supplementary_card.value + " Cards" : "",
            own_bank_atm_fee: e.target.own_bank_atm_fee.value ? e.target.own_bank_atm_fee.value + " %" : "",
            other_bank_atm_fee: e.target.other_bank_atm_fee.value ? e.target.other_bank_atm_fee.value + " %" : "",
            lounge_access_fee: e.target.lounge_access_fee.value ? e.target.lounge_access_fee.value + " USD" : "",
            int_lounge_access_fee: e.target.int_lounge_access_fee.value ? e.target.int_lounge_access_fee.value + " USD" : "",
            _id: ""
        }

        setCompareList([newObj, ...compareList]);
        handleCloseExistingCardModal();
        setExistingCard(true);
    }

    const handleRemoveCompareItem = (id) => {
        if (existingCard && id === "") {
            setExistingCard(false);
        }
        removeCompareItem(id)
    }

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
                        {
                            compareList.map(item =>
                                <div className='col-md-3'>
                                    <div className='close-compare-item' onClick={() => handleRemoveCompareItem(item._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <img src={item.image_url} className="img-fluid" />
                                </div>)
                        }
                        {
                            (compareList.length !== 4 && !existingCard) &&
                            <div className='col-md-3'>
                                <div className='d-flex justify-content-center align-items-center compare-now-btn border border-dashed '>
                                    <button className='btn border border-dashed text-break' onClick={handleOpenExistingCardModal}>Add your <br />existing card</button>
                                </div>
                            </div>
                        }
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
                <CardCompareListDetails handleCloseCompareListDetails={handleCloseCompareListDetails} compareList={compareList} />
            }

            {
                openExistingCardModal &&
                <AddExistingCardModal handleCloseExistingCardModal={handleCloseExistingCardModal} handleAddExistingCard={handleAddExistingCard} />
            }

        </>
    );
};

