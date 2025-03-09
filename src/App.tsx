import { useEffect, useState } from "react";

const TvShowTracker = () => {
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
    "Travelers", "Inside No. 9", "Altered Carbon", "American Horror Story: The Assassination of Gianni Versace",
    "Happy!", "Barry", "Evil Genius", "F is for Family", "Disenchantment", "Sex Education",
    "Russian Doll", "Crazy Ex-Girlfriend", "Ted Bundy Tapes", "Maniac", "Love, Death & Robots",
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
    year: getRandomYear(1990, 2023),
  }));

  const [shows, setShows] = useState(initialShows);
  const [filteredShows, setFilteredShows] = useState(initialShows);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [filterOption, setFilterOption] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  function getRandomGenres() {
    const allGenres = ["Drama", "Comedy", "Sci-Fi", "Fantasy", "Horror", "Action", "Adventure", "Thriller", "Mystery", "Crime", "Animation", "Anime"];
    return Array.from(new Set([...Array(Math.floor(Math.random() * 3) + 1)].map(() => allGenres[Math.floor(Math.random() * allGenres.length)])));
  }

  function getRandomYear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    let result = [...shows];
    if (searchTerm) {
      result = result.filter(show => show.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredShows(result);
  }, [shows, searchTerm]);

  return (
    <div>
      <h1>Tv Show Tracker</h1>
      {/* Additional UI and components here */}
    </div>
  );
};

export default TvShowTracker;
