import React from 'react';
import FileSaver from 'file-saver';

const ImageCard = ({ item }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg 
                    hover:scale-[1.03] hover:shadow-xl 
                    transition duration-300 group">

      <div className="relative">
        <img
          src={item?.photo}
          alt="generated"
          className="w-full h-52 object-cover"
        />

        <div className="absolute inset-0 bg-black/60 opacity-0 
                        group-hover:opacity-100 
                        transition duration-300 flex items-end p-3">
          <p className="text-sm text-gray-200 line-clamp-3">
            {item?.prompt || "No prompt"}
          </p>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
            {item?.name ? item.name[0].toUpperCase() : "A"}
          </div>
          <span className="text-sm text-gray-300">
            {item?.name || "Anonymous"}
          </span>
        </div>

        <button
          onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}
          className="text-xs bg-green-500 px-3 py-1 rounded 
                     hover:bg-green-600 transition"
        >
          Download
        </button>

      </div>
    </div>
  );
};

export default ImageCard;