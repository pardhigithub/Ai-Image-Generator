import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CreatePost, GenerateAiImage } from '../api';

const GenerateImageForm = ({
    post,
        setPost, 
        createPostLoading,
        setCreatePostLoading,
        generatImageLoading,
        setGeneratImageLoading,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
//     const generateImageFun = async () =>{
//         setGeneratImageLoading(true);
//         await GenerateAiImage({prompt: post.prompt})
//         .then((res)=>{
//           console.log(res.data);
// console.log(res.data.photo);
//           setPost((prev) => ({
//   ...prev,
//   photo: `data:image/jpeg;base64,${res?.data?.photo}`
// }));
//           setGeneratImageLoading(false);
//         })
//         .catch((error) =>{
//           setError(error?.response?.data?.message);
//           setGeneratImageLoading(false);
//         })
//     };
    
const generateImageFun = async () => {

  if(!post.prompt){
    setError("Please enter prompt");
    return;
  }

  try {

    setGeneratImageLoading(true);
    setError("");

    const res = await GenerateAiImage({
      prompt: post.prompt
    });

    setPost((prev) => ({
      ...prev,
      photo: `data:image/jpeg;base64,${res?.data?.photo}`
    }));

  } catch (error) {

    console.log(error);

    setError(
      error?.response?.data?.message || "Image generation failed"
    );

  } finally {

    setGeneratImageLoading(false);

  }
};
const craetePostFun = async () => {

  if (!post.name || !post.prompt || !post.photo) {
    setError("Please fill all fields and generate image");
    return;
  }

  try {

    setCreatePostLoading(true);
    setError("");

    await CreatePost({
      name: post.name,
      prompt: post.prompt,
      photo: post.photo,
    });

    navigate("/");

  } catch (error) {

    console.log(error);

    setError(
      error?.response?.data?.message || "Failed to create post"
    );

  } finally {

    setCreatePostLoading(false);

  }
};
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center ">
      
      <form className="w-full max-w-2xl bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg space-y-5">

        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            Generate Image With Prompt
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Write your prompt according to the image you want...
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Author</label>
          <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            value={post.name}
            onChange={(e)=>setPost({...post,  name:e.target.value})}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       text-sm md:text-base transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Image Prompt</label>
          <textarea
            placeholder="Enter your prompt..."
            rows="6"
            name="prompt"
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt:e.target.value})}
            className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       text-sm md:text-base resize-none transition"
                       
                       
          />
          {error && <div style={{color: "red"}}>{error}</div>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          
          <button
            type="button"
            onClick={()=>generateImageFun()}
            className="flex-1 bg-blue-500 py-2 rounded-md 
                       hover:bg-blue-600 transition text-sm md:text-base"
                       disabled={generatImageLoading}
                       
          >
            {generatImageLoading?"Generating...":"Generate Image"}
            
          </button>

          <button
            type="button"
            onClick={()=>craetePostFun()}
            className="flex-1 bg-green-500 py-2 rounded-md 
                       hover:bg-green-600 transition text-sm md:text-base"
                       disabled={createPostLoading}
                       
          >
            {createPostLoading?"Posting...":"Post Image"}
          </button>

          {/* <button
            type="button"
            className="flex-1 bg-gray-700 py-2 rounded-md 
                       hover:bg-gray-600 transition text-sm md:text-base"
                       
          >
            Save Image
          </button> */}

        </div>

      </form>
    </div>
  )
}

export default GenerateImageForm