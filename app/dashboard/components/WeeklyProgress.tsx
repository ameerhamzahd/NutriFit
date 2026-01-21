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
import { FaChartLine, FaBolt, FaEgg, FaCalendarCheck } from "react-icons/fa";
import GoalRing from "./GoalRings";
import ConsistencyHeatmap from "./ConsistencyHeatap";

export default function WeeklyProgress({ userId }: { userId: string }) {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchWeeklyData() {
			try {
				// Added timestamp to bust cache
				const res = await fetch(
					`/api/progress?userId=${userId}&t=${Date.now()}`,
				);
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
		return (
			<div className="h-96 animate-pulse bg-gray-50 rounded-3xl mt-8 w-full" />
		);

	// 1. Identify Today vs Future for accurate averages
	const todayStr = new Date().toISOString().split("T")[0];
	const historyUpToToday = data.filter((item) => item.date <= todayStr);

	// 2. Use the LATEST target (from the tomorrow row if it exists)
	const latestEntry = data[data.length - 1];
	const targetCalories = latestEntry?.calories_target || 2000;
	const targetProtein = latestEntry?.protein_target || 150;

	// 3. Calculate Averages only from days that have passed/today
	const totalDays = historyUpToToday.length || 0;
	const avgCalories =
		totalDays > 0
			? Math.round(
					historyUpToToday.reduce(
						(acc, curr) => acc + (curr.calories_consumed || 0),
						0,
					) / totalDays,
				)
			: 0;

	const avgProtein =
		totalDays > 0
			? Math.round(
					historyUpToToday.reduce(
						(acc, curr) => acc + (curr.protein_consumed || 0),
						0,
					) / totalDays,
				)
			: 0;

	return (
		<div className="space-y-6 w-full md:pb-6">
			<div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 w-full">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl sm:text-2xl font-black text-[#1A232D] flex items-center gap-2">
						<FaChartLine className="text-[#BFFF00]" />
						Weekly Performance
					</h2>
					<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
						Last 7-10 Days
					</span>
				</div>

				<div className="h-64 sm:h-72 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={data}
							margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
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
								tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af", dy: 8 }}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 10, fill: "#9ca3af" }}
								width={40}
							/>
							<Tooltip
								contentStyle={{
									borderRadius: "16px",
									border: "none",
									boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
									fontSize: "12px",
								}}
							/>
							{/* This line moves based on your current goal */}
							<ReferenceLine
								y={targetCalories}
								stroke="#1A232D"
								strokeDasharray="3 3"
								label={{
									position: "right",
									value: "Target",
									fill: "#1A232D",
									fontSize: 10,
								}}
							/>
							<Area
								type="monotone"
								dataKey="calories_consumed"
								stroke="#BFFF00"
								strokeWidth={3}
								fillOpacity={1}
								fill="url(#colorCal)"
							/>
							<defs>
								<linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#BFFF00" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#BFFF00" stopOpacity={0} />
								</linearGradient>
							</defs>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				<div className="pt-6 border-t border-gray-50">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						<GoalRing
							current={avgCalories}
							target={targetCalories}
							label="Avg Calories"
							unit="kcal"
							icon={FaBolt}
						/>
						<GoalRing
							current={avgProtein}
							target={targetProtein}
							label="Avg Protein"
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
			</div>

			<div className="w-full">
				{/* Pass the same history data to heatmap */}
				<ConsistencyHeatmap history={data} />
			</div>
		</div>
	);
}
