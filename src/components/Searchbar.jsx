import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {FiSearch} from 'react-icons/fi';

const Searchbar = () => {

  const navigate=useNavigate();
  const [searchTerm,setSearchItem]=useState('');

  const handleSubmit =(e) =>{
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  }

  return (
  <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-black ">
    {/* <label htmlFor="search-field" className="sr-only">Search all songs</label> */}
    <div className="flex flex-row justify-start items-center">
      <FiSearch className="w-5 h-5 ml-4"/>
      <input name="search-field" autoComplete="off" id="search-field" placeholder="Search" value={searchTerm} onChange={(e)=>setSearchItem(e.target.value)} 
      className='flex-1 bg-transparent outline-none placeholder-black text-2xl text-black p-4'/>
    </div>
  </form>
)};

export default Searchbar;
