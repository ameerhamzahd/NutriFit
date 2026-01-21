import { DailyTargets, DailyAdherence } from "./types";

export function adjustPlan(
	today: DailyTargets,
	adherence: DailyAdherence,
): DailyTargets {
	let calories = today.calories;
	let protein = today.protein;
	let workoutIntensity = today.workoutIntensity;

	// Rule 1: Calorie Adjustment
	// If they ate too little (under 80%), reduce tomorrow slightly to prevent binging
	if (adherence.calorieAdherence < 80) {
		calories -= 100;
	}
	// If they overate (over 110%), trim tomorrow to balance the weekly average
	else if (adherence.calorieAdherence > 110) {
		calories -= 150;
	}

	// Rule 2: Protein Adjustment
	// If they missed protein goals, increase tomorrow to protect muscle mass
	if (adherence.proteinAdherence < 85) {
		protein += 15;
	}

	// Rule 3: Workout Adjustment
	// If workout was missed, lower tomorrow's intensity to 'Low' to encourage movement
	if (!adherence.workoutCompleted) {
		workoutIntensity = "Low";
	}

	return {
		calories: Math.max(calories, 1200), // Safety floor
		protein: Math.max(protein, 50),
		carbs: Math.round((calories * 0.45) / 4), // Balanced macros
		fat: Math.round((calories * 0.25) / 9),
		workoutIntensity,
	};
}
