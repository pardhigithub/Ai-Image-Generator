import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <div className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <h1 
          className="text-lg md:text-xl font-semibold cursor-pointer hover:text-gray-300 transition duration-200"
          onClick={() => navigate("/")}
        >
          AI Image Generator
        </h1>

        {/* Button */}
        {
          path[1] === 'post' ? (
            <button 
              onClick={() => navigate("/")}
              className="bg-blue-500 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base 
                         hover:bg-blue-600 transition duration-200"
            >
              Explore Post
            </button>
          ) : (
            <button 
              onClick={() => navigate("/post")}
              className="bg-green-500 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base 
                         hover:bg-green-600 transition duration-200"
            >
              New Post
            </button>
          )
        }

      </div>
    </div>
  )
}

export default Navbar