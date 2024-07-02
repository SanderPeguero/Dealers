import React from 'react';

const CheckBox = ({ text, isChecked, onCheckboxChange }) => {
    return (
        <div className='mb-4 flex flex-row '>
            <div className='flex flex-row items-center'>
                <input 
                    type='checkbox' 
                    id={text} 
                    checked={isChecked} 
                    onChange={onCheckboxChange} 
                    className='h-4 w-4 bg-transparent rounded-full border border-blue-gray-200 relative border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                />
                <label htmlFor={text} className='ml-2 text-sm'>{text}</label>
            </div>
        </div>
    );
};

export default CheckBox;
