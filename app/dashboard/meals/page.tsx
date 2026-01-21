"use client";
import React, { useEffect, useState } from "react";
import DailyMealPlanCard from "../components/meal/DailyMealPlanCard";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles, TrendingUp, Target } from "lucide-react";

export default function MealPlan() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getSessionUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
			setLoading(false);
		}
		getSessionUser();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="flex items-center justify-center space-x-3 mb-4">
						<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00' }}></div>
						<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00', animationDelay: '0.1s' }}></div>
						<div className="w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#BFFF00', animationDelay: '0.2s' }}></div>
					</div>
					<p className="text-gray-600 text-lg font-semibold">
						Loading your dashboard...
					</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center p-8 max-w-md">
					<div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6600 0%, #FF8833 100%)' }}>
						<Target className="text-white" size={32} />
					</div>
					<h2 className="text-2xl font-black mb-2" style={{ color: '#1A232D' }}>
						Authentication Required
					</h2>
					<p className="text-gray-600 text-lg font-medium">
						Please login to view your personalized meal plan.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 relative">
			{/* Decorative Background Elements */}
			<div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: '#FF6600' }}></div>
			<div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: '#BFFF00' }}></div>

			{/* Header Section */}
			<div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
				<div className="inline-block mb-6">
					<div className="flex items-center gap-3 px-3 py-2 bg-white rounded-full shadow-lg border-2 border-gray-200">
						<Sparkles size={20} style={{ color: '#BFFF00' }} />
						<span className="text-xs font-bold uppercase tracking-wide text-[#1A232D]">
							Personalized For You
						</span>
					</div>
				</div>

				<h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4" style={{ color: '#1A232D' }}>
					Your Daily
					<span className="block mt-2 text-transparent bg-clip-text" style={{
						background: 'linear-gradient(135deg, #BFFF00 0%, #9FDF00 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}>
						Meal Plan
					</span>
				</h1>

				<p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
					Fuel your body with a personalized nutrition plan based on your goals and lifestyle.
				</p>
			</div>

			{/* Stats Cards Row */}
			<div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
				{/* Stat 1 */}
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BFFF00 0%, #9FDF00 100%)' }}>
							<Target size={20} style={{ color: '#1A232D' }} />
						</div>
						<h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">
							Precision
						</h3>
					</div>
					<p className="text-lg lg:text-2xl font-black" style={{ color: '#1A232D' }}>
						Tailored to You
					</p>
				</div>

				{/* Stat 2 */}
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6600 0%, #FF8833 100%)' }}>
							<TrendingUp className="text-white" size={20} />
						</div>
						<h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">
							Progress
						</h3>
					</div>
					<p className="text-lg lg:text-2xl font-black" style={{ color: '#1A232D' }}>
						Track Results
					</p>
				</div>

				{/* Stat 3 */}
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200">
							<Sparkles size={20} style={{ color: '#1A232D' }} />
						</div>
						<h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">
							Science
						</h3>
					</div>
					<p className="text-lg lg:text-2xl font-black" style={{ color: '#1A232D' }}>
						Data-Driven
					</p>
				</div>
			</div>

			{/* Meal Plan Card */}
			<div className="relative overflow-hidden">
				<DailyMealPlanCard userId={user.id} />
			</div>

			{/* Footer Tip Section */}
			<div className="max-w-4xl mx-auto mt-12 relative z-10">
				<div className="p-8 rounded-3xl text-center">
					<div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center">
						<TrendingUp size={24}/>
					</div>
					<h3 className="text-xl font-black mb-2" style={{ color: '#1A232D' }}>
						Pro Tip: Stay Consistent
					</h3>
					<p className="text-gray-600 font-medium text-lg">
						Follow your plan daily and track your progress to achieve your fitness goals faster.
					</p>
				</div>
			</div>
		</div>
	);
}