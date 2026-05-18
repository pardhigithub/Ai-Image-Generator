import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/post" element={<CreatePost/>} exact/>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
