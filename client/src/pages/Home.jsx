import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ImageCard from '../components/ImageCard'
import { GetPosts } from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterPosts,setFilterPosts] = useState([]);
  
  const getPosts = async () => {
    setLoading(true);
    await GetPosts().then((res) => {
      setLoading(false);
      setPosts(res?.data?.data);
      setFilterPosts(res?.data?.data);
    })
    .catch((error)=>{
      setError(error?.response?.data?.message);
      setLoading(false);
    });
  };

  useEffect(()=> {
     getPosts();
  },[]);

  useEffect(()=>{
    if(!search){
      setFilterPosts(posts);
    }

    const SearchfilteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
      const authorMatch = post?.name?.toLowerCase().includes(search.toString().toLowerCase());
      return promptMatch || authorMatch;
    });
    if(search) {
      setFilterPosts(SearchfilteredPosts);
    }
  },[posts, search]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          AI Generated Images
        </h1>

        <SearchBar search={search} setSearch={setSearch}/>
        
        {error && <div style={{color: "red"}}>{error}</div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filterPosts.length === 0 ? <>No Posts Found</>:
          <>
          {filterPosts.slice().reverse()
          .map((item, index)=>(
              <ImageCard key={index} item={item}/>
          ))}
          </>}
          
        </div>

      </div>
    </div>
  )
}

export default Home