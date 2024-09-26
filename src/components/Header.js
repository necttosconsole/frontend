import React from 'react';
import Logo from './Logo';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='h-16 shadow-md bg-slate-0'>
      <div className='h-full  mx-48 flex items-center justify-between px-4 relative'>

        <div className=''>
          <Link to={'/'}>
          <Logo w={90}h={50}/>
          </Link>
        </div>

        <div className='flex items-center w-full max-w-md justify-center mx-4'>
          <div className='flex items-center w-full border rounded-full'>
            <input
              type='text'
              className='w-full outline-none pl-4 py-2 rounded-full focus-within:shadow-md'
              placeholder='Search product here...'
            />
            <div className='text-lg w-12 h-10 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
            </div>
          </div>
        </div>

<div className='flex items-center gap-7'>
   <div className='flex items-center space-x-6 text-2xl'>
          <FaRegCircleUser className='cursor-pointer' />
        </div>

        <div className='relative text-2xl cursor-pointer mt-2'>
          <FaShoppingCart />
          <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-0 right-0 transform translate-x-2 -translate-y-2'>
            <p className='text-xs'>0</p>
          </div>
        </div>

        <div>
        <Link to={"/login"} className='px-4 py-2 text-white rounded-full ml-4 bg-red-600 hover:bg-red-700'>
  LOGIN
</Link>

        </div>
</div>
       

      </div>
    </header>
  );
};

export default Header;
