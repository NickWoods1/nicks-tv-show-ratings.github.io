import { Filter, Search, Star, StarHalf, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const TvShowTracker = () => {
  // Initial show data from your list
  const initialShows = [
    "Lost Girl", "Weeds", "True Blood", "Vampire Diaries", "90210", "Glee", "Dexter", 
    "Desperate Housewives", "How I Met Your Mother", "Nikita", "Fawlty Towers", 
    "Only Fools and Horses", "Supernatural", "Chuck", "The Big Bang Theory", "Fringe", 
    "Psych", "Castle", "Pretty Little Liars", "Game of Thrones", "House", "Dragon Ball Z", 
    "Privileged", "Greek", "The Event", "Smallville", "V", "Scrubs", "Lost", "Heroes", 
    "24", "Burn Notice", "The 4400", "Peep Show", "The IT Crowd", "The Mighty Boosh", 
    "Pushing Daisies", "Hannah Montana", "Suite Life of Zack & Cody", "Hellcats", 
    "Community", "The Office", "Gossip Girl", "Eureka", "Person of Interest", "Alcatraz", 
    "One Tree Hill", "Sword Art Online", "Breaking Bad", "Girls", "Suits", 
    "Arrested Development", "Reaper", "New Girl", "Modern Family", "The OC", 
    "666 Park Avenue", "Touch", "Arrow", "The League", "Hannibal", "Bates Motel", 
    "The Following", "Continuum", "Homeland", "Helix", "Binbougami ga", "Steins;Gate", 
    "Code Geass", "K-On!", "Fate/Zero", "Madoka Magica", "Fate/Stay Night", "Sakurasou", 
    "Watamote", "The World God Only Knows", "Haruhi", "Death Note", "Silicon Valley", 
    "Warehouse 13", "Monster", "30 Rock", "Sherlock", "Fargo", "Attack on Titan", 
    "House of Cards", "Orange is the New Black", "Parks and Recreation", "Veronica Mars", 
    "The Killing", "Revenge", "True Detective", "The Walking Dead", "Under the Dome", 
    "Brooklyn Nine-Nine", "The Flash", "The 100", "12 Monkeys", "Psycho-Pass", 
    "Better Call Saul", "Daredevil", "The Last Man on Earth", "Sense8", "Humans", "Veep", 
    "Extant", "Supergirl", "Mr. Robot", "Narcos", "Rick and Morty", "iZombie", 
    "Code:Breaker", "You're the Worst", "Jessica Jones", "Lucifer", "The Night Manager", 
    "Preacher", "11.22.63", "Angie Tribeca", "Stranger Things", "Love", "Westworld", 
    "The Night Of", "BrainDead", "Erased", "Black Mirror", "South Park", "Spaced", 
    "Goliath", "Him and Her", "A Series of Unfortunate Events", "Baccano", "Legion", 
    "Iron Fist", "Blindspot", "Santa Clarita Diet", "13 Reasons Why", "Ascension", 
    "Re:Zero", "Defenders", "GLOW", "BoJack Horseman", "American Vandal", "The Good Place", 
    "The Fall", "Dark", "Vice Principals", "Punisher", "Star Trek: Enterprise", 
    "Manhunt: Unabomber", "Mindhunter", "Ozark", "The End of the F***ing World", 
    "Travelers", "Inside No. 9", "Altered Carbon", 
    "American Horror Story: The Assassination of Gianni Versace", "Happy!", "Barry", 
    "Evil Genius", "F is for Family", "Disenchantment", "Sex Education", "Russian Doll", 
    "Crazy Ex-Girlfriend", "Ted Bundy Tapes", "Maniac", "Love, Death & Robots", 
    "The Umbrella Academy", "Star Trek: Discovery", "Chernobyl", "Living with Yourself", 
    "The Witcher", "It's Always Sunny in Philadelphia", "Locke & Key", 
    "Fullmetal Alchemist: Brotherhood", "JoJo's Bizarre Adventure", "Tiger King", 
    "When They See Us", "Afterlife", "Dirk Gently's Holistic Detective Agency", 
    "The Sinner", "Giri/Haji", "The Office UK", "Criminal: UK", "Des", "Extras", "Derek", 
    "The Queen's Gambit", "The People v. O. J. Simpson", "Aunty Donna's Big Ol' House of Fun", 
    "Alice in Borderland", "Space Force", "Wild Wild Country", "Night Stalker", "Lupin", 
    "Crime Scene: The Vanishing at the Cecil Hotel", "White House Farm", "Future Man", 
    "Miracle Workers", "The Serpent", "Loki", "Squid Game", "Arcane", "The Chestnut Man", 
    "Young Sheldon", "The Watchers", "1899", "Dead to Me", 
    "Dahmer – Monster: The Jeffrey Dahmer Story", "Conversations with a Killer: The John Wayne Gacy Tapes", 
    "Severance", "The Last of Us", "Mythomania", "You", "Inside Man", "One Piece", 
    "The Gentlemen", "Sweet Tooth", "Wednesday", "Little Reindeer", "Jujutsu Kaisen", 
    "Scavengers Reign"
  ].map((title, index) => ({
    id: index + 1,
    title,
    rating: 0,
    genres: getRandomGenres(),
    year: getRandomYear(1990, 2023)
  }));

  const [shows, setShows] = useState(initialShows);
  const [filteredShows, setFilteredShows] = useState(initialShows);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [filterOption, setFilterOption] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Function to generate random genres for demo purposes
  function getRandomGenres() {
    const allGenres = ["Drama", "Comedy", "Sci-Fi", "Fantasy", "Horror", "Action", "Adventure", "Thriller", "Mystery", "Crime", "Animation", "Anime"];
    const numGenres = Math.floor(Math.random() * 3) + 1;
    const selectedGenres = [];
    
    for (let i = 0; i < numGenres; i++) {
      const randomIndex = Math.floor(Math.random() * allGenres.length);
      if (!selectedGenres.includes(allGenres[randomIndex])) {
        selectedGenres.push(allGenres[randomIndex]);
      }
    }
    
    return selectedGenres;
  }

  // Function to generate random year for demo purposes
  function getRandomYear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Handle rating change
  const handleRatingChange = (id, newRating) => {
    const updatedShows = shows.map(show => 
      show.id === id ? { ...show, rating: newRating } : show
    );
    setShows(updatedShows);
  };

  // Filter and sort shows
  useEffect(() => {
    let result = [...shows];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(show => 
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filterOption !== 'all') {
      if (filterOption === 'rated') {
        result = result.filter(show => show.rating > 0);
      } else if (filterOption === 'unrated') {
        result = result.filter(show => show.rating === 0);
      } else if (filterOption.startsWith('genre:')) {
        const genre = filterOption.split(':')[1];
        result = result.filter(show => show.genres.includes(genre));
      }
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'rating-high') {
        return b.rating - a.rating;
      } else if (sortOption === 'rating-low') {
        return a.rating - b.rating;
      } else if (sortOption === 'year-new') {
        return b.year - a.year;
      } else if (sortOption === 'year-old') {
        return a.year - b.year;
      }
      return 0;
    });
    
    setFilteredShows(result);
  }, [shows, searchTerm, sortOption, filterOption]);

  // Get all unique genres from shows
  const allGenres = [...new Set(shows.flatMap(show => show.genres))].sort();

  // Star rating component
  const StarRating = ({ rating, onRatingChange }) => {
    const renderStar = (position) => {
      const isFilled = rating >= position;
      const isHalf = rating === position - 0.5;
      
      return (
        <button 
          onClick={() => {
            // If clicking the same star position, toggle between full, half, and empty
            if (rating === position) {
              onRatingChange(position - 0.5);
            } else if (rating === position - 0.5) {
              onRatingChange(0);
            } else {
              onRatingChange(position);
            }
          }}
          onMouseEnter={() => {}}
          className="text-gray-400 hover:text-yellow-400 focus:outline-none"
        >
          {isHalf ? (
            <StarHalf className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ) : isFilled ? (
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="w-6 h-6" />
          )}
        </button>
      );
    };

    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(position => (
          <div 
            key={position}
            className="relative"
            onClick={(e) => {
              // Handle half-star selection by checking cursor position
              const rect = e.currentTarget.getBoundingClientRect();
              const halfPoint = rect.left + rect.width / 2;
              const clickPosition = e.clientX;
              
              if (clickPosition <= halfPoint && rating !== position - 0.5) {
                onRatingChange(position - 0.5);
              } else if (clickPosition > halfPoint && rating !== position) {
                onRatingChange(position);
              } else if (rating === position) {
                onRatingChange(0);
              } else if (rating === position - 0.5) {
                onRatingChange(0);
              }
            }}
          >
            {renderStar(position)}
          </div>
        ))}
      </div>
    );
  };

  // Calculate stats
  const totalShows = shows.length;
  const ratedShows = shows.filter(show => show.rating > 0).length;
  const averageRating = shows.reduce((sum, show) => sum + show.rating, 0) / (ratedShows || 1);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">MyShowTracker</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="stats bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-6">
            <div>
              <div className="text-sm text-gray-500">Total Shows</div>
              <div className="text-2xl font-bold">{totalShows}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Rated</div>
              <div className="text-2xl font-bold">{ratedShows}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Average Rating</div>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="title">Title (A-Z)</option>
            <option value="rating-high">Highest Rated</option>
            <option value="rating-low">Lowest Rated</option>
            <option value="year-new">Newest First</option>
            <option value="year-old">Oldest First</option>
          </select>
          
          <div className="relative">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 flex items-center gap-2"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter className="h-5 w-5" />
              Filter
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <button
                  className={`block px-4 py-2 text-left w-full hover:bg-purple-100 ${filterOption === 'all' ? 'bg-purple-100' : ''}`}
                  onClick={() => {
                    setFilterOption('all');
                    setShowFilterMenu(false);
                  }}
                >
                  All Shows
                </button>
                <button
                  className={`block px-4 py-2 text-left w-full hover:bg-purple-100 ${filterOption === 'rated' ? 'bg-purple-100' : ''}`}
                  onClick={() => {
                    setFilterOption('rated');
                    setShowFilterMenu(false);
                  }}
                >
                  Rated Shows
                </button>
                <button
                  className={`block px-4 py-2 text-left w-full hover:bg-purple-100 ${filterOption === 'unrated' ? 'bg-purple-100' : ''}`}
                  onClick={() => {
                    setFilterOption('unrated');
                    setShowFilterMenu(false);
                  }}
                >
                  Unrated Shows
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <div className="px-4 py-1 text-sm font-semibold text-gray-500">Genres</div>
                {allGenres.map(genre => (
                  <button
                    key={genre}
                    className={`block px-4 py-2 text-left w-full hover:bg-purple-100 ${filterOption === `genre:${genre}` ? 'bg-purple-100' : ''}`}
                    onClick={() => {
                      setFilterOption(`genre:${genre}`);
                      setShowFilterMenu(false);
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shows grid */}
      {filteredShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredShows.map(show => (
            <div key={show.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{show.title}</h3>
                <div className="text-sm text-gray-500 mb-2">{show.year}</div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {show.genres.map(genre => (
                    <span key={genre} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <StarRating 
                    rating={show.rating} 
                    onRatingChange={(newRating) => handleRatingChange(show.id, newRating)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No shows match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TvShowTracker;