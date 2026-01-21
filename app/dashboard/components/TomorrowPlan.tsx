// app/dashboard/components/TomorrowPlan.tsx

"use client";

import { useEffect, useState } from "react";
import {
	FaCalendarPlus,
	FaCheckCircle,
	FaExclamationTriangle,
	FaFireAlt,
	FaDumbbell,
} from "react-icons/fa";

type TomorrowPlanData = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	workoutIntensity: string;
	advice: string;
};

export default function TomorrowPlan({ userId }: { userId: string }) {
	const [plan, setPlan] = useState<TomorrowPlanData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPlan() {
			try {
				const res = await fetch(`/api/tomorrow?userId=${userId}`);
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to fetch plan");
				setPlan(data.tomorrowPlan);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchPlan();
	}, [userId]);

	if (loading)
		return (
			<div className="h-48 animate-pulse bg-gray-100 rounded-3xl mt-8"></div>
		);

	if (error)
		return (
			<div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200 mt-8">
				<p className="text-amber-700 font-medium flex items-center gap-2">
					<FaExclamationTriangle /> {error}
				</p>
			</div>
		);

	if (!plan) return null;

	const isChallengePlan = plan.advice.includes("Perfect day");

	return (
		<div className="bg-[#1A232D] p-8 rounded-3xl shadow-2xl relative overflow-hidden mt-8 text-white border-2 border-gray-800">
			{/* Background Glow - Green for Challenge, Orange for Adjustment */}
			<div
				className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${isChallengePlan ? "bg-[#BFFF00]" : "bg-[#FF6600]"}`}
			/>

			<div className="relative z-10">
				<div className="flex justify-between items-start mb-6">
					<div>
						<div className="flex items-center gap-3 mb-1">
							<FaCalendarPlus className="text-[#BFFF00]" size={20} />
							<h2 className="text-xl sm:text-2xl font-black text-[#EEEEEE] flex items-center gap-2">
								Tomorrow's Strategy
							</h2>
						</div>
						<p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
							{isChallengePlan ? "New Challenge Plan" : "Adjustment Plan"}
						</p>
					</div>
					{isChallengePlan && (
						<div className="bg-[#BFFF00] text-[#1A232D] px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
							<FaCheckCircle /> Goal Met
						</div>
					)}
				</div>

				<div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-6">
					<p className="text-gray-300 text-sm leading-relaxed italic">
						"{plan.advice}"
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="bg-linear-to-br from-white/5 to-transparent p-4 rounded-2xl border border-white/5">
						<div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase mb-2">
							<FaFireAlt className="text-[#FF6600]" /> Target Energy
						</div>
						<p className="text-3xl font-black tracking-tighter">
							{plan.calories}
							<span className="text-sm text-gray-500 ml-1 font-medium uppercase">
								kcal
							</span>
						</p>
					</div>

					<div className="bg-linear-to-br from-white/5 to-transparent p-4 rounded-2xl border border-white/5">
						<div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase mb-2">
							<FaDumbbell className="text-[#BFFF00]" /> Intensity
						</div>
						<p
							className={`text-xl font-black ${isChallengePlan ? "text-[#BFFF00]" : "text-white"}`}
						>
							{plan.workoutIntensity}
						</p>
					</div>
				</div>

				{/* Macro Preview */}
				<div className="mt-6 flex items-center gap-4 text-sm font-bold border-t border-white/5 pt-6">
					<span className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#BFFF00]" />{" "}
						{plan.protein}g P
					</span>
					<span className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#FF6600]" /> {plan.carbs}g
						C
					</span>
					<span className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-gray-500" /> {plan.fat}g F
					</span>
				</div>
			</div>
		</div>
	);
}
