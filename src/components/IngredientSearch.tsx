import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Ingredient } from '../types';

interface IngredientSearchProps {
  appId: string;
  appKey: string;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({ appId, appKey }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchIngredient = async () => {
    if (!query.trim()) {
      setError('Please enter an ingredient to search');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data.hints);
    } catch (err) {
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an ingredient"
          className="flex-grow p-2 bg-white bg-opacity-20 rounded-l-md text-white placeholder-gray-300"
        />
        <button
          onClick={searchIngredient}
          className="bg-yellow-400 text-purple-900 p-2 rounded-r-md hover:bg-yellow-300 transition-colors"
          disabled={loading}
        >
          <Search size={24} />
        </button>
      </div>
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {results.map((result, index) => (
          <div key={index} className="bg-white bg-opacity-10 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <img
              src={result.food.image}
              alt={result.food.label}
              className="w-full h-32 object-cover mb-2 rounded-md"
            />
            <p className="text-sm font-semibold">{result.food.label}</p>
            <p className="text-xs text-gray-300">{result.food.nutrients.ENERC_KCAL.toFixed(0)} kcal</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;