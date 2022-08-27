import React from 'react';

const AddExistingCardModal = ({ handleCloseExistingCardModal, handleAddExistingCard }) => {

    return (
        <div className="modal-overlay">
            <div className="compare-list-modal">
                <div className='close-compare-list' onClick={handleCloseExistingCardModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='compare-list-modal-header'>
                    <h4>Add Your Existing Card</h4>
                </div>
                <div className='add-existing-card-body'>
                    <form onSubmit={handleAddExistingCard}>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='free_anual_fee' className='text-nowrap mr-2'>Free Annual Fee:</label>
                            <input type="number" className='form-control' name='free_anual_fee' id='free_anual_fee' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='regular_anual_fee' className='text-nowrap mr-2'>Regular Annual Fee(BDT):</label>
                            <input type="number" className='form-control' name='regular_anual_fee' id='regular_anual_fee' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='anual_fee_waived_rewards' className='text-nowrap mr-2'>Reward Points:</label>
                            <input type="number" className='form-control' name='anual_fee_waived_rewards' id='anual_fee_waived_rewards' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='interest_free_period' className='text-nowrap mr-2'>Interest Free Period(Days):</label>
                            <input type="number" className='form-control' name='interest_free_period' id='interest_free_period' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='free_supplementary_card' className='text-nowrap mr-2'>Free Supplementary Card:</label>
                            <select className='form-control' name='free_supplementary_card' id='free_supplementary_card'>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='max_supplementary_card' className='text-nowrap mr-2'>Max Supplementary Card:</label>
                            <select className='form-control' name='max_supplementary_card' id='max_supplementary_card' >
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='own_bank_atm_fee' className='text-nowrap mr-2'>Own Bank ATM Fee(%):</label>
                            <input type="number" className='form-control' name='own_bank_atm_fee' id='own_bank_atm_fee' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='other_bank_atm_fee' className='text-nowrap mr-2'>Other Bank ATM Fee(%):</label>
                            <input type="number" className='form-control' name='other_bank_atm_fee' id='other_bank_atm_fee' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='lounge_access_fee' className='text-nowrap mr-2'>Lounge Access Fee:</label>
                            <input type="number" className='form-control' name='lounge_access_fee' id='lounge_access_fee' />
                        </div>
                        <div className='mb-3 d-flex align-items-center'>
                            <label htmlFor='int_lounge_access_fee' className='text-nowrap mr-2'>Int. Lounge Access Fee:</label>
                            <input type="number" className='form-control' name='int_lounge_access_fee' id='int_lounge_access_fee' />
                        </div>
                        <button type='submit' className='btn glow-on-hover float-right'>Add Existing Card</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExistingCardModal;