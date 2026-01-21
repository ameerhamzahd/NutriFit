"use client";
import React, { useEffect, useState } from "react";
import DailyWorkoutCard from "../components/workout/DailyWorkoutCard";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { Sparkles, TrendingUp, Target, Dumbbell } from "lucide-react";

export default function WorkoutPlan() {
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
			<div className="min-h-screen flex items-center justify-center ">
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
				<div className="text-center p-8 bg-white rounded-3xl shadow-2xl border-2 border-gray-200 max-w-md">
					<div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6600 0%, #FF8833 100%)' }}>
						<Dumbbell className="text-white" size={32} />
					</div>
					<h2 className="text-2xl font-black mb-2" style={{ color: '#1A232D' }}>
						Authentication Required
					</h2>
					<p className="text-gray-600 text-lg font-medium">
						Please login to view your personalized workout plan.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative pb-12">
			{/* Glow accents */}
			<div className="absolute top-0 right-10 w-80 h-80 rounded-full blur-3xl opacity-10 bg-[#BFFF00]" />
			<div className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl opacity-10 bg-[#FF6600]" />

			{/* Header Section */}
			<div className="max-w-5xl mx-auto text-center relative pb-6">
				<div className="inline-block mb-6">
					<div className="flex items-center gap-3 px-3 py-2 bg-white rounded-full shadow-lg border-2 border-gray-200">
						<Sparkles size={20} style={{ color: '#BFFF00' }} />
						<span className="text-xs font-bold uppercase tracking-wide text-[#1A232D]">
							Personalized For You
						</span>
					</div>
				</div>

				<h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-[#1A232D]">
					Your Daily
					<span className="block mt-2 text-transparent bg-clip-text" style={{
						background: 'linear-gradient(135deg, #BFFF00 0%, #9FDF00 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}>
						Workout Plan
					</span>
				</h1>

				<p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
					A tailored workout routine to help you achieve your fitness goals efficiently and safely.
				</p>
			</div>

			{/* Stats Cards Row */}
			<div className="max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
				{/* Stat 1 */}
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#1A232D]" style={{ background: 'linear-gradient(135deg, #BFFF00 0%, #9FDF00 100%)' }}>
							<Target size={20} />
						</div>
						<h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">
							Focus
						</h3>
					</div>
					<p className="text-lg lg:text-2xl font-black text-[#1A232D]">
						Tailored Workouts
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
					<p className="text-lg lg:text-2xl font-black text-[#1A232D]">
						Track Performance
					</p>
				</div>

				{/* Stat 3 */}
				<div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl">
					<div className="flex items-center gap-3 mb-2">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-200 text-[#1A232D]">
							<Dumbbell size={20} />
						</div>
						<h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-gray-500">
							Strength
						</h3>
					</div>
					<p className="text-lg lg:text-2xl font-black text-[#1A232D]">
						Build Muscle
					</p>
				</div>
			</div>

			{/* Workout Card */}
			<div className="relative overflow-hidden">
				<DailyWorkoutCard userId={user.id} />
			</div>

			{/* Footer Tip Section */}
			<div className="max-w-11/12 mx-auto mt-12 relative">
				<div className=" p-8 rounded-3xl text-center">
					<div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center text-[#1A232D]">
						<TrendingUp size={24} />
					</div>
					<h3 className="text-xl font-black mb-2 text-[#1A232D]">
						Pro Tip: Stay Consistent
					</h3>
					<p className="text-gray-600 font-medium text-lg">
						Follow your workout plan daily and progressively increase intensity to maximize results.
					</p>
				</div>
			</div>
		</div>
	);
}
