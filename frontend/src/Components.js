import React, { useState, useEffect } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown, Search, Bell, User, ChevronLeft, ChevronRight, X, Volume2, VolumeX } from 'lucide-react';

// Mock data for movies and shows
const mockMovies = [
  {
    id: 1,
    title: "The Crown",
    description: "This intimate drama traces the reign of Queen Elizabeth II, from her early youth and marriage to her current status as the longest-reigning monarch in British history.",
    genre: "Drama",
    year: 2024,
    rating: "TV-MA",
    duration: "55m",
    image: "https://images.unsplash.com/photo-1680506370687-29079983a01f",
    logo: "https://images.unsplash.com/photo-1680506370687-29079983a01f",
    trailer: "https://www.youtube.com/embed/JWtnJjn6ng0",
    featured: true,
    categories: ["drama", "trending"]
  },
  {
    id: 2,
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    genre: "Sci-Fi",
    year: 2024,
    rating: "TV-14",
    duration: "51m",
    image: "https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea",
    trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
    categories: ["sci-fi", "trending", "popular"]
  },
  {
    id: 3,
    title: "The Witcher",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    genre: "Fantasy",
    year: 2024,
    rating: "TV-MA",
    duration: "60m",
    image: "https://images.pexels.com/photos/7991290/pexels-photo-7991290.jpeg",
    trailer: "https://www.youtube.com/embed/ndl1W4ltcmg",
    categories: ["action", "fantasy", "popular"]
  },
  {
    id: 4,
    title: "Scream",
    description: "Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask.",
    genre: "Horror",
    year: 2024,
    rating: "R",
    duration: "114m",
    image: "https://images.unsplash.com/photo-1634190969752-e269a0a9e1c2",
    trailer: "https://www.youtube.com/embed/h74AXqw4Opc",
    categories: ["horror", "thriller"]
  },
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    genre: "Action",
    year: 2024,
    rating: "PG-13",
    duration: "148m",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820",
    trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
    categories: ["action", "superhero", "trending"]
  },
  {
    id: 6,
    title: "Attack on Titan",
    description: "Humanity fights for survival against giant humanoid Titans. A teenage boy vows to cleanse the earth of the giant humanoid Titans.",
    genre: "Anime",
    year: 2024,
    rating: "TV-MA",
    duration: "24m",
    image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c",
    trailer: "https://www.youtube.com/embed/LHtdKWJdif4",
    categories: ["anime", "action"]
  },
  {
    id: 7,
    title: "Finding Nemo",
    description: "A clown fish named Marlin lives in the Great Barrier Reef and loses his son, Nemo, after he ventures into the open sea.",
    genre: "Animation",
    year: 2024,
    rating: "G",
    duration: "100m",
    image: "https://images.unsplash.com/photo-1623295783032-6af0e569659e",
    trailer: "https://www.youtube.com/embed/wZdpNglLbt8",
    categories: ["kids", "animation"]
  },
  {
    id: 8,
    title: "Ozark",
    description: "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    genre: "Crime",
    year: 2024,
    rating: "TV-MA",
    duration: "60m",
    image: "https://images.pexels.com/photos/7299488/pexels-photo-7299488.jpeg",
    trailer: "https://www.youtube.com/embed/5hAXVqrljbs",
    categories: ["drama", "crime", "trending"]
  },
  {
    id: 9,
    title: "One Piece",
    description: "Monkey D. Luffy explores the Grand Line with his diverse crew of pirates, searching for the ultimate treasure known as 'One Piece'.",
    genre: "Anime",
    year: 2024,
    rating: "TV-14",
    duration: "24m",
    image: "https://images.pexels.com/photos/31129921/pexels-photo-31129921.png",
    trailer: "https://www.youtube.com/embed/MCb13lbVGE0",
    categories: ["anime", "adventure"]
  },
  {
    id: 10,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
    genre: "Action",
    year: 2024,
    rating: "PG-13",
    duration: "152m",
    image: "https://images.pexels.com/photos/8104851/pexels-photo-8104851.jpeg",
    trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
    categories: ["action", "superhero", "popular"]
  },
  {
    id: 11,
    title: "Horror Collection",
    description: "A spine-chilling collection of horror stories that will keep you on the edge of your seat.",
    genre: "Horror",
    year: 2024,
    rating: "R",
    duration: "120m",
    image: "https://images.pexels.com/photos/14303562/pexels-photo-14303562.jpeg",
    trailer: "https://www.youtube.com/embed/hFTmmxC_rV8",
    categories: ["horror", "thriller"]
  },
  {
    id: 12,
    title: "Cosmic Journey",
    description: "Embark on an epic journey through space and time in this mind-bending sci-fi adventure.",
    genre: "Sci-Fi",
    year: 2024,
    rating: "PG-13",
    duration: "135m",
    image: "https://images.pexels.com/photos/3526022/pexels-photo-3526022.jpeg",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    categories: ["sci-fi", "adventure"]
  }
];

const categories = [
  { id: 'trending', title: 'Trending Now', movies: mockMovies.filter(m => m.categories.includes('trending')) },
  { id: 'popular', title: 'Popular on Netflix', movies: mockMovies.filter(m => m.categories.includes('popular')) },
  { id: 'action', title: 'Action Movies', movies: mockMovies.filter(m => m.categories.includes('action')) },
  { id: 'drama', title: 'Drama Series', movies: mockMovies.filter(m => m.categories.includes('drama')) },
  { id: 'horror', title: 'Horror Movies', movies: mockMovies.filter(m => m.categories.includes('horror')) },
  { id: 'sci-fi', title: 'Sci-Fi & Fantasy', movies: mockMovies.filter(m => m.categories.includes('sci-fi')) },
  { id: 'anime', title: 'Anime', movies: mockMovies.filter(m => m.categories.includes('anime')) },
  { id: 'kids', title: 'Kids & Family', movies: mockMovies.filter(m => m.categories.includes('kids')) }
];

