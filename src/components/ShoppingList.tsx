import React from 'react';
import { DayPlan } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ShoppingListProps {
  weekPlan: DayPlan[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ weekPlan }) => {
  const ingredients = weekPlan
    .flatMap(day => day.meals)
    .flatMap(meal => meal.ingredients)
    .reduce((acc, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ShoppingBag size={24} className="mr-2" />
        Shopping List
      </h2>
      <ul className="space-y-2">
        {Object.entries(ingredients).map(([ingredient, count]) => (
          <li key={ingredient} className="flex justify-between items-center bg-white bg-opacity-20 p-2 rounded-md">
            <span className="font-medium">{ingredient}</span>
            <span className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm">
              x{count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;