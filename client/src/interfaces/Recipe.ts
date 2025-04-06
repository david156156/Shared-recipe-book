export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  dairyMeatType: string;
  mealType?: string[];
  likes?: number;
  userId?: string;
}
