// import logo from './logo.svg';
import { useRef, useState, useEffect, useContext } from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import { RequireAuth } from 'react-auth-kit';
import { Routes, Route, Link } from 'react-router-dom';
import axios from './api/axios';

function App() {

    const [articles, getArticles] = useState('');
    const [qry, setQry] = useState('');
    const [search, setSearch] = useState('');
    const NEWS_URL = '/api/search_articles';
  
    useEffect(() => {
      handleSearch();
    }, []);




    const handleSearchEvent = async (query) => {
      console.log("search event called");
      handleSearch(query);
    }


    const handleSearch = async (query) => {
      console.log("searching articles for " + query);
      try{

        const response = await axios.post(NEWS_URL,
        JSON.stringify({ q: query }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        ).then(response => {
        const allArticles = response.data.data.articles;
        console.log(allArticles);
        getArticles(allArticles);
        setQry(query);

        })
    }catch(err){
        console.log(err);
    }
  }

  handleSearch("false");

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>


        <Route path={'/'} element={
        <RequireAuth loginPath={'/login'}>
          <Header handleSearchEvent = {handleSearchEvent}></Header>
          <Home query = {qry} articles = {articles}></Home>
          <Footer></Footer>
        </RequireAuth>
      }/>

    </Routes>
    </>
  );
}

export default App;
