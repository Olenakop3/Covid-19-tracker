import React from 'react';
import SearchBox from '../layouts/SearchBox';
import './Header.css'
/*import { Link } from 'react-router-dom';*/

const Header = ({searchChange}) => {
    return (
        <header className="header">
            <div className="logo-title">
                <div className="virus-logo"></div>
                <div className="title">Statistic</div>   
            </div> 
            <div className="search-box">
                <SearchBox searchChange={searchChange}/>
            </div>
        </header>
    )
};
export default Header;