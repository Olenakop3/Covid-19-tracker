import React from 'react';
import './searchbox.css'

const SearchBox = ({searchChange}) =>{
    return(
        <input type='search'
        className='search'
        placeholder='Search...'
        onChange={searchChange}
        />
    )
}

export default SearchBox;

