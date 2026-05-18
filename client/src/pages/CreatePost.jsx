import React, { useState } from 'react'
import GenerateImageForm from '../components/GenerateImageForm'
import GeneratedImageCard from '../components/GeneratedImageCard'

const CreatePost = () => {
    const [generatImageLoading, setGeneratImageLoading] = useState(false);
    const [createPostLoading, setCreatePostLoading] = useState(false);

    const [post, setPost] = useState({
        name:"",
        prompt:"",
        photo:"",
    })
  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-6">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        <GenerateImageForm post={post} 
        setPost={setPost} 
        createPostLoading={createPostLoading}
        setCreatePostLoading={setCreatePostLoading}
        generatImageLoading={generatImageLoading}
        setGeneratImageLoading={setGeneratImageLoading}/>

        <GeneratedImageCard src={post?.photo} loading={generatImageLoading} />

      </div>

    </div>
  )
}

export default CreatePost