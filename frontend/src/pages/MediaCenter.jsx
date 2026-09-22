import React, { useState } from 'react';
import { BookOpen, TrendingUp, Newspaper, X } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function MediaCenter() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      category: 'Buyer\'s Guide',
      icon: <BookOpen size={20} className="text-blue" />,
      title: 'The First-Time Homebuyer\'s Checklist',
      desc: 'Everything you need to know before making the biggest investment of your life.',
      date: 'Sep 15, 2026',
      image: '/images/modern-property-light.jpg'
    },
    {
      category: 'Design Trends',
      icon: <TrendingUp size={20} className="text-emerald" />,
      title: 'Minimalist Interior Ideas for 2026',
      desc: 'How to maximize space and bring tranquility into your new urban home.',
      date: 'Sep 10, 2026',
      image: '/images/hero-bg-light.jpg'
    },
    {
      category: 'Company News',
      icon: <Newspaper size={20} className="text-gold" />,
      title: 'Techhansa Infra Wins Sustainable Developer of the Year',
      desc: 'Recognized for our zero-carbon initiatives across our commercial properties.',
      date: 'Sep 01, 2026',
      image: '/images/surreal_city_door.jpg'
    },
    {
      category: 'Buyer\'s Guide',
      icon: <BookOpen size={20} className="text-blue" />,
      title: 'Understanding RERA: A Client Perspective',
      desc: 'How RERA protects your investments and why it matters when buying a home.',
      date: 'Aug 25, 2026',
      image: '/images/modern-property.jpg'
    },
    {
      category: 'Design Trends',
      icon: <TrendingUp size={20} className="text-emerald" />,
      title: 'The Rise of Smart Homes in India',
      desc: 'Integrating AI and automation into everyday living spaces.',
      date: 'Aug 18, 2026',
      image: '/images/hero-bg.jpg'
    },
    {
      category: 'Company News',
      icon: <Newspaper size={20} className="text-gold" />,
      title: 'Launch of Techhansa Cyber Park',
      desc: 'Announcing our newest Grade-A commercial hub in the heart of the city.',
      date: 'Aug 10, 2026',
      image: '/images/footer-illustration.jpg'
    }
  ];

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeFilter);

  return (
    <div className="pt-32 pb-20 text-foreground min-h-screen relative">
      <Navbar />
      {/* Header */}
      <section 
        className="py-24 relative z-10 bg-fixed bg-center bg-cover mb-16"
        style={{ backgroundImage: 'url("/images/media-hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-white/20 z-0"></div>
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50 inline-block">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-2 text-foreground leading-normal">
              Insight & Media Center
            </h1>
            <p className="text-xl text-slate-800 font-medium leading-relaxed">
              We believe an educated buyer makes the best decisions. Explore our resources, catch up on our latest news, and discover design trends for your future home.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Buyer\'s Guide', 'Design Trends', 'Company News'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-blue text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'Buyer\'s Guide' ? 'Buyer\'s Guides' : filter}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedArticle(article)}
              className="glass-panel rounded-2xl overflow-hidden hover-scale border border-slate-100 shadow-sm flex flex-col cursor-pointer group"
            >
              <div className="h-48 bg-slate-200 overflow-hidden relative">
                <img src={article.image} alt="Article Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                  {article.icon}
                  <span>{article.category}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-muted font-medium mb-3">{article.date}</p>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-muted leading-relaxed line-clamp-3 mb-6">{article.desc}</p>
                
                <div className="mt-auto">
                  <span className="text-blue font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-[100]">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col relative animate-fade-in shadow-2xl overflow-hidden">
            
            {/* Modal Header (Fixed) */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white z-10">
              <div className="flex flex-wrap items-center gap-2 text-blue font-bold text-sm">
                {selectedArticle.icon}
                <span>{selectedArticle.category}</span>
                <span className="text-slate-400 font-normal mx-2">•</span>
                <span className="text-slate-400 font-normal">{selectedArticle.date}</span>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto scrollbar-hide" data-lenis-prevent="true">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{selectedArticle.title}</h2>
              <img src={selectedArticle.image} alt="Article" className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8 shadow-sm" />
              
              <div className="prose prose-slate max-w-none text-muted leading-relaxed">
                <p className="text-xl font-medium text-foreground mb-6 leading-relaxed">{selectedArticle.desc}</p>
                
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
                  </p>
                  <p>
                    Phasellus pellentesque, ante nec iaculis dapibus, eros justo auctor lectus, a dictum nisl nisl ut justo. Phasellus accumsan in felis ut fermentum. Fusce ac vulputate leo, vitae consectetur sem. 
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Key Takeaways</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Understanding the market dynamics before investing.</li>
                    <li>Leveraging sustainable technology for higher returns.</li>
                    <li>Navigating local regulations securely and smoothly.</li>
                  </ul>
                  <p className="mt-6">
                    Nulla id ex magna. Sed ut sem imperdiet, venenatis est eu, tincidunt dolor. Integer auctor pretium est, vitae vulputate ipsum suscipit eget.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
