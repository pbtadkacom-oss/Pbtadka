import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import UserAuthModal from './UserAuthModal';
import { useData } from '../context/DataContext';

const Header = () => {
  const { user, logout } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserAuth, setShowUserAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsMenuOpen(false);
      }
    }
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'LATEST', path: '/today-news', badge: 'NEW' },
    { name: 'MOVIES', path: '/movies' },
    { name: 'UPCOMING', path: '/upcoming' },
    { name: 'CELEBS', path: '/celebs' },
    { name: 'NEWS', path: '/news' },
    { name: 'SPORTS', path: '/sports' },
    { name: 'VIDEOS', path: '/videos' }
  ];

  const isAdmin = user?.role === 'admin' || user?.role === 'sub-admin';

  return (
    <header className="bg-white">
      <div className="page-container">
        <div className="flex justify-between items-center py-4 gap-4">
          <Link to="/" className="no-underline group shrink-0">
            <Logo className="h-14 md:h-20 w-auto" />
          </Link>

          {/* Desktop Search and User Auth */}
          <div className="hidden md:flex items-center gap-4 md:order-2 w-auto justify-end">
            <div className="relative group/search">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 pr-10 border-2 border-slate-100 rounded-xl focus:border-primary-red outline-none transition-all w-[150px] sm:w-[200px] text-xs font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-red">
                <i className="fas fa-search"></i>
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{user.role}</span>
                  <span className="text-xs font-bold text-slate-900">{user.username}</span>
                </div>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="hidden lg:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-red transition-all shadow-lg shadow-slate-900/10">
                    <i className="fas fa-grid-2"></i> Manage
                  </Link>
                )}
                <button onClick={logout} className="bg-slate-100 text-slate-600 p-2.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowUserAuth(true)}
                className="bg-slate-900 text-white py-2.5 px-6 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-primary-red transition-all shadow-xl shadow-slate-900/10"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden text-2xl text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-slate-900 -mx-4 md:mx-0 rounded-t-xl overflow-hidden shadow-2xl transition-all duration-300`}>
          <ul className="flex flex-col md:flex-row list-none p-0 m-0 md:justify-center md:flex-wrap">
            {navItems.map((item) => (
              <li key={item.name} className="w-full md:w-auto">
                <Link 
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-white no-underline font-black px-3 md:px-4 lg:px-6 py-4 hover:bg-white/10 transition-colors text-[10px] md:text-[11px] lg:text-xs uppercase tracking-widest relative ${location.pathname === item.path ? 'bg-primary-red' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {item.name}
                    {item.badge && (
                      <span className="bg-white text-primary-red text-[8px] px-1.5 py-0.5 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Search and User Auth Container (Moved after videos/nav items) */}
          <div className="md:hidden p-6 border-t border-white/5 flex flex-col gap-5 bg-slate-900/50 backdrop-blur-xl">
            <div className="relative group/search w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-3.5 px-5 pr-12 border-2 border-white/10 bg-slate-800/50 text-white rounded-2xl focus:border-primary-red outline-none transition-all text-sm font-bold placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button onClick={handleSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary-red p-2">
                <i className="fas fa-search text-lg"></i>
              </button>
            </div>

            {user ? (
              <div className="flex items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{user.role}</span>
                  <span className="text-base font-bold text-white tracking-tight">{user.username}</span>
                </div>
                <div className="flex gap-2">
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="flex items-center justify-center w-11 h-11 bg-primary-red text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-primary-red/20" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-grid-2"></i>
                    </Link>
                  )}
                  <button onClick={logout} className="flex items-center justify-center w-11 h-11 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all border border-white/10">
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { setShowUserAuth(true); setIsMenuOpen(false); }}
                className="bg-primary-red text-white py-4 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-2xl shadow-primary-red/30 w-full transform active:scale-[0.98]"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>

      <UserAuthModal 
        isOpen={showUserAuth} 
        onClose={() => setShowUserAuth(false)} 
        onAuthSuccess={() => setShowUserAuth(false)} 
      />
    </header>
  );
};

export default Header;
