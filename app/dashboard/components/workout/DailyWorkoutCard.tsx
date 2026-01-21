"use client";

import { useEffect, useState } from "react";
import { FaDumbbell, FaTimesCircle, FaTimes } from "react-icons/fa";

type DailyWorkout = {
	exerciseId: string;
	name: string;
	sets?: number;
	reps?: number;
	duration?: number;
	gifUrl: string;
	targetMuscles: string[];
	bodyParts: string[];
	equipments: string[];
	secondaryMuscles: string[];
	instructions: string[];
};

// Function to get fallback image based on exercise name
function getExerciseImage(name: string): string {
	const nameLower = name.toLowerCase();

	if (nameLower.includes("cardio") || nameLower.includes("running") || nameLower.includes("cycling")) {
		return "/images/Exercizes/cardio.jpg";
	} else if (nameLower.includes("squat")) {
		return "/images/Exercizes/squats.jpg";
	} else if (nameLower.includes("push-up") || nameLower.includes("pushup")) {
		return "/images/Exercizes/pushup.jpg";
	} else if (nameLower.includes("plank")) {
		return "/images/Exercizes/plank.jpg";
	} else if (nameLower.includes("bench press")) {
		return "/images/Exercizes/bench-press.jpg";
	} else if (nameLower.includes("deadlift")) {
		return "/images/Exercizes/deadlift.jpg";
	} else if (nameLower.includes("pull-up") || nameLower.includes("pullup")) {
		return "/images/Exercizes/pullup.jpg";
	} else if (nameLower.includes("curl")) {
		return "/images/Exercizes/bicep-curls.jpg";
	} else if (nameLower.includes("stretch") || nameLower.includes("yoga")) {
		return "/images/Exercizes/yoga.jpg";
	} else if (nameLower.includes("circuit")) {
		return "/images/Exercizes/circuit.jpg";
	}

	return "/images/Exercizes/random.jpg";
}

export default function DailyWorkoutCard({ userId }: { userId: string }) {
	const [workoutPlan, setWorkoutPlan] = useState<DailyWorkout[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedExercise, setSelectedExercise] = useState<DailyWorkout | null>(null);

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
			<div className="p-8 rounded-3xl shadow-2xl border-2 border-gray-200 text-center">
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
			<div className="p-6 rounded-3xl shadow-xl border-2 border-red-300 flex items-center gap-3 text-red-700">
				<FaTimesCircle size={24} />
				<div>
					<p className="font-bold text-lg">Error Loading Plan</p>
					<p className="text-sm text-red-600 mt-1">{error}</p>
				</div>
			</div>
		);

	if (!workoutPlan || workoutPlan.length === 0)
		return (
			<div className="p-8 rounded-3xl shadow-xl border-2 border-gray-200 text-center">
				<FaDumbbell size={48} className="mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 font-medium">
					No workout plan available. Set your fitness goal to get started!
				</p>
			</div>
		);

	const strengthExercises = workoutPlan.filter(ex => ex.sets && ex.reps).length;
	const cardioExercises = workoutPlan.filter(ex => ex.duration && !ex.sets && !ex.reps).length;

	let goalMessage = "";
	if (strengthExercises >= cardioExercises) goalMessage = "Strength Focus";
	else if (cardioExercises > strengthExercises) goalMessage = "Cardio Focus";
	else goalMessage = "Balanced Training";

	return (
		<>
			<section className="pt-12 lg:px-0 px-6 md:w-11/12 mx-auto">
				<div className="mx-auto">
					{/* Top Badge */}
					<div className="flex justify-center mb-2">
						<span className="inline-block bg-[#1A232D] text-xs md:text-sm text-[#EEEEEE] font-medium px-4 py-1.5 rounded-[8px] mb-4">
							{goalMessage}
						</span>
					</div>

					{/* Heading */}
					<div className="text-center mb-6">
						<h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
							<div className="text-[#FF6600]">Today's Workout</div>
						</h2>
						<p className="text-[#707070] md:text-2xl mx-auto">
							Personalized exercises designed to help you reach your fitness goals.
						</p>
					</div>

					{/* Workout Cards Grid */}
					<div className="max-w-7xl mx-auto mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{workoutPlan.slice(0, 4).map((exercise, index) => (
								<div
									key={exercise.exerciseId || index}
									className="relative h-80 md:h-96 rounded-[15px] overflow-hidden group cursor-pointer"
								>
									{/* Background Image */}
									<img
										src={exercise.gifUrl || getExerciseImage(exercise.name)}
										alt={exercise.name}
										className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										onError={(e) => {
											e.currentTarget.src = getExerciseImage(exercise.name);
										}}
									/>

									{/* Dark Overlay */}
									<div className="absolute inset-0 bg-black/50 group-hover:bg-black/75 transition-colors duration-300"></div>

									{/* Content */}
									<div className="relative h-full flex flex-col justify-between p-6 text-white">
										{/* Number/Badge */}
										<div className="flex items-center justify-between">
											<div className="text-[30px] md:text-[45px] font-bold text-white/90">
												{String(index + 1).padStart(2, '0')}
											</div>
										</div>

										{/* Bottom Content */}
										<div>
											<h3 className="font-semibold text-base md:text-lg mb-3">
												{exercise.name}
											</h3>
											<button
												onClick={() => setSelectedExercise(exercise)}
												className="w-full bg-[#FF6600] hover:bg-[#ff7f33] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
											>
												View Details
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Modal */}
			{selectedExercise && (
				<div
					className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setSelectedExercise(null)}
				>
					<div
						className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={() => setSelectedExercise(null)}
							className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
						>
							<FaTimes size={16} className="text-gray-600" />
						</button>

						{/* Desktop Layout */}
						<div className="hidden md:flex flex-row max-h-[90vh]">
							{/* Left Side - Content */}
							<div className="flex-1 p-8 overflow-y-auto">
								<h3 className="text-2xl font-bold text-[#1A232D] mb-6 pr-8">
									{selectedExercise.name}
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Target Muscles:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.targetMuscles.map((muscle, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{muscle}
												</span>
											))}
										</div>
									</div>

									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Body Parts:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.bodyParts.map((part, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{part}
												</span>
											))}
										</div>
									</div>

									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Equipment:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.equipments.map((equip, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{equip}
												</span>
											))}
										</div>
									</div>

									{selectedExercise.secondaryMuscles.length > 0 && (
										<div>
											<p className="text-sm font-semibold text-gray-700 mb-2">Secondary Muscles:</p>
											<div className="flex flex-wrap gap-2">
												{selectedExercise.secondaryMuscles.map((muscle, i) => (
													<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
														{muscle}
													</span>
												))}
											</div>
										</div>
									)}
								</div>

								<div>
									<h4 className="text-lg font-bold text-[#1A232D] mb-4">Instructions</h4>
									<div className="space-y-3">
										{selectedExercise.instructions.map((instruction, i) => (
											<div key={i} className="text-gray-700 text-sm leading-relaxed">
												<span className="font-semibold">{instruction.replace(/^Step:\d+\s*/, '')}</span>
											</div>
										))}
									</div>
								</div>
							</div>

							{/* Right Side - Image */}
							<div className="md:w-[45%] flex flex-col items-center justify-center p-8">
								<div className="w-full max-w-sm">
									<img
										src={selectedExercise.gifUrl || getExerciseImage(selectedExercise.name)}
										alt={selectedExercise.name}
										className="w-full h-auto rounded-xl"
										onError={(e) => {
											e.currentTarget.src = getExerciseImage(selectedExercise.name);
										}}
									/>
									<p className="text-center text-orange-600 text-sm mt-4">
										Watch the animation to learn proper form
									</p>
								</div>
							</div>
						</div>
						{/* Mobile Layout - Scrollable */}
						<div className="md:hidden overflow-y-auto max-h-[90vh]">
							{/* Content First */}
							<div className="p-6">
								<h3 className="text-xl font-bold text-[#1A232D] mb-6 pr-8">
									{selectedExercise.name}
								</h3>

								<div className="space-y-4 mb-6">
									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Target Muscles:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.targetMuscles.map((muscle, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{muscle}
												</span>
											))}
										</div>
									</div>

									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Body Parts:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.bodyParts.map((part, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{part}
												</span>
											))}
										</div>
									</div>

									<div>
										<p className="text-sm font-semibold text-gray-700 mb-2">Equipment:</p>
										<div className="flex flex-wrap gap-2">
											{selectedExercise.equipments.map((equip, i) => (
												<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
													{equip}
												</span>
											))}
										</div>
									</div>

									{selectedExercise.secondaryMuscles.length > 0 && (
										<div>
											<p className="text-sm font-semibold text-gray-700 mb-2">Secondary Muscles:</p>
											<div className="flex flex-wrap gap-2">
												{selectedExercise.secondaryMuscles.map((muscle, i) => (
													<span key={i} className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium capitalize">
														{muscle}
													</span>
												))}
											</div>
										</div>
									)}
								</div>

								<div className="mb-6">
									<h4 className="text-lg font-bold text-[#1A232D] mb-4">Instructions</h4>
									<div className="space-y-3">
										{selectedExercise.instructions.map((instruction, i) => (
											<div key={i} className="text-gray-700 text-sm leading-relaxed">
												<span className="font-semibold">{instruction.replace(/^Step:\d+\s*/, '')}</span>
											</div>
										))}
									</div>
								</div>

								{/* Image After Scrolling */}
								<div className="p-6 rounded-xl">
									<img
										src={selectedExercise.gifUrl || getExerciseImage(selectedExercise.name)}
										alt={selectedExercise.name}
										className="w-full h-auto rounded-xl"
										onError={(e) => {
											e.currentTarget.src = getExerciseImage(selectedExercise.name);
										}}
									/>
									<p className="text-center text-orange-600 text-sm mt-4">
										Watch the image to learn proper form
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}