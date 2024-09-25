import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const SelectL = ({ value, onChange, options, placeholder, isDisabled }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleChange);
        };
    }, []);


    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#12232E' : '#FFFFFF',  
            color: isDarkMode ? 'white' : 'black', 
            borderRadius: '0.5rem',
            borderColor: isDarkMode ? '#004A77' : '#CCCCCC',  
            cursor: 'pointer',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: isDarkMode ? '#12232E' : '#FFFFFF', 
            color: isDarkMode ? 'white' : 'black',  
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#004A77' : (isDarkMode ? '#12232E' : '#FFFFFF'),  
            color: isDarkMode ? 'white' : 'black',  
            cursor: 'pointer',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black',  
        }),
        input: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black', 
        }),
        placeholder: (provided) => ({
            ...provided,
            color: isDarkMode ? 'white' : 'black', 
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
            className="w-full"
        />
    );
};

export default SelectL;
