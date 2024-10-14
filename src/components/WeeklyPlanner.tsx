import React from 'react';
import { DayPlan, Meal } from '../types';
import { Trash2, Plus } from 'lucide-react';

interface WeeklyPlannerProps {
  weekPlan: DayPlan[];
  addMeal: (dayIndex: number, meal: Meal) => void;
  updateMeal: (dayIndex: number, mealIndex: number, updatedMeal: Meal) => void;
  deleteMeal: (dayIndex: number, mealIndex: number) => void;
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mealCategories = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ weekPlan, addMeal, updateMeal, deleteMeal }) => {
  return (
    <div className="space-y-4">
      {weekPlan.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">{daysOfWeek[dayIndex]}</h2>
          {day.meals.map((meal, mealIndex) => (
            <div key={mealIndex} className="mb-4 p-2 bg-white bg-opacity-20 rounded-md">
              <input
                type="text"
                value={meal.name}
                onChange={(e) => updateMeal(dayIndex, mealIndex, { ...meal, name: e.target.value })}
                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-gray-300 mb-2"
                placeholder="Meal name"
              />
              <select
                value={meal.category}
                onChange={(e) => updateMeal(dayIndex, mealIndex, { ...meal, category: e.target.value as Meal['category'] })}
                className="w-full p-2 bg-transparent border-b border-white text-white mb-2"
              >
                {mealCategories.map((category) => (
                  <option key={category} value={category} className="bg-purple-500">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={meal.calories}
                onChange={(e) => updateMeal(dayIndex, mealIndex, { ...meal, calories: Number(e.target.value) })}
                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-gray-300 mb-2"
                placeholder="Calories"
              />
              <textarea
                value={meal.ingredients.join(', ')}
                onChange={(e) => updateMeal(dayIndex, mealIndex, { ...meal, ingredients: e.target.value.split(',').map(i => i.trim()) })}
                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-gray-300 mb-2"
                placeholder="Ingredients (comma-separated)"
              />
              <button
                onClick={() => deleteMeal(dayIndex, mealIndex)}
                className="text-red-300 hover:text-red-100 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addMeal(dayIndex, { name: '', category: 'breakfast', calories: 0, ingredients: [] })}
            className="w-full bg-yellow-400 text-purple-900 p-2 rounded-md mt-2 flex items-center justify-center hover:bg-yellow-300 transition-colors"
          >
            <Plus size={20} className="mr-2" /> Add Meal
          </button>
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlanner;