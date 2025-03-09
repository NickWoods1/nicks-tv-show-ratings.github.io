import { Star, StarHalf } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Show {
  id: number;
  title: string;
  rating: number;
  genres: string[];
  year: number;
}

const TvShowTracker = () => {
  const getRandomGenres = (): string[] => {
    const allGenres = ["Drama", "Comedy", "Sci-Fi", "Fantasy", "Horror", "Action", "Adventure", "Thriller", "Mystery", "Crime", "Animation", "Anime"];
    const numGenres = Math.floor(Math.random() * 3) + 1;
    const selectedGenres: string[] = [];
    
    for (let i = 0; i < numGenres; i++) {
      const randomIndex = Math.floor(Math.random() * allGenres.length);
      if (!selectedGenres.includes(allGenres[randomIndex])) {
        selectedGenres.push(allGenres[randomIndex]);
      }
    }
    
    return selectedGenres;
  };

  const getRandomYear = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const initialShows: Show[] = [
    "Lost Girl", "Weeds", "True Blood", "Vampire Diaries", "90210", "Glee"
  ].map((title, index) => ({
    id: index + 1,
    title,
    rating: 0,
    genres: getRandomGenres(),
    year: getRandomYear(1990, 2023)
  }));

  const [shows, setShows] = useState<Show[]>(initialShows);
  const [filteredShows, setFilteredShows] = useState<Show[]>(initialShows);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('title');
  const [filterOption, setFilterOption] = useState<string>('all');
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

  const handleRatingChange = (id: number, newRating: number) => {
    const updatedShows = shows.map(show => 
      show.id === id ? { ...show, rating: newRating } : show
    );
    setShows(updatedShows);
  };

  useEffect(() => {
    let result = [...shows];
    if (searchTerm) {
      result = result.filter(show => 
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterOption !== 'all') {
      if (filterOption === 'rated') {
        result = result.filter(show => show.rating > 0);
      } else if (filterOption === 'unrated') {
        result = result.filter(show => show.rating === 0);
      }
    }
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

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (newRating: number) => void }) => {
    const renderStar = (position: number) => {
      const isFilled = rating >= position;
      const isHalf = rating === position - 0.5;
      return (
        <button onClick={() => onRatingChange(position)}>
          {isHalf ? <StarHalf /> : isFilled ? <Star /> : <Star />}
        </button>
      );
    };
    return (
      <div>
        {[1, 2, 3, 4, 5].map(position => (
          <span key={position}>{renderStar(position)}</span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {filteredShows.map(show => (
        <div key={show.id}>
          <h3>{show.title} ({show.year})</h3>
          <StarRating rating={show.rating} onRatingChange={(newRating) => handleRatingChange(show.id, newRating)} />
        </div>
      ))}
    </div>
  );
};

export default TvShowTracker;