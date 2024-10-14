export interface Meal {
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  ingredients: string[];
}

export interface DayPlan {
  meals: Meal[];
}

export interface Ingredient {
  food: {
    label: string;
    image: string;
    nutrients: {
      ENERC_KCAL: number;
    };
  };
}