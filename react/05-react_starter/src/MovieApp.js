import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import './MovieApp.css';

function MovieApp(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`;
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    setMovies(moviesArr);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className='container'>
      {isLoading ? (
        <div className='loader'>
          <span>Loading...</span>
        </div>
      ) : (
        <div className='movies'>
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      )}
    </div>
  );
}

export default MovieApp;
