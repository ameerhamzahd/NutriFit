// app/dashboard/components/WeeklyProgress.tsx
"use client";
import { useEffect, useState } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts";
import {
	FaChartLine,
	FaCheckCircle,
	FaExclamationCircle,
	FaFire,
	FaBolt,
	FaEgg,
	FaCalendarCheck,
} from "react-icons/fa";
import GoalRing from "./GoalRings";
import ConsistencyHeatmap from "./ConsistencyHeatap";

export default function WeeklyProgress({ userId }: { userId: string }) {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchWeeklyData() {
			try {
				const res = await fetch(`/api/progress?userId=${userId}`);
				const json = await res.json();

				const formattedData = (json.history || []).map((item: any) => ({
					...item,
					displayDate: new Date(item.date).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					}),
				}));

				setData(formattedData);
			} catch (err) {
				console.error("Failed to fetch progress", err);
			} finally {
				setLoading(false);
			}
		}
		fetchWeeklyData();
	}, [userId]);

	if (loading)
		return <div className="h-96 animate-pulse bg-gray-50 rounded-3xl mt-8" />;

	const totalDays = data.length || 0;
	const avgCalories =
		totalDays > 0
			? Math.round(
					data.reduce((acc, curr) => acc + curr.calories_consumed, 0) /
						totalDays,
				)
			: 0;
	const targetCalories = data[0]?.calories_target || 2200;
	const avgProtein =
		totalDays > 0
			? Math.round(
					data.reduce((acc, curr) => acc + (curr.protein_consumed || 0), 0) /
						totalDays,
				)
			: 0;
	const targetProtein = data[0]?.protein_target || 150;

	return (
		<div className="space-y-6 mt-8">
			<div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
				<h2 className="text-2xl font-black text-[#1A232D] mb-8 flex items-center gap-2">
					<FaChartLine className="text-[#BFFF00]" /> Weekly Performance
				</h2>

				<div className="h-72 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="displayDate"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
								dy={10}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 10, fill: "#9ca3af" }}
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "20px",
									border: "none",
									boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
								}}
							/>
							<ReferenceLine
								y={targetCalories}
								stroke="#1A232D"
								strokeDasharray="3 3"
							/>
							<Area
								type="monotone"
								dataKey="calories_consumed"
								stroke="#BFFF00"
								strokeWidth={4}
								fill="#BFFF0033"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				<div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-50">
					<GoalRing
						current={avgCalories}
						target={targetCalories}
						label="Calories"
						unit="kcal"
						icon={FaBolt}
					/>
					<GoalRing
						current={avgProtein}
						target={targetProtein}
						label="Protein"
						unit="g"
						icon={FaEgg}
					/>
					<GoalRing
						current={totalDays}
						target={7}
						label="Streak"
						unit="days"
						icon={FaCalendarCheck}
					/>
				</div>
			</div>

			<ConsistencyHeatmap history={data} />

			<div className="bg-[#1A232D] p-6 rounded-3xl text-white flex items-center gap-5 border-l-8 border-[#BFFF00]">
				<div
					className={`w-14 h-14 rounded-2xl flex items-center justify-center ${avgCalories <= targetCalories ? "bg-[#BFFF00]/20" : "bg-red-500/20"}`}
				>
					{avgCalories <= targetCalories ? (
						<FaCheckCircle className="text-[#BFFF00]" size={28} />
					) : (
						<FaExclamationCircle className="text-red-400" size={28} />
					)}
				</div>
				<div>
					<p className="text-[#BFFF00] font-black uppercase text-[10px] tracking-[0.2em] mb-1">
						System Insight
					</p>
					<p className="text-sm font-medium">
						{avgCalories <= targetCalories
							? "You're hitting your calorie windows perfectly. Keep this pace for optimal results."
							: "Your weekly average is higher than target. We've adjusted your tomorrow plan to compensate."}
					</p>
				</div>
			</div>
		</div>
	);
}
