import React from 'react';
import './Selector.css';

function Selector({ options, defaultOption, selection, setSelection }) {
    const handleChange = (option) => {
        setSelection(option);
        console.log("New Selection:", option);
    }

    return (
        <div className="selector-container">
            {options.map(option => (
                <button 
                    key={option}
                    className={selection === option ? 'selected' : ''}
                    onClick={() => handleChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Selector;







