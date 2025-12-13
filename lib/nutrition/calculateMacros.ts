// lib/nutrition/calculateMacros.ts

export type Macros = {
	protein_g: number;
	fat_g: number;
	carbs_g: number;
	totalCalories: number;
};

/**
 * Calculate daily macronutrients based on user weight, total calories, and fitness goal
 */
export function calculateMacros(
	weightKg: number,
	totalCalories: number,
	fitnessGoal: string
): Macros {
	let proteinPerKg = 1.8; // default
	let fatPercent = 25; // default percentage

	switch (fitnessGoal) {
		case "Lose Weight":
			proteinPerKg = 2.0;
			fatPercent = 25;
			break;
		case "Gain Muscle":
			proteinPerKg = 2.2;
			fatPercent = 25;
			break;
		case "Maintain Weight":
			proteinPerKg = 1.8;
			fatPercent = 25;
			break;
		case "Improve Endurance":
			proteinPerKg = 1.6;
			fatPercent = 20;
			break;
		case "General Fitness":
			proteinPerKg = 1.8;
			fatPercent = 25;
			break;
		default:
			console.warn(
				`Unknown fitness goal "${fitnessGoal}", using default macros`
			);
			break;
	}

	const protein_g = Math.round(weightKg * proteinPerKg);
	const fat_g = Math.round(((fatPercent / 100) * totalCalories) / 9);

	const proteinCalories = protein_g * 4;
	const fatCalories = fat_g * 9;
	const remainingCalories = totalCalories - (proteinCalories + fatCalories);
	const carbs_g = Math.round(Math.max(0, remainingCalories / 4));

	return {
		protein_g,
		fat_g,
		carbs_g,
		totalCalories,
	};
}
