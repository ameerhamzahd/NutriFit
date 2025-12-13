// lib/nutrition/calculateNutrition.ts

export type Gender = "Male" | "Female";

export type ActivityLevel =
	| "Sedentary"
	| "Lightly Active"
	| "Moderately Active"
	| "Very Active"
	| "Extremely Active";

export type FitnessGoal =
	| "Lose Weight"
	| "Gain Muscle"
	| "Maintain Weight"
	| "Improve Endurance"
	| "General Fitness";

export interface NutritionInput {
	weightKg: number;
	heightCm: number;
	age: number;
	gender: Gender;
	activityLevel: ActivityLevel;
	fitnessGoal: FitnessGoal;
}

/**
 * Calculate total daily calories for a user
 */
export function calculateDailyCalories({
	weightKg,
	heightCm,
	age,
	gender,
	activityLevel,
	fitnessGoal,
}: NutritionInput): number {
	// Step 1: Calculate BMR (Mifflin-St Jeor)
	let bmr: number;
	if (gender === "Male") {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
	} else {
		bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
	}

	// Step 2: Adjust for activity level
	let activityMultiplier = 1.2; // default sedentary
	switch (activityLevel) {
		case "Sedentary":
			activityMultiplier = 1.2;
			break;
		case "Lightly Active":
			activityMultiplier = 1.375;
			break;
		case "Moderately Active":
			activityMultiplier = 1.55;
			break;
		case "Very Active":
			activityMultiplier = 1.725;
			break;
		case "Extremely Active":
			activityMultiplier = 1.9;
			break;
	}

	let calories = bmr * activityMultiplier;

	// Step 3: Adjust based on fitness goal
	switch (fitnessGoal) {
		case "Lose Weight":
			calories -= 500; // ~0.5 kg/week loss
			break;
		case "Gain Muscle":
			calories += 300; // mild surplus
			break;
		case "Maintain Weight":
			break; // keep as is
		case "Improve Endurance":
			calories += 200; // slightly more energy
			break;
		case "General Fitness":
			break;
	}

	return Math.round(calories);
}
