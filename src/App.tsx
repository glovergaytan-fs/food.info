import React, { useState, useEffect } from 'react';
import WeeklyPlanner from './components/WeeklyPlanner';
import IngredientSearch from './components/IngredientSearch';
import ShoppingList from './components/ShoppingList';
import BottomNavigation from './components/BottomNavigation';
import { Meal, DayPlan } from './types';
import { Utensils, Search, ShoppingBag } from 'lucide-react';

const EDAMAM_APP_ID = 'YOUR_APP_ID';
const EDAMAM_APP_KEY = 'YOUR_APP_KEY';

function App() {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    const savedPlan = localStorage.getItem('weekPlan');
    return savedPlan ? JSON.parse(savedPlan) : Array(7).fill({ meals: [] });
  });
  const [activeTab, setActiveTab] = useState('planner');

  useEffect(() => {
    localStorage.setItem('weekPlan', JSON.stringify(weekPlan));
  }, [weekPlan]);

  const addMeal = (dayIndex: number, meal: Meal) => {
    const newWeekPlan = [...weekPlan];
    newWeekPlan[dayIndex].meals.push(meal);
    setWeekPlan(newWeekPlan);
  };

  const updateMeal = (dayIndex: number, mealIndex: number, updatedMeal: Meal) => {
    const newWeekPlan = [...weekPlan];
    newWeekPlan[dayIndex].meals[mealIndex] = updatedMeal;
    setWeekPlan(newWeekPlan);
  };

  const deleteMeal = (dayIndex: number, mealIndex: number) => {
    const newWeekPlan = [...weekPlan];
    newWeekPlan[dayIndex].meals.splice(mealIndex, 1);
    setWeekPlan(newWeekPlan);
  };

  const totalCalories = weekPlan.reduce((total, day) => 
    total + day.meals.reduce((dayTotal, meal) => dayTotal + meal.calories, 0), 0
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'planner':
        return (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Total Weekly Calories: {totalCalories}</h2>
            </div>
            <WeeklyPlanner
              weekPlan={weekPlan}
              addMeal={addMeal}
              updateMeal={updateMeal}
              deleteMeal={deleteMeal}
            />
          </>
        );
      case 'search':
        return <IngredientSearch appId={EDAMAM_APP_ID} appKey={EDAMAM_APP_KEY} />;
      case 'shopping':
        return <ShoppingList weekPlan={weekPlan} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="max-w-md mx-auto pb-20">
        <header className="py-4 px-4 bg-white bg-opacity-10 backdrop-blur-md">
          <h1 className="text-2xl font-bold text-center">Meal Maestro</h1>
        </header>
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { id: 'planner', label: 'Planner', icon: <Utensils size={24} /> },
          { id: 'search', label: 'Search', icon: <Search size={24} /> },
          { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={24} /> },
        ]}
      />
    </div>
  );
}

export default App;