
//lib/adjustplan
export type DailyTargets = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	workoutIntensity: "Rest" | "Low" | "Moderate" | "High";
};

export type DailyAdherence = {
	calorieRatio: number;
	proteinRatio: number;
	workoutCompleted: boolean;
	workoutIntensity?: "Low" | "Moderate" | "High" | null;
	durationMinutes?: number | null;
};