"use client";

import { useEffect, useState } from "react";
import { FaDumbbell, FaClock, FaTimesCircle, FaChevronRight, FaArrowUp  } from "react-icons/fa";

type Exercise = {
	exercise: string;
	sets?: number;
	reps?: number;
	duration?: string;
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
				console.error(err);
			} finally {
				setLoading(false);
			}
		}

		fetchWorkoutPlan();
	}, [userId]);

	if (loading)
		return (
			<div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-gray-200 text-center">
				<div className="flex items-center justify-center space-x-3">
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" style={{ animationDelay: "0.1s" }} />
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" style={{ animationDelay: "0.2s" }} />
				</div>
				<p className="text-gray-600 mt-4 font-medium">Loading your workout plan...</p>
			</div>
		);

	if (error)
		return (
			<div className="bg-red-50 p-6 rounded-3xl shadow-xl border-2 border-red-300 flex items-center gap-3 text-red-700">
				<FaTimesCircle size={24} />
				<div>
					<p className="font-bold text-lg">Error Loading Plan</p>
					<p className="text-sm text-red-600 mt-1">{error}</p>
				</div>
			</div>
		);

	if (!workoutPlan || workoutPlan.length === 0)
		return (
			<div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-gray-200 text-center">
				<FaDumbbell size={48} className="mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 font-medium">
					No workout plan available. Set your fitness goal to get started!
				</p>
			</div>
		);

	// Determine Goal Badge
	let goalMessage = "";
	const totalDuration = workoutPlan.reduce((sum, ex) => {
		if (!ex.duration) return sum;
		const mins = parseInt(ex.duration) || 0;
		return sum + mins;
	}, 0);

	const strengthExercises = workoutPlan.filter(ex => ex.sets && ex.reps).length;
	const cardioExercises = workoutPlan.filter(ex => ex.duration && !ex.sets && !ex.reps).length;

	if (strengthExercises >= cardioExercises) goalMessage = "Strength Focus 💪";
	else if (cardioExercises > strengthExercises) goalMessage = "Cardio Focus 🏃‍♂️";
	else goalMessage = "Balanced Training ⚖️";

	return (
		<div className="bg-white p-8 shadow-2xl border-2 border-gray-100 relative overflow-hidden">
			{/* Glow accents */}
			<div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[#BFFF00]" />
			<div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[#FF6600]" />

			{/* Header */}
			<div className="relative z-10 mb-4 flex items-center gap-4">
				<div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#BFFF00] to-[#9FDF00]">
					<FaDumbbell size={26} color="#1A232D" />
				</div>
				<div>
					<h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#1A232D]">
						Today's Workout
					</h2>
					<p className="text-gray-600 text-sm font-medium">Achieve your fitness goals</p>
				</div>
			</div>

			{/* Goal Badge */}
			<div className="mb-6 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-[#1A232D]/90 text-white w-fit">
				<FaArrowUp  size={14} />
				<span>{goalMessage}</span>
			</div>

			{/* Workout Cards */}
			<div className="relative z-10 space-y-4">
				{workoutPlan.map((exercise, index) => (
					<div
						key={index}
						className="bg-gradient-to-r from-white to-gray-50 p-5 rounded-2xl border-2 border-gray-200 hover:border-[#BFFF00] hover:shadow-xl transition-all duration-300 flex justify-between items-center"
					>
						<div className="flex items-center gap-4">
							<div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shadow-md text-2xl">
								🏋️
							</div>
							<div>
								<h4 className="text-xl font-black text-[#1A232D] truncate">
									{exercise.exercise}
								</h4>
								<div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
									{exercise.sets && exercise.reps && (
										<span>
											<strong className="text-[#FF6600]">{exercise.sets}</strong> sets |{" "}
											<strong className="text-[#FF6600]">{exercise.reps}</strong> reps
										</span>
									)}
									{exercise.duration && (
										<span className="flex items-center gap-1">
											<FaClock size={14} className="text-[#BFFF00]" />
											{exercise.duration}
										</span>
									)}
								</div>
							</div>
						</div>
						<FaChevronRight size={20} className="text-gray-400" />
					</div>
				))}
			</div>
		</div>
	);
}
