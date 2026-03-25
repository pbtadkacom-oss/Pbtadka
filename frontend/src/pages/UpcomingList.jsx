import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';

const UpcomingList = () => {
  const { movies } = useData();
  const [filter, setFilter] = useState('ALL');

  const industries = ['ALL', ...new Set(movies.map(m => m.industry))];
  
  const upcomingMovies = movies.filter(m => {
    if (!m.releaseDate) return false;
    return new Date(m.releaseDate) > new Date();
  }).sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

  const filteredMovies = filter === 'ALL' 
    ? upcomingMovies 
    : upcomingMovies.filter(m => m.industry === filter);

  return (
    <div className="bg-text-dark text-white py-24 min-h-screen">
        <div className="page-container">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-primary-red italic">Upcoming</h1>
            <p className="text-text-gray text-xl max-w-2xl mx-auto">Get ready for the most awaited cinematic experiences hitting the screens soon.</p>
          </div>

          <FilterBar 
            options={industries} 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            label="Industry" 
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} isUpcoming={true} />
            )) : (
              <div className="col-span-full py-20 text-center">
                <i className="fas fa-calendar-times text-gray-200 text-6xl mb-4"></i>
                <p className="text-gray-400 font-bold uppercase tracking-widest italic">No upcoming movies found</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default UpcomingList;
