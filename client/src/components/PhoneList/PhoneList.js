import React from 'react';
import idGeneration from '../../idGeneration'
import './PhoneList.css'

function PhoneList({ phones }) {

  return (
    <div className='m-3'>
      {phones ? phones.map(el => <div className='phone' key={idGeneration()}>{el.phone}</div>) : <div></div>}
    </div>
  );
}

export default PhoneList;
