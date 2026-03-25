import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
  const { movies } = useData();
  const [filter, setFilter] = useState('ALL');

  const industries = ['ALL', ...new Set(movies.map(m => m.industry))];
  
  const releasedMovies = movies.filter(m => {
    if (!m.releaseDate) return true;
    return new Date(m.releaseDate) <= new Date();
  });

  const filteredMovies = filter === 'ALL' 
    ? releasedMovies 
    : releasedMovies.filter(m => m.industry === filter);

  return (
    <div className="bg-text-dark text-white py-24 min-h-screen">
        <div className="page-container">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">Box Office</h1>
            <p className="text-text-gray text-xl max-w-2xl mx-auto">Latest Punjabi movies taking over the cinema screens and hearts of fans worldwide.</p>
          </div>

          <FilterBar 
            options={industries} 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            label="Industry" 
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default MovieList;
