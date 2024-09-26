import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import SummaryApi from './common/index.js';
import { useEffect } from 'react';
import Context from './context/index.js';

function App() {
  const fetchUserDetails =async()=>{
    const dataResponse =await fetch(SummaryApi.current_user_url,{
      method :SummaryApi.current_user.method,
      credentials:'include'
    })
    const dataApi = await dataResponse.json()
    console.log("data-user",dataResponse)
  }
  useEffect(()=>{
    fetchUserDetails()

  },[])
  return (
    <>
    <Context.Provider value={{
       fetchUserDetails//user details fetch
    }}/>
            <ToastContainer />

    <Header/>
    <main className='min-h-[calc(100vh-120px)]'>
    <Outlet/>
    </main>
    <Footer/>
    </>
  );
}

export default App;
