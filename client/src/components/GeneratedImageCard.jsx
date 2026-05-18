import React from 'react'

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">

      <div className="bg-gray-900 rounded-xl shadow-lg p-4 flex items-center justify-center min-h-[250px]">

        {loading ? (
          <p className="text-gray-400 animate-pulse">
            Generating your image...
          </p>
        ) : src ? (
          <img
          key={src}
  src={src}
  alt="generated"
  className="w-full h-[400px] rounded-lg"
/>
        ) : (
          <p className="text-gray-500 text-sm">
            Write a prompt to generate an image...
          </p>
        )}

      </div>

    </div>
  )
}

export default GeneratedImageCard