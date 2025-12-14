// lib/workout/generateWorkoutPlan.ts
import { FitnessGoal } from "../nutrition/calculateNutrition";
 
export type DailyWorkout = {
	exercise: string;
	sets?: number;
	reps?: number;
	duration?: number; // in minutes
};
 
export function generateWorkoutPlan(goal: FitnessGoal): DailyWorkout[] {
	switch (goal) {
		case "Lose Weight":
			return [
				{ exercise: "Cardio (running / cycling / brisk walk)", duration: 30 },
				{ exercise: "Bodyweight Squats", sets: 3, reps: 15 },
				{ exercise: "Push-ups", sets: 3, reps: 10 },
				{ exercise: "Plank", duration: 2 }, // minutes
			];
		case "Gain Muscle":
			return [
				{ exercise: "Bench Press", sets: 4, reps: 8 },
				{ exercise: "Deadlift", sets: 4, reps: 6 },
				{ exercise: "Pull-ups", sets: 3, reps: 10 },
				{ exercise: "Bicep Curls", sets: 3, reps: 12 },
			];
		case "Maintain Weight":
			return [
				{ exercise: "Cardio", duration: 20 },
				{ exercise: "Bodyweight Full Body Circuit", sets: 3, reps: 12 },
				{ exercise: "Stretching / Yoga", duration: 15 },
			];
		case "Improve Endurance":
			return [
				{ exercise: "Running / Cycling", duration: 40 },
				{ exercise: "Push-ups", sets: 3, reps: 15 },
				{ exercise: "Squats", sets: 3, reps: 20 },
			];
		case "General Fitness":
			return [
				{ exercise: "Cardio", duration: 20 },
				{ exercise: "Bodyweight Squats", sets: 3, reps: 12 },
				{ exercise: "Push-ups", sets: 3, reps: 10 },
				{ exercise: "Stretching", duration: 10 },
			];
		default:
			return [];
	}
}