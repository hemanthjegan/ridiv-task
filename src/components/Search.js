import React from 'react';

const Search = ({ inputText, handleCity, handleKeyDown, HandleSearch }) => {
    return (
        <div className='input-container'>
            <input 
                type='text' 
                className='cityInput' 
                placeholder='Search City' 
                onChange={handleCity} 
                value={inputText} 
                onKeyDown={handleKeyDown} 
            />
            <div className='search-icon' onClick={HandleSearch}>
                <img src='./assets/search-3.png' alt='search'/>
            </div>
        </div>
    );
};

export default Search;
