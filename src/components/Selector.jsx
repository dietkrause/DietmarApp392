import React from 'react';
import './Selector.css';  // Importing the CSS

function Selector({ options, defaultOption, selection, setSelection }) {
  const handleChange = (option) => {
    setSelection(option);
    console.log("New Selection:", option);
  }

  return (
    <div className="selector-container">
      {options.map(option => (
        <label key={option}>
          <input 
            type="radio" 
            value={option} 
            checked={selection === option} 
            onChange={() => handleChange(option)}  // Modified this line
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default Selector;







