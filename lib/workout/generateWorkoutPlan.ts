import { FitnessGoal } from "../nutrition/calculateNutrition";

export type DailyWorkout = {
	exerciseId: string;
	name: string;
	sets?: number;
	reps?: number;
	duration?: number; // in minutes
	gifUrl: string;
	targetMuscles: string[];
	bodyParts: string[];
	equipments: string[];
	secondaryMuscles: string[];
	instructions: string[];
};

export function generateWorkoutPlan(goal: FitnessGoal): DailyWorkout[] {
	switch (goal) {
		case "Lose Weight":
			return [
				{
					exerciseId: "lw1",
					name: "Cardio (running / cycling / brisk walk)",
					duration: 30,
					gifUrl: "https://static.exercisedb.dev/media/activities/running.gif",
					targetMuscles: ["legs", "heart"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Warm up for 5 minutes.",
						"Step 2: Maintain moderate pace for 30 minutes.",
						"Step 3: Cool down and stretch.",
					],
				},
				{
					exerciseId: "lw2",
					name: "Bodyweight Squats",
					sets: 3,
					reps: 15,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/bodyweight_squat.gif",
					targetMuscles: ["quadriceps", "glutes"],
					bodyParts: ["legs"],
					equipments: ["none"],
					secondaryMuscles: ["hamstrings", "calves"],
					instructions: [
						"Step 1: Stand with feet shoulder-width apart.",
						"Step 2: Lower body by bending knees and hips.",
						"Step 3: Push through heels to return.",
					],
				},
				{
					exerciseId: "lw3",
					name: "Push-ups",
					sets: 3,
					reps: 10,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/push_up.gif",
					targetMuscles: ["chest"],
					bodyParts: ["upper body"],
					equipments: ["none"],
					secondaryMuscles: ["triceps", "shoulders", "core"],
					instructions: [
						"Step 1: Start in plank position.",
						"Step 2: Lower chest to floor.",
						"Step 3: Push back up to start.",
					],
				},
				{
					exerciseId: "lw4",
					name: "Plank",
					duration: 2,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/plank.gif",
					targetMuscles: ["core"],
					bodyParts: ["abs"],
					equipments: ["none"],
					secondaryMuscles: ["back", "shoulders"],
					instructions: [
						"Step 1: Get into forearm plank.",
						"Step 2: Keep body straight.",
						"Step 3: Hold for 2 minutes.",
					],
				},
			];

		case "Gain Muscle":
			return [
				{
					exerciseId: "gm1",
					name: "Bench Press",
					sets: 4,
					reps: 8,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/bench_press.gif",
					targetMuscles: ["pectoralis major"],
					bodyParts: ["chest"],
					equipments: ["barbell", "bench"],
					secondaryMuscles: ["triceps", "deltoids"],
					instructions: [
						"Step 1: Lie on bench, grip bar slightly wider than shoulders.",
						"Step 2: Lower bar to chest.",
						"Step 3: Push bar up until arms extended.",
					],
				},
				{
					exerciseId: "gm2",
					name: "Deadlift",
					sets: 4,
					reps: 6,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/deadlift.gif",
					targetMuscles: ["glutes", "hamstrings"],
					bodyParts: ["full body"],
					equipments: ["barbell"],
					secondaryMuscles: ["lower back", "forearms"],
					instructions: [
						"Step 1: Stand with feet hip-width apart, grip bar.",
						"Step 2: Lift bar by extending hips and knees.",
						"Step 3: Lower slowly with control.",
					],
				},
				{
					exerciseId: "gm3",
					name: "Pull-ups",
					sets: 3,
					reps: 10,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/pull_up.gif",
					targetMuscles: ["latissimus dorsi"],
					bodyParts: ["back"],
					equipments: ["pull-up bar"],
					secondaryMuscles: ["biceps", "forearms"],
					instructions: [
						"Step 1: Grip bar with palms facing away.",
						"Step 2: Pull up until chin above bar.",
						"Step 3: Lower slowly.",
					],
				},
				{
					exerciseId: "gm4",
					name: "Bicep Curls",
					sets: 3,
					reps: 12,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/bicep_curl.gif",
					targetMuscles: ["biceps"],
					bodyParts: ["arms"],
					equipments: ["dumbbells"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Hold dumbbells at sides.",
						"Step 2: Curl weights up toward shoulders.",
						"Step 3: Lower slowly.",
					],
				},
			];

		case "Maintain Weight":
			return [
				{
					exerciseId: "mw1",
					name: "Cardio",
					duration: 20,
					gifUrl: "https://static.exercisedb.dev/media/activities/running.gif",
					targetMuscles: ["legs", "heart"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Warm up for 5 minutes.",
						"Step 2: Maintain steady pace for 20 minutes.",
						"Step 3: Cool down and stretch.",
					],
				},
				{
					exerciseId: "mw2",
					name: "Bodyweight Full Body Circuit",
					sets: 3,
					reps: 12,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/bodyweight_circuit.gif",
					targetMuscles: ["full body"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Perform bodyweight exercises back to back.",
						"Step 2: Short rest between movements.",
						"Step 3: Repeat circuit for prescribed sets.",
					],
				},
				{
					exerciseId: "mw3",
					name: "Stretching / Yoga",
					duration: 15,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/stretching.gif",
					targetMuscles: ["flexibility"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Hold each stretch for 20-30 seconds.",
						"Step 2: Breathe deeply.",
						"Step 3: Repeat major muscle groups.",
					],
				},
			];

		case "Improve Endurance":
			return [
				{
					exerciseId: "ie1",
					name: "Running / Cycling",
					duration: 40,
					gifUrl: "https://static.exercisedb.dev/media/activities/running.gif",
					targetMuscles: ["legs", "heart"],
					bodyParts: ["full body"],
					equipments: ["none", "bike"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Choose running or cycling.",
						"Step 2: Warm up for 5 minutes.",
						"Step 3: Maintain steady pace for duration.",
					],
				},
				{
					exerciseId: "ie2",
					name: "Push-ups",
					sets: 3,
					reps: 15,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/push_up.gif",
					targetMuscles: ["chest"],
					bodyParts: ["upper body"],
					equipments: ["none"],
					secondaryMuscles: ["triceps", "shoulders", "core"],
					instructions: [
						"Step 1: Start in plank position.",
						"Step 2: Lower chest to floor.",
						"Step 3: Push back up.",
					],
				},
				{
					exerciseId: "ie3",
					name: "Squats",
					sets: 3,
					reps: 20,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/squat.gif",
					targetMuscles: ["quadriceps"],
					bodyParts: ["legs"],
					equipments: ["none"],
					secondaryMuscles: ["glutes", "hamstrings"],
					instructions: [
						"Step 1: Stand feet shoulder-width apart.",
						"Step 2: Lower body until thighs parallel.",
						"Step 3: Push through heels to stand.",
					],
				},
			];

		case "General Fitness":
			return [
				{
					exerciseId: "gf1",
					name: "Cardio",
					duration: 20,
					gifUrl: "https://static.exercisedb.dev/media/activities/running.gif",
					targetMuscles: ["legs", "heart"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Warm up for 5 minutes.",
						"Step 2: Maintain steady pace for 20 minutes.",
						"Step 3: Cool down and stretch.",
					],
				},
				{
					exerciseId: "gf2",
					name: "Bodyweight Squats",
					sets: 3,
					reps: 12,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/bodyweight_squat.gif",
					targetMuscles: ["quadriceps", "glutes"],
					bodyParts: ["legs"],
					equipments: ["none"],
					secondaryMuscles: ["hamstrings", "calves"],
					instructions: [
						"Step 1: Stand feet shoulder-width apart.",
						"Step 2: Lower into squat.",
						"Step 3: Push through heels.",
					],
				},
				{
					exerciseId: "gf3",
					name: "Push-ups",
					sets: 3,
					reps: 10,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/push_up.gif",
					targetMuscles: ["chest"],
					bodyParts: ["upper body"],
					equipments: ["none"],
					secondaryMuscles: ["triceps", "shoulders", "core"],
					instructions: [
						"Step 1: Plank position.",
						"Step 2: Lower chest.",
						"Step 3: Push back up.",
					],
				},
				{
					exerciseId: "gf4",
					name: "Stretching",
					duration: 10,
					gifUrl: "https://static.exercisedb.dev/media/exerciseImages/basic_stretch.gif",
					targetMuscles: ["flexibility"],
					bodyParts: ["full body"],
					equipments: ["none"],
					secondaryMuscles: [],
					instructions: [
						"Step 1: Hold stretch positions.",
						"Step 2: Breathe steadily.",
						"Step 3: Relax muscles.",
					],
				},
			];

		default:
			return [];
	}
}