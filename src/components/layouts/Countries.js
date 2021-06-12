import React from 'react';
import { useState} from 'react';
import './Countries.css'

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };

const Countries = ({data}) => {    
    const [showCard, setShowCard] = useState('none');
    const { items, requestSort, sortConfig } = useSortableData(data);

    const ShowOnClick = (cardId) =>{
        setShowCard(cardId)
    } 

    const CloseOnClick = (e) => {
        e.stopPropagation();
        setShowCard('none')
    }
    
    const getClassNamesFor = (country) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === country ? sortConfig.direction : undefined;
      };

    if (!data) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
    <table className="table">
        <thead>
            <tr>
                <th>№</th>
                <th onClick={() => requestSort('Country')}
                    className={getClassNamesFor('Country')}>Country</th>
                <th onClick={() => requestSort('TotalConfirmed')}
                    className={getClassNamesFor('TotalConfirmed')}>Total Confirmed</th>
            </tr>
        </thead>
        <tbody>
            {items.map((country, index) => (                        
                <tr onClick={() => ShowOnClick(index)} key={index}>
                    <td>{index + 1}</td>
                    <td>{country.Country}</td>
                    <td>{country.TotalConfirmed}</td>
                    <td>
                     <div  className="card" style={{display: showCard === index ? 'grid' : 'none'}}>
                            <div className="country">{country.Country}</div>
                            <div className="stat">
                                <div className="img-heart"></div>
                                <div>Total Confirmed</div>
                                <div className="card-stat">{country.TotalConfirmed}</div>
                            </div>
                            <div className="stat">
                                <div className="img-skull"></div>
                                <div>Total Deaths</div>
                                <div className="card-stat">{country.TotalDeaths}</div>
                            </div>
                            <div className="stat">
                                <div className="img-plus"></div>
                                <div>Total Recovered</div>
                                <div className="card-stat">{country.TotalRecovered}</div>
                            </div>
                            <button onClick={CloseOnClick} className="btn">OK</button>
                        </div>                
                    </td>           
                </tr>
            ))}
        </tbody>
    </table>
    )
};

export default Countries;
