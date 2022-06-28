import { useState, useEffect } from "react";
import {BiSearch} from 'react-icons/bi'
import MovieCard from './MovieCard'
import './App.css'



const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=1b035f63'
const App = () => {
    const [movies,setMovies] = useState([])
    const [movieQuery,setMovieQuery] = useState('')
    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`)
        const movies_data = await res.json()
        setMovies(movies_data.Search)
        // console.log(movies_data.Search)
    }
    useEffect(()=>{
        // document.addEventListener('keydown',(e) => {
        //     if(e.keyCode === 13) {
        //         searchMovies(movieQuery)
        //     }
        // })
        searchMovies('superman')
    },[])
    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input placeholder="Search for movies" value={movieQuery} onChange={(e) => {setMovieQuery(e.target.value)}}/>
                <BiSearch onClick={() => {searchMovies(movieQuery)}} />
            </div>
            {
                movies?.length > 0 
                ? (
            <div className="container">
               {movies.map(movie =>  <MovieCard key={movie.imdbID} movie={movie}/>)}
            </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App ;