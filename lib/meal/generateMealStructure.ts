// lib/meal/generateMealStructure.ts
import { Macros } from "../nutrition/calculateMacros";
 
export type MealType = "Breakfast" | "Lunch" | "Snack" | "Dinner";
 
export type DailyMealPlan = {
	meal: MealType;
	protein: number; // grams
	carbs: number; // grams
	fat: number; // grams
};
 
export function generateMealStructure(macros: Macros): DailyMealPlan[] {
	const { protein_g, carbs_g, fat_g } = macros;
 
	// Split macros into meals (Breakfast 25%, Lunch 30%, Snack 15%, Dinner 30%)
	const mealDistribution = {
		Breakfast: 0.25,
		Lunch: 0.3,
		Snack: 0.15,
		Dinner: 0.3,
	};
 
	const mealPlan: DailyMealPlan[] = (
		Object.keys(mealDistribution) as MealType[]
	).map((meal) => {
		const ratio = mealDistribution[meal];
		return {
			meal,
			protein: Math.round(protein_g * ratio),
			carbs: Math.round(carbs_g * ratio),
			fat: Math.round(fat_g * ratio),
		};
	});
 
	return mealPlan;
}