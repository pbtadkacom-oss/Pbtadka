import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import FilterBar from '../components/FilterBar';

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className="group">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/5">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="bg-primary-red text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase">{movie.industry}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-10">
                    <span className="text-accent-gold text-xs font-black uppercase tracking-widest">{new Date(movie.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <h3 className="text-xl font-bold line-clamp-1">{movie.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded border border-white/20">UPCOMING</span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-text-gray font-bold uppercase tracking-widest">No upcoming movies found for this filter.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default UpcomingList;
