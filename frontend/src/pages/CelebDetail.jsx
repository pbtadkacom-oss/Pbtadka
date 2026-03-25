import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import CommentSection from '../components/CommentSection';

const CelebDetail = () => {
    const { id } = useParams();
    const { celebs, news, movies, addCelebComment, likeCelebComment, updateCelebComment, deleteCelebComment } = useData();
    const [activeSection, setActiveSection] = React.useState('All');
    
    const celeb = celebs.find(item => item._id === id || item.slug === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!celeb) return <div className="p-10 text-center font-bold">Celebrity not found</div>;

    // Data Filtering
    const celebMovies = movies.filter(m => m.cast?.some(a => a.name.toLowerCase() === celeb.name.toLowerCase()));
    const celebArticles = news.filter(n => 
        n.title.toLowerCase().includes(celeb.name.toLowerCase()) || 
        n.excerpt?.toLowerCase().includes(celeb.name.toLowerCase())
    );

    const tabs = [
        { id: 'All', label: 'All', count: null },
        { id: 'Articles', label: 'Articles', count: celebArticles.length },
        { id: 'Videos', label: 'Videos', count: celeb.videos?.filter(v => v).length || 0 },
        { id: 'Photos', label: 'Photos', count: (celeb.photos?.filter(p => p).length || 0) + (celebMovies.length > 0 ? 4 : 0) },
        { id: 'Filmography', label: 'Filmography', count: celebMovies.length },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Minimal Breadcrumb */}
            <div className="bg-gray-50 border-b py-3">
                <div className="page-container flex justify-between items-center">
                    <nav className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <Link to="/" className="hover:text-primary-red transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/celebs" className="hover:text-primary-red transition-colors">Celebrities</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900">{celeb.name}</span>
                    </nav>
                    <div className="flex gap-4">
                        <i className="fas fa-share-alt text-gray-400 hover:text-primary-red cursor-pointer transition-colors"></i>
                        <i className="fas fa-search text-gray-400 hover:text-primary-red cursor-pointer transition-colors"></i>
                    </div>
                </div>
            </div>

            {/* Profile Header Sections */}
            <div className="page-container py-8 md:py-12">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    {/* Left: Avatar */}
                    <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
                        <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img src={celeb.image} alt={celeb.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2">{celeb.name}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-slate-500 uppercase tracking-wide italic">
                                <span className="text-primary-red not-italic font-black border-r pr-4">{celeb.role}</span>
                                <span>Official Profile</span>
                                {celeb.industry && <span className="border-l pl-4">Industry: {celeb.industry}</span>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {celeb.birthDate && (
                                <p className="text-slate-700 font-medium">
                                    <span className="font-black uppercase text-[11px] tracking-widest text-slate-400 block mb-1">Born</span>
                                    {celeb.birthDate} {celeb.birthPlace && <>in {celeb.birthPlace}</>}
                                </p>
                            )}
                            <div className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-primary-red pl-6 py-1">
                                "{celeb.bio}"
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button className="bg-primary-red text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-primary-red/20">Follow</button>
                            <button className="bg-slate-100 text-slate-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">Add to List</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="bg-white border-y sticky top-[64px] md:top-[74px] z-30 shadow-sm overflow-x-auto no-scrollbar">
                <div className="page-container flex">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id)}
                            className={`px-6 py-4 text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-4 ${activeSection === tab.id ? 'border-primary-red text-primary-red bg-primary-red/5' : 'border-transparent text-gray-500 hover:text-slate-900'}`}
                        >
                            {tab.label} {tab.count !== null && <span className="ml-1 opacity-40">({tab.count})</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="page-container py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    <div className="lg:w-[70%] xl:w-[75%] space-y-12">
                        
                        {activeSection === 'All' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                                {/* Career / Bio Section */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-1.5 h-6 bg-primary-red"></div>
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Celebrity Biography</h2>
                                    </div>
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                        <div 
                                            className="rich-text-content text-slate-700 leading-relaxed text-lg font-medium space-y-4"
                                            dangerouslySetInnerHTML={{ __html: celeb.fullBio || `<p>${celeb.bio} ... Career details coming soon.</p>` }} 
                                        />
                                    </div>
                                </section>

                                {/* Featured Filmography Snippet */}
                                {celebMovies.length > 0 && (
                                    <section>
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Featured Movies</h2>
                                            <button onClick={() => setActiveSection('Filmography')} className="text-primary-red font-black uppercase text-[10px] tracking-widest group">See All Filmography <i className="fas fa-chevron-right ml-1 transition-transform group-hover:translate-x-1"></i></button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {celebMovies.slice(0, 4).map((movie) => (
                                                <Link key={movie._id} to={`/movie/${movie.slug || movie._id}`} className="group relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
                                                    <img src={movie.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                                        <h4 className="text-white font-black text-xs uppercase italic tracking-tighter leading-tight line-clamp-2">{movie.title}</h4>
                                                        <p className="text-primary-red text-[8px] font-bold uppercase mt-1">View Details</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Milestones */}
                                <section>
                                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                                        <i className="fas fa-trophy text-yellow-500"></i> Historic Milestones
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(celeb.milestones?.length ? celeb.milestones : [{year: '2026', text: 'Nominated for Global Punjabi Icon Award.'}]).map((item, i) => (
                                            <div key={i} className="flex gap-6 items-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:border-primary-red/10">
                                                <div className="bg-slate-900 text-white font-black px-4 py-1.5 rounded-lg text-sm italic tracking-tighter leading-none">{item.year}</div>
                                                <div className="text-sm font-black text-slate-700 pt-0.5 italic tracking-tight uppercase leading-snug line-clamp-2">{item.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeSection === 'Articles' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 border-l-4 border-primary-red pl-4">Latest Articles on {celeb.name}</h2>
                                {celebArticles.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6">
                                        {celebArticles.map(article => (
                                            <Link key={article._id} to={`/news/${article.slug || article._id}`} className="flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group no-underline">
                                                <div className="w-32 md:w-48 aspect-[16/10] flex-shrink-0 rounded-xl overflow-hidden">
                                                    <img src={article.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                </div>
                                                <div className="flex-1 py-1">
                                                    <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-primary-red transition-colors uppercase italic leading-tight mb-2">{article.title}</h3>
                                                    <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-medium">{article.excerpt}</p>
                                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <span>{article.date}</span>
                                                        <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
                                                        <span className="text-primary-red">{article.category}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-gray-50 rounded-3xl">
                                        <i className="fas fa-newspaper text-gray-200 text-6xl mb-4"></i>
                                        <p className="font-black uppercase text-gray-400 tracking-widest text-xs">No articles published yet</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeSection === 'Photos' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 border-l-4 border-primary-red pl-4">Official Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {(celeb.photos?.filter(p => p).length ? celeb.photos.filter(p => p) : []).map((p, idx) => (
                                        <div key={`photo-${idx}`} className="rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all group">
                                            <img src={p} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                        </div>
                                    ))}
                                    {celebMovies.map((m, idx) => (
                                        <div key={`movie-photo-${idx}`} className="rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all group relative">
                                            <img src={m.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                            <div className="absolute top-2 right-2 bg-black/60 text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">Movie Still</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'Videos' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 border-l-4 border-primary-red pl-4">Official Videos & Interviews</h2>
                                {celeb.videos?.filter(v => v).length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {celeb.videos.filter(v => v).map((url, idx) => (
                                            <div key={idx} className="aspect-video rounded-3xl overflow-hidden bg-black shadow-xl">
                                                <iframe 
                                                    className="w-full h-full"
                                                    src={url.includes('youtube.com') || url.includes('youtu.be') ? url.replace('watch?v=', 'embed/').split('&')[0] : url} 
                                                    title={`Video ${idx}`}
                                                    frameBorder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-gray-50 rounded-3xl">
                                        <i className="fas fa-video text-gray-200 text-6xl mb-4"></i>
                                        <p className="font-black uppercase text-gray-400 tracking-widest text-xs">No videos available</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeSection === 'Filmography' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 border-l-4 border-primary-red pl-4">Full Filmography</h2>
                                {celebMovies.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {celebMovies.map(movie => (
                                            <Link key={movie._id} to={`/movie/${movie.slug || movie._id}`} className="group no-underline shrink-0 block">
                                                <div className="aspect-[2/3] rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                                    <img src={movie.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                        <span className="text-primary-red text-[10px] font-black uppercase tracking-tighter mb-1 block italic">{new Date(movie.releaseDate).getFullYear()}</span>
                                                        <h4 className="text-white text-xs font-black uppercase tracking-tighter italic leading-none line-clamp-2">{movie.title}</h4>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-gray-50 rounded-3xl">
                                        <i className="fas fa-film text-gray-200 text-6xl mb-4"></i>
                                        <p className="font-black uppercase text-gray-400 tracking-widest text-xs">Filmography data not linked</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="pt-12 border-t border-gray-100">
                             <CommentSection 
                                itemId={celeb._id}
                                comments={celeb.comments}
                                onAdd={addCelebComment}
                                onLike={likeCelebComment}
                                onUpdate={updateCelebComment}
                                onDelete={deleteCelebComment}
                            />
                        </div>

                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-[30%] xl:w-[25%] space-y-8">
                        {/* Quick Stats */}
                        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                            <h3 className="font-black text-white text-[10px] uppercase tracking-widest mb-6 border-b border-white/10 pb-4 italic">Celebrity Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Industry</span>
                                    <span className="text-white font-black italic">{celeb.industry || 'Pollywood'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Fan Base</span>
                                    <span className="text-white font-black italic">{celeb.stats?.fanBase || 'Multi-Million'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Impact</span>
                                    <span className="text-primary-red font-black italic">{celeb.stats?.impactScore || 'Top Tier'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent News */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xs font-black text-primary-red uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                                <span className="w-2.5 h-2.5 bg-primary-red rounded-full animate-pulse"></span> Recent Buzz
                            </h3>
                            <div className="space-y-6">
                                {news.slice(0, 5).map(item => (
                                    <Link key={item._id} to={`/news/${item.slug || item._id}`} className="flex gap-4 group no-underline">
                                        <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                            <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2 group-hover:text-primary-red transition-colors uppercase italic italic-tracking-tight">{item.title}</h4>
                                            <span className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-tighter italic">News Alert</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default CelebDetail;
