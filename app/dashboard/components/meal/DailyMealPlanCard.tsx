"use client";
import { useEffect, useState } from "react";
import { FaTimesCircle, FaFireAlt, FaUtensils, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getBangladeshDate } from "@/lib/dateUtils";

type MealDetail = { name: string; calories: number };
type Macro = { protein_g: number; carbs_g: number; fat_g: number };
type MealPlanData = { calories: number; macros: Macro; meals: MealDetail[] };

// Function to get meal image based on meal name
function getMealImage(name: string): string {
	const nameLower = name.toLowerCase();

	if (nameLower.includes("breakfast") || nameLower.includes("morning")) {
		return "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769023694/breakfast_gurryp.jpg";
	} else if (nameLower.includes("lunch")) {
		return "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769023694/lunch_pb1dyg.jpg";
	} else if (nameLower.includes("dinner")) {
		return "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769023694/dinner_surck6.jpg";
	} else if (nameLower.includes("snack")) {
		return "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769023694/snacks_n3l6ad.jpg";
	}

	return "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769023696/random_cx1fzu.jpg";
}

export default function DailyMealPlanCard({ userId }: { userId: string }) {
	const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null);

	useEffect(() => {
		async function fetchMealPlan() {
			try {
				// Keep functional logic: Get BD Date string
				const todayStr = getBangladeshDate(0);

				const res = await fetch("/api/meal-plan", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userId,
						date: todayStr, // Functional requirement maintained
					}),
				});

				const data = await res.json();
				if (!res.ok)
					throw new Error(data.error || "Failed to fetch meal plan.");
				setMealPlanData(data.mealPlan);
			} catch (err: any) {
				console.error("Fetch Error:", err);
				setError(err.message || "An unknown error occurred.");
			} finally {
				setLoading(false);
			}
		}
		if (userId) fetchMealPlan();
	}, [userId]);

	if (loading)
		return (
			<div className="p-8 text-center">
				<div className="flex items-center justify-center space-x-3">
					<div className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]" />
					<div
						className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]"
						style={{ animationDelay: "0.1s" }}
					/>
					<div
						className="w-3 h-3 rounded-full animate-bounce bg-[#BFFF00]"
						style={{ animationDelay: "0.2s" }}
					/>
				</div>
				<p className="text-gray-600 mt-4 font-medium">
					Loading your meal plan...
				</p>
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

	if (!mealPlanData || !mealPlanData.meals || mealPlanData.meals.length === 0) {
		return (
			<div className="p-8 rounded-3xl shadow-xl border-2 border-gray-200 text-center">
				<FaUtensils size={48} className="mx-auto mb-4 text-gray-400" />
				<p className="text-gray-600 font-medium">
					No meal plan available. Set your fitness goal to get started!
				</p>
			</div>
		);
	}

	const protein = mealPlanData.macros?.protein_g || 0;
	const carbs = mealPlanData.macros?.carbs_g || 0;
	const fat = mealPlanData.macros?.fat_g || 0;
	const totalCalories = Math.round(mealPlanData.calories);

	let goalMessage = "";
	if (protein > carbs && protein > fat) goalMessage = "High Protein";
	else if (carbs > protein && carbs > fat) goalMessage = "Carb Focus";
	else if (fat > protein && fat > carbs) goalMessage = "Healthy Fats";
	else goalMessage = "Balanced Nutrition";

	return (<>
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
							<div className="text-[#FF6600]">Today's Nutrition</div>
						</h2>
						<p className="text-[#707070] md:text-2xl mx-auto">
							Personalized meals designed to fuel your fitness journey.
						</p>
					</div>

					{/* Meal Cards Grid */}
					<div className="max-w-7xl mx-auto mt-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{mealPlanData.meals.slice(0, 4).map((meal, index) => (
								<div
									key={index}
									className="relative h-80 md:h-96 rounded-[15px] overflow-hidden group cursor-pointer"
								>
									{/* Background Image */}
									<img
										src={getMealImage(meal.name)}
										alt={meal.name}
										className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
												{meal.name}
											</h3>
											<button
												onClick={() => setSelectedMeal(meal)}
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
			{selectedMeal && (
				<div
					className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setSelectedMeal(null)}
				>
					<div
						className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={() => setSelectedMeal(null)}
							className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
						>
							<FaTimes size={16} className="text-gray-600" />
						</button>

						{/* Desktop Layout */}
						<div className="hidden md:flex flex-row max-h-[90vh]">
							{/* Left Side - Content */}
							<div className="flex-1 p-8 overflow-y-auto">
								<h3 className="text-2xl font-bold text-[#1A232D] mb-6 pr-8">
									{selectedMeal.name}
								</h3>

								<div className="grid grid-cols-1 gap-6 mb-6">
									<div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-100">
										<div className="flex items-center gap-3 mb-4">
											<FaFireAlt size={24} className="text-orange-600" />
											<p className="text-sm font-bold text-gray-700 uppercase">
												Calories
											</p>
										</div>
										<p className="text-4xl font-black text-orange-600">
											{Math.round(selectedMeal.calories)}
											<span className="text-lg text-gray-500 ml-2">kcal</span>
										</p>
									</div>

									<div>
										<p className="text-sm font-bold text-gray-700 mb-3 uppercase">
											Estimated Macros
										</p>
										<div className="space-y-3">
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Protein</span>
												<span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * protein)}g
												</span>
											</div>
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Carbs</span>
												<span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * carbs)}g
												</span>
											</div>
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Fats</span>
												<span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * fat)}g
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
									<p className="text-sm text-blue-800">
										<strong>Note:</strong> This is a personalized meal plan. Adjust portions based on your hunger levels and activity for the day.
									</p>
								</div>
							</div>

							{/* Right Side - Image */}
							<div className="md:w-[45%] flex flex-col items-center justify-center p-8">
								<div className="w-full max-w-sm">
									<img
										src={getMealImage(selectedMeal.name)}
										alt={selectedMeal.name}
										className="w-full h-auto rounded-xl"
									/>
									<p className="text-center text-orange-600 text-sm mt-4">
										Enjoy your nutritious meal!
									</p>
								</div>
							</div>
						</div>

						{/* Mobile Layout - Scrollable */}
						<div className="md:hidden overflow-y-auto max-h-[90vh]">
							{/* Content First */}
							<div className="p-6">
								<h3 className="text-xl font-bold text-[#1A232D] mb-6 pr-8">
									{selectedMeal.name}
								</h3>

								<div className="space-y-6 mb-6">
									<div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
										<div className="flex items-center gap-3 mb-4">
											<FaFireAlt size={24} className="text-orange-600" />
											<p className="text-sm font-bold text-gray-700 uppercase">
												Calories
											</p>
										</div>
										<p className="text-4xl font-black text-orange-600">
											{Math.round(selectedMeal.calories)}
											<span className="text-lg text-gray-500 ml-2">kcal</span>
										</p>
									</div>

									<div>
										<p className="text-sm font-bold text-gray-700 mb-3 uppercase">
											Estimated Macros
										</p>
										<div className="space-y-3">
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Protein</span>
												<span className="font-bold text-[#BFFF00] bg-[#BFFF00]/20 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * protein)}g
												</span>
											</div>
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Carbs</span>
												<span className="font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * carbs)}g
												</span>
											</div>
											<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
												<span className="font-medium text-gray-700">Fats</span>
												<span className="font-bold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
													{Math.round((selectedMeal.calories / totalCalories) * fat)}g
												</span>
											</div>
										</div>
									</div>

									<div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
										<p className="text-sm text-blue-800">
											<strong>Note:</strong> This is a personalized meal plan. Adjust portions based on your hunger levels and activity for the day.
										</p>
									</div>
								</div>

								{/* Image After Scrolling */}
								<div className="bg-gray-50 p-6 rounded-xl">
									<img
										src={getMealImage(selectedMeal.name)}
										alt={selectedMeal.name}
										className="w-full h-auto rounded-xl"
									/>
									<p className="text-center text-orange-600 text-sm mt-4">
										Enjoy your nutritious meal!
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
