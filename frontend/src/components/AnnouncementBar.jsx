import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const AnnouncementBar = () => {
  const { announcements } = useData();
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (announcements.length === 0) return;
    if (currentIndex >= announcements.length) setCurrentIndex(0);
    
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements, isHovered, currentIndex]);

  if (announcements.length === 0) return null;

  return (
    <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-slate-900 border-b border-white/5 overflow-hidden group cursor-pointer"
    >
        <div className="w-full max-w-[1800px] mx-auto flex items-center h-10 lg:h-12">
            {/* Breaking Tag */}
            <div className="bg-primary-red text-white px-3 lg:px-5 h-full flex items-center gap-2 shrink-0 z-20 shadow-[10px_0_20px_rgba(0,0,0,0.5)]">
                <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse"></span>
                <span className="font-black text-[9px] lg:text-[11px] uppercase tracking-[0.2em] italic">Breaking</span>
            </div>

            {/* News Content */}
            <div className="flex-1 px-4 lg:px-8 overflow-hidden relative flex items-center h-full">
                <div className="md:hidden w-full overflow-hidden">
                    {announcements[currentIndex].link ? (
                        <Link 
                            to={announcements[currentIndex].link}
                            className="animate-marquee inline-block text-white font-bold text-[11px] italic hover:text-primary-red transition-colors no-underline whitespace-nowrap pr-[100%]"
                        >
                            {announcements[currentIndex].text}
                        </Link>
                    ) : (
                        <div className="animate-marquee inline-block text-white font-bold text-[11px] italic whitespace-nowrap pr-[100%]">
                            {announcements[currentIndex].text}
                        </div>
                    )}
                </div>

                <div className="hidden md:block w-full">
                    {announcements[currentIndex].link ? (
                        <Link 
                            to={announcements[currentIndex].link}
                            key={currentIndex} 
                            className="animate-slide-up text-white/90 text-[13px] font-bold whitespace-nowrap italic block hover:text-primary-red transition-colors no-underline"
                        >
                            {announcements[currentIndex].text}
                        </Link>
                    ) : (
                        <div key={currentIndex} className="animate-slide-up text-white/90 text-[13px] font-bold whitespace-nowrap italic">
                            {announcements[currentIndex].text}
                        </div>
                    )}
                </div>
            </div>

            {/* Date Tag */}
            <div className="flex items-center gap-3 text-white/40 text-[8px] lg:text-[10px] font-black uppercase tracking-widest border-l border-white/10 px-4 lg:px-8 h-full bg-slate-900/50 z-20">
                <i className="far fa-calendar text-primary-red/50 hidden sm:block"></i>
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </div>
    </div>
  );
};

export default AnnouncementBar;
