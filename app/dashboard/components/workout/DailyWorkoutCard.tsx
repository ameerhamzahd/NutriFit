//dashboard/components/workout/DailyWorkoutCard.tsx
"use client";

import { useEffect, useState } from "react";
// Import simple icons for visual clarity (using lucide-react, common in Next.js)
import { Dumbbell, Clock, XCircle, ChevronRight } from "lucide-react";

type Exercise = {
	exercise: string; // The property name in your JSON is 'exercise'
	sets?: number;
	reps?: number;
	duration?: string; // e.g., "15 mins"
};

type WorkoutPlanData = {
	workoutPlan: Exercise[];
};

export default function DailyWorkoutCard({ userId }: { userId: string }) {
	const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchWorkoutPlan() {
			try {
				
				const res = await fetch(`/api/workout-plan?userId=${userId}`);
				const data = await res.json();

				if (res.ok) {
					
					setWorkoutPlan(data.workoutPlan || []);
				} else {
					
					setError(data.error || "Failed to fetch workout plan.");
				}
			} catch (err) {
				setError("An error occurred while connecting to the server.");
				console.error("Workout Plan Fetch Error:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchWorkoutPlan();
	}, [userId]);

	// --- Conditional Rendering for States ---

	if (loading) return <p className="text-gray-500">Loading workout plan...</p>;

	if (error)
		return (
			<div className="bg-red-100 p-4 rounded-xl flex items-center gap-2 text-red-700 shadow-md">
				<XCircle size={20} />
				<p className="font-medium">Error: {error}</p>
			</div>
		);

	if (!workoutPlan || workoutPlan.length === 0)
		return (
			<div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 shadow-md mt-6">
				<p className="text-yellow-800 font-medium">
					No workout plan available. Update your fitness goal!
				</p>
			</div>
		);

	// --- Render Workout Plan ---

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-6">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
				<Dumbbell className="text-indigo-600" size={24} />
				Todays Workout Plan
			</h2>

			<div className="space-y-4">
				{workoutPlan.map((exercise, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 transition duration-150 hover:bg-indigo-50"
					>
						{/* Left Side: Exercise Name and Type */}
						<div className="flex-1 min-w-0">
							<h3 className="text-lg font-bold text-gray-800 truncate">
								{exercise.exercise}
							</h3>
							{/* Sets and Reps Display (for strength exercises) */}
							{exercise.sets && exercise.reps && (
								<div className="mt-1 flex items-center text-sm text-gray-600 space-x-4">
									<div className="flex items-center gap-1">
										<span className="font-medium text-indigo-600">
											{exercise.sets}
										</span>
										<span className="text-gray-500">sets</span>
									</div>
									<span className="text-gray-300">|</span>
									<div className="flex items-center gap-1">
										<span className="font-medium text-indigo-600">
											{exercise.reps}
										</span>
										<span className="text-gray-500">reps</span>
									</div>
								</div>
							)}
							{/* Duration Display (for cardio/time-based exercises) */}
							{exercise.duration && (
								<div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
									<Clock size={16} className="text-indigo-400" />
									<span>{exercise.duration}</span>
								</div>
							)}
						</div>

						{/* Right Side: Action/Indicator */}
						<ChevronRight size={20} className="text-gray-400 ml-4" />
					</div>
				))}
			</div>
		</div>
	);
}
