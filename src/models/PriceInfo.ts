import {Allergens} from './Allergens';
import {NutritionFacts} from './NutritionFacts';

export interface PriceInfo {
  name: string;
  price: number;
  description?: string;
  allergens: Allergens;
  nutritionFacts?: NutritionFacts;
}
