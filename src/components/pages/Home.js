import React from 'react'
import Header from '../layouts/Header';
import Countries from '../layouts/Countries';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [data, setData] = useState();
    const [searchfield, setSearchfield] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await axios.get('https://api.covid19api.com/summary');
                setData(res.data);
            }catch(error){
                console.log(error);
            }
        };
        fetch();
    }, []);
    
    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    const filteredData = data?.Countries.filter(
        dat => dat.Country.toLowerCase().includes(searchfield.toLowerCase())
    ) ?? [];
    return (
        <div className="main-container">
            <Header searchChange={onSearchChange}/>
            <div className="countries">
            <Countries data={filteredData}/>
            </div>
        </div>
    )
}

export default Home;
