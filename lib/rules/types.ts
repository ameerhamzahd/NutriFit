//lib/type.ts

export type DailyTargets = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	workoutIntensity: "Rest" | "Low" | "Moderate" | "High";
};

export type DailyAdherence = {
	calorieAdherence: number; // e.g., 85
	proteinAdherence: number; // e.g., 90
	workoutCompleted: boolean;
	calorieRatio?: number; // 👈 Make these optional with '?'
	proteinRatio?: number; // 👈 Make these optional with '?'
};

