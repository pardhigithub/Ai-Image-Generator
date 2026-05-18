import React from 'react'

const SearchBar = ({search, setSearch}) => {
  return (
    <div className="w-full flex justify-center px-4 mt-4">
      <input
        type="text"
        placeholder="Search with prompt or name..."
        className="w-full max-w-xl px-4 py-2 rounded-md border border-gray-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent
                   transition duration-200
                   text-sm md:text-base
                   placeholder-gray-400 text-black"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar