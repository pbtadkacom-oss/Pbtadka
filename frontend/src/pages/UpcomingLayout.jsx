import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import CommentSection from '../components/CommentSection';

const UpcomingLayout = ({ movie, sidebarNews, movies, onAddComment, onLikeComment, onUpdateComment, onDeleteComment }) => {
    const [activeTab, setActiveTab] = useState('Timeline');
    const [vote, setVote] = useState(null); // 'watch' or 'not'
    const [watchScore, setWatchScore] = useState(64);

    const tabs = ['Timeline', 'Cast & Crew', 'Photos'];

    const handleVote = (type) => {
        if (vote === type) return;
        setVote(type);
        setWatchScore(prev => type === 'watch' ? prev + 1 : prev - 1);
    };

    // Filter "Movies This Month" (recent releases)
    const recentMovies = movies
        .filter(m => m.releaseDate && new Date(m.releaseDate) <= new Date())
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 6);

    return (
        <div className="bg-[#f8f9fa] min-h-screen">
            {/* Premium Hero Header */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                {/* Blurred Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-110 blur-xl brightness-50"
                    style={{ backgroundImage: `url(${movie.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-transparent to-black/20"></div>

                <div className="page-container relative h-full flex items-end pb-12">
                    <div className="flex flex-col md:flex-row items-end gap-8 w-full">
                        {/* Floating Poster */}
                        <div className="flex flex-col gap-0 group">
                            <div className="relative w-44 md:w-56 aspect-[2/3] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/20 transform -translate-y-4">
                                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/20 cursor-pointer hover:bg-primary-red transition-colors">
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                            {/* Voting Section */}
                            <div className="bg-white shadow-xl flex items-stretch border-t-4 border-primary-red overflow-hidden transform -translate-y-4">
                                <div className="bg-primary-red/5 px-4 flex flex-col items-center justify-center border-r border-gray-100">
                                    <span className="text-2xl font-black text-primary-red italic">{watchScore}</span>
                                </div>
                                <div className="flex-1 flex flex-col p-2 gap-1 justify-center">
                                    <button 
                                        onClick={() => handleVote('watch')}
                                        className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded transition-all ${vote === 'watch' ? 'bg-green-500 text-white' : 'hover:bg-green-50 text-green-600'}`}
                                    >
                                        <i className="fas fa-check-circle"></i> Will Watch
                                    </button>
                                    <button 
                                        onClick={() => handleVote('not')}
                                        className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded transition-all ${vote === 'not' ? 'bg-red-500 text-white' : 'hover:bg-red-50 text-red-500'}`}
                                    >
                                        <i className="fas fa-times-circle"></i> Not Interested
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 pb-12">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg tracking-tighter uppercase italic">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-white/80 font-bold uppercase tracking-widest text-xs">
                                <span>Release date: {new Date(movie.releaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-red"></span>
                                <span className="text-primary-red">{movie.industry}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-red"></span>
                                <span>{movie.genre}</span>
                            </div>
                        </div>

                        {/* Countdown Sidebar */}
                        <div className="hidden lg:block absolute top-12 right-0">
                            <CountdownTimer targetDate={movie.releaseDate} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b sticky top-[150px] z-20 shadow-sm overflow-x-auto no-scrollbar">
                <div className="page-container flex">
                    {tabs.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-4 ${activeTab === tab ? 'border-primary-red text-primary-red bg-primary-red/5' : 'border-transparent text-gray-500 hover:text-slate-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <main className="page-container py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Main Content Area */}
                    <div className="lg:w-[70%] xl:w-[75%] space-y-16">
                        
                        {/* Dynamic Section Rendering based on Tabs */}
                        {activeTab === 'Timeline' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-12">
                                    <section>
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-6 flex items-center gap-3">
                                            {movie.title} Movie
                                        </h2>
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                            <h3 className="text-sm font-black text-primary-red uppercase tracking-widest mb-4">Synopsis</h3>
                                            <p className="text-base text-slate-600 leading-relaxed font-medium">
                                                {movie.overview || `${movie.title} is scheduled to be released on ${new Date(movie.releaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}. Set in the vibrant landscapes of the industry, this gripping tale unfolds...`}
                                            </p>
                                            <button className="text-primary-red font-black uppercase tracking-widest text-[10px] mt-4 hover:underline">... Read More</button>
                                        </div>
                                    </section>

                                    {/* Photos Preview */}
                                    <section id="photos">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black uppercase italic text-slate-900">Photos <span className="text-gray-300 ml-1">({movie.photos?.length || 0})</span></h3>
                                            <button onClick={() => setActiveTab('Photos')} className="text-primary-red font-black uppercase text-[10px] tracking-widest group">View All <i className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i></button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {(movie.photos?.length > 0 ? movie.photos : [movie.image, movie.image]).slice(0, 4).map((p, i) => (
                                                <div key={i} className={`rounded-xl overflow-hidden aspect-[16/10] shadow-md border-2 border-white ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                                    <img src={p} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Videos Preview */}
                                    <section>
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black uppercase italic text-slate-900">Videos <span className="text-gray-300 ml-1">(5)</span></h3>
                                            <Link to="#" className="text-primary-red font-black uppercase text-[10px] tracking-widest group">View All <i className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i></Link>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative group rounded-2xl overflow-hidden aspect-video shadow-xl border-4 border-white">
                                                <img src={movie.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 blur-[2px] brightness-75" alt="" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 rounded-full bg-primary-red text-white flex items-center justify-center text-xl shadow-2xl group-hover:scale-125 transition-transform">
                                                        <i className="fas fa-play ml-1"></i>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h4 className="text-white font-black uppercase tracking-tight italic drop-shadow-lg">Official Trailer - {movie.title}</h4>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                {[1,2,3].map(i => (
                                                    <div key={i} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-red/30 transition-colors group cursor-pointer">
                                                        <div className="relative w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                                                            <img src={movie.image} className="w-full h-full object-cover" alt="" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                                <i className="fas fa-play text-white text-[10px]"></i>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-center">
                                                            <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-tight line-clamp-2">Behind the scenes: Making of the {i === 1 ? 'Action' : (i === 2 ? 'Music' : 'Poster')}</h5>
                                                            <span className="text-[8px] font-bold text-gray-400 mt-1 uppercase">2:45 Mins</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Sidebar News Integrated as "Articles" */}
                                    <section>
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-xl font-black uppercase italic text-slate-900">Recent Articles <span className="text-gray-300 ml-1">({sidebarNews.length})</span></h3>
                                            <Link to="/news" className="text-primary-red font-black uppercase text-[10px] tracking-widest group">Browse All <i className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i></Link>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {sidebarNews.slice(0, 4).map(item => (
                                                <Link key={item._id} to={`/news/${item._id}`} className="group flex flex-col gap-4 no-underline">
                                                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                                                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight italic leading-tight group-hover:text-primary-red transition-colors line-clamp-3">{item.title}</h4>
                                                        <span className="text-[8px] font-bold text-gray-400 mt-2 block uppercase">Publication date: {new Date(item.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Cast & Crew' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8">Main Cast & Production Crew</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-8 px-2">
                                    {movie.cast?.map((actor, idx) => (
                                        <Link key={idx} to={`/actor/${encodeURIComponent(actor.name)}`} className="group flex flex-col items-center gap-3 no-underline">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-110 duration-500 relative">
                                                <img src={actor.image || 'https://res.cloudinary.com/dzvk7womv/image/upload/v1711287600/default_actor.jpg'} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-primary-red/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <i className="fas fa-link text-white text-xl"></i>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight group-hover:text-primary-red transition-colors">{actor.name}</h4>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{actor.role || 'Actor'}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Timeline' && (
                            <div className="pt-16 border-t border-gray-100">
                                <CommentSection 
                                    itemId={movie._id}
                                    comments={movie.comments}
                                    onAdd={onAddComment}
                                    onLike={onLikeComment}
                                    onUpdate={onUpdateComment}
                                    onDelete={onDeleteComment}
                                />
                            </div>
                        )}

                        {activeTab === 'Photos' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8">Official Movie Photos</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {(movie.photos?.length > 0 ? movie.photos : [movie.image]).map((p, idx) => (
                                        <div key={idx} className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] group">
                                            <img src={p} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:w-[30%] xl:w-[25%]">
                        <div className="space-y-12 sticky top-[250px]">
                            {/* Movies This Month Section */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 pb-4 border-b">Movies This Month</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {recentMovies.map(m => (
                                        <Link key={m._id} to={`/movie/${m._id}`} className="group flex flex-col gap-2 no-underline">
                                            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md border-2 border-white group-hover:border-primary-red transition-all duration-300 relative">
                                                <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                <div className="absolute bottom-0 inset-x-0 p-1 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[8px] font-black text-white uppercase block text-center truncate">{m.title}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/movies" className="block w-full text-center mt-8 py-3 rounded-xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">View All Released</Link>
                            </div>

                            {/* Promotional Banner */}
                            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl group cursor-pointer">
                                <img src={movie.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-red/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] mb-2 block animate-pulse">Exclusive Insight</span>
                                    <h4 className="text-2xl font-black text-white uppercase leading-tight italic mb-4">Inside the World of {movie.title}</h4>
                                    <button className="bg-white text-primary-red p-3 rounded-full shadow-xl hover:scale-110 transition-transform">
                                        <i className="fas fa-play ml-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    );
};

export default UpcomingLayout;
