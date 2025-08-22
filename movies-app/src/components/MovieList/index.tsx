'use client';
import { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios';
export default function MovieList(){
    
        const [movies, setMovies] = useState([]);
        useEffect(()=>{
            getMovies()
        },[]);
        const getMovies = () => {
            axios({
                method: 'get',
                url:'https://api.themoviedb.org/3/discover/movie',
                params:{
                    api_kay:'c5fb768f32b61d107d8da18aef8e183b',
                    language: 'pt-BR'
                }
            }).then(response =>{
                setMovies(response.data.results);
            })
        }
return(
        <ul className="movie-list">
            <li></li>
        </ul>
    )
}