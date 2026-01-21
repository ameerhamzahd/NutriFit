"use client";

import { useEffect, useState } from "react";
import { getBangladeshDate } from "@/lib/dateUtils";

export default function TomorrowPlan({ userId }: { userId: string }) {
	const [mealPlan, setMealPlan] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchTomorrowData = async () => {
		setLoading(true);
		const tomorrowStr = getBangladeshDate(1); // Get tomorrow's date string

		try {
			const res = await fetch("/api/meal-plan", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, date: tomorrowStr }),
			});

			const data = await res.json();

			if (res.ok) {
				setMealPlan(data.mealPlan);
			} else {
				setError(data.error || "Failed to load tomorrow's plan");
			}
		} catch (err) {
			setError("Network error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTomorrowData();
	}, [userId]);

	if (loading)
		return (
			<div className="p-6 bg-slate-50 animate-pulse rounded-xl">
				Loading Tomorrow...
			</div>
		);
	if (error) return <div className="p-6 text-red-500">{error}</div>;

	return (
		<div className="bg-orange-50 p-6 rounded-2xl border border-orange-200 shadow-sm">
			<div className="flex justify-between items-start mb-4">
				<div>
					<h2 className="text-xl font-bold text-slate-900">
						Tomorrow's Smart Plan
					</h2>
					<p className="text-xs text-orange-700 font-medium uppercase tracking-wider">
						Predicted for {getBangladeshDate(1)}
					</p>
				</div>
				<div className="bg-orange-200 text-orange-800 text-[10px] px-2 py-1 rounded-full font-bold">
					ADJUSTED
				</div>
			</div>

			{mealPlan ? (
				<div className="space-y-4">
					<div className="flex items-baseline gap-2">
						<span className="text-4xl font-black text-orange-600">
							{mealPlan.calories}
						</span>
						<span className="text-sm font-bold text-slate-500">kcal / day</span>
					</div>

					<div className="grid grid-cols-3 gap-2">
						<div className="bg-white p-2 rounded-lg border border-orange-100 text-center">
							<p className="text-[10px] text-slate-500 uppercase">Protein</p>
							<p className="font-bold text-slate-800">
								{mealPlan.macros.protein_g}g
							</p>
						</div>
						<div className="bg-white p-2 rounded-lg border border-orange-100 text-center">
							<p className="text-[10px] text-slate-500 uppercase">Carbs</p>
							<p className="font-bold text-slate-800">
								{mealPlan.macros.carbs_g}g
							</p>
						</div>
						<div className="bg-white p-2 rounded-lg border border-orange-100 text-center">
							<p className="text-[10px] text-slate-500 uppercase">Fat</p>
							<p className="font-bold text-slate-800">
								{mealPlan.macros.fat_g}g
							</p>
						</div>
					</div>

					<p className="text-[11px] text-slate-600 italic">
						* This plan has been auto-adjusted based on today's tracking.
					</p>
				</div>
			) : (
				<p className="text-slate-500">No plan generated yet.</p>
			)}
		</div>
	);
}
