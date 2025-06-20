import React from 'react';
import logo from '../../assets/brands/logo.png'

const PandaExpressLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="logo" className='mb-2'/>
            <p className='text-3xl -ml-4 font-extrabold'>Panda Express</p>
        </div>
    );
};

export default PandaExpressLogo;