import React from 'react';
import Select from 'react-select'

const SelectL = ({ value, onChange, options, placeholder, isDisabled }) => {
    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#12232E',
            color: 'white',
            borderRadius: '0.5rem',
            borderColor: '#004A77',
            cursor: 'pointer',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#12232E',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#004A77' : '#12232E',
            color: 'white',
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'white',
        }),
    };

    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            styles={customSelectStyles}
            isClearable
            placeholder={placeholder}
            isDisabled={isDisabled}
        />
    );
};

export default SelectL;