// Header Component
export const Header = ({ onSearch, searchQuery, setSearchQuery, showSearch, setShowSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-red-600 text-2xl font-bold">NETFLIX</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">Movies</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">New & Popular</a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">My List</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {showSearch ? (
            <div className="flex items-center bg-black bg-opacity-50 border border-white rounded">
              <Search className="text-white ml-3" size={20} />
              <input
                type="text"
                placeholder="Search movies, shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 px-3 py-2 focus:outline-none w-64"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className="text-white mr-3 hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Search size={24} />
            </button>
          )}
          
          <Bell className="text-white hover:text-gray-300 transition-colors cursor-pointer" size={24} />
          
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <User size={24} />
            </button>
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded shadow-lg py-2">
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Manage Profiles</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Account</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Help Center</a>
                <hr className="my-2 border-gray-600" />
                <a href="#" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Sign out</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = ({ featuredMovie, onPlayTrailer }) => {
  if (!featuredMovie) return null;

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={featuredMovie.image}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      
      <div className="relative flex items-center h-full px-4 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {featuredMovie.title}
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 leading-relaxed">
            {featuredMovie.description}
          </p>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-white">{featuredMovie.rating}</span>
            <span className="text-white">{featuredMovie.year}</span>
            <span className="text-white">{featuredMovie.duration}</span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => onPlayTrailer(featuredMovie)}
              className="flex items-center bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play className="mr-2" size={20} />
              Play
            </button>
            <button className="flex items-center bg-gray-600 bg-opacity-50 text-white px-8 py-3 rounded font-semibold hover:bg-opacity-70 transition-colors">
              <Plus className="mr-2" size={20} />
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Movie Card Component
export const MovieCard = ({ movie, onPlayTrailer, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-64 h-36 cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onShowDetails(movie)}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover rounded"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
          <div className="text-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayTrailer(movie);
              }}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors mb-2"
            >
              <Play size={20} />
            </button>
            <h3 className="text-white text-sm font-semibold">{movie.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

// Movie Row Component
export const MovieRow = ({ title, movies, onPlayTrailer, onShowDetails }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, (movies.length * 272) - window.innerWidth + 64);

  const scroll = (direction) => {
    const scrollAmount = 800;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    setScrollPosition(newPosition);
  };

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-16">
        {title}
      </h2>
      
      <div className="relative group">
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors ml-4"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div className="overflow-hidden">
          <div
            className="flex space-x-2 transition-transform duration-300 px-4 md:px-16"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlayTrailer={onPlayTrailer}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        </div>
        
        {scrollPosition < maxScroll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors mr-4"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

// Movie Details Modal Component
export const MovieDetailsModal = ({ movie, onClose, onPlayTrailer }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-t-lg" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-white text-3xl font-bold mb-4">{movie.title}</h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-white">{movie.rating}</span>
            <span className="text-white">{movie.year}</span>
            <span className="text-white">{movie.duration}</span>
            <span className="text-white bg-red-600 px-2 py-1 rounded text-sm">{movie.genre}</span>
          </div>
          
          <p className="text-white mb-6 leading-relaxed">{movie.description}</p>
          
          <div className="flex space-x-4">
            <button
              onClick={() => onPlayTrailer(movie)}
              className="flex items-center bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              <Play className="mr-2" size={20} />
              Play
            </button>
            <button className="flex items-center bg-gray-600 bg-opacity-50 text-white px-6 py-3 rounded font-semibold hover:bg-opacity-70 transition-colors">
              <Plus className="mr-2" size={20} />
              My List
            </button>
            <button className="flex items-center bg-gray-600 bg-opacity-50 text-white px-6 py-3 rounded font-semibold hover:bg-opacity-70 transition-colors">
              <ThumbsUp className="mr-2" size={20} />
              Rate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Player Modal Component
export const VideoPlayerModal = ({ movie, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);

  if (!movie || !movie.trailer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">{movie.title}</h2>
          <button
            onClick={onClose}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`${movie.trailer}?autoplay=1&mute=${isMuted ? 1 : 0}`}
            title={movie.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ searchResults, onPlayTrailer, onShowDetails }) => {
  if (!searchResults || searchResults.length === 0) return null;

  return (
    <div className="pt-24 px-4 md:px-16 min-h-screen">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Search Results ({searchResults.length})
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlayTrailer={onPlayTrailer}
            onShowDetails={onShowDetails}
          />
        ))}
      </div>
    </div>
  );
};

// Main Netflix App Component
export const NetflixApp = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const featuredMovie = mockMovies.find(m => m.featured);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handlePlayTrailer = (movie) => {
    setPlayingMovie(movie);
  };

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleClosePlayer = () => {
    setPlayingMovie(null);
  };

  return (
    <div className="bg-black min-h-screen">
      <Header
        onSearch={() => {}}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      
      {searchQuery && searchResults.length > 0 ? (
        <SearchResults
          searchResults={searchResults}
          onPlayTrailer={handlePlayTrailer}
          onShowDetails={handleShowDetails}
        />
      ) : (
        <>
          <HeroSection
            featuredMovie={featuredMovie}
            onPlayTrailer={handlePlayTrailer}
          />
          
          <div className="py-8">
            {categories.map((category) => (
              <MovieRow
                key={category.id}
                title={category.title}
                movies={category.movies}
                onPlayTrailer={handlePlayTrailer}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>
        </>
      )}
      
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseModal}
          onPlayTrailer={handlePlayTrailer}
        />
      )}
      
      {playingMovie && (
        <VideoPlayerModal
          movie={playingMovie}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default NetflixApp;