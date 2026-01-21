"use client";
import { FaFire } from "react-icons/fa";
import { getBangladeshDate } from "@/lib/dateUtils";

export default function ConsistencyHeatmap({
	history = [],
}: {
	history: any[];
}) {
	// Generate the last 28 days
	const days = Array.from({ length: 28 }, (_, i) => i);

	return (
		<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2">
					<FaFire className="text-orange-500" />
					<h3 className="text-xl sm:text-2xl font-black text-[#1A232D]">
						Consistency Map
					</h3>
				</div>
				<div className="flex gap-4 text-[10px] font-bold uppercase text-gray-400">
					<span className="flex items-center gap-1.5">
						<span className="w-3 h-3 bg-gray-100 rounded-sm"></span> Missed
					</span>
					<span className="flex items-center gap-1.5">
						<span className="w-3 h-3 bg-[#BFFF00] rounded-sm shadow-[0_0_5px_#BFFF00]"></span>
						Tracked
					</span>
				</div>
			</div>

			<div className="flex gap-4">
				{/* Week Labels */}
				<div className="grid grid-rows-4 gap-3 text-[10px] font-bold text-gray-300 uppercase py-1">
					<span>W1</span>
					<span>W2</span>
					<span>W3</span>
					<span>W4</span>
				</div>

				{/* The Heatmap Grid */}
				<div className="flex-1 grid grid-flow-col grid-rows-4 gap-3">
					{days.map((day) => {
						// Use your existing utility to ensure timezone consistency
						// day 0 = today, day 1 = yesterday, etc.
						const dateObj = new Date();
						dateObj.setHours(dateObj.getHours() + 6); // Adjust to BD time
						dateObj.setDate(dateObj.getDate() - day);
						const dateStr = dateObj.toISOString().split("T")[0];

						// Check if a log exists for this specific date string
						// We check calories_consumed > 0 to ensure it's a real entry,
						// not just a pre-generated "Tomorrow" target.
						const log = history.find((h) => h.date === dateStr);
						const isTracked = log && log.calories_consumed > 0;

						return (
							<div
								key={day}
								title={dateStr}
								className={`w-full aspect-square rounded-md transition-all duration-500 
                                    ${
																			isTracked
																				? "bg-[#BFFF00] shadow-[0_0_12px_rgba(191,255,0,0.6)] border border-[#BFFF00]"
																				: "bg-gray-100 border border-gray-200"
																		} hover:scale-110 cursor-help`}
							/>
						);
					})}
				</div>
			</div>

			<p className="mt-6 text-[11px] text-gray-400 font-medium italic">
				* Showing consistency for the last 4 weeks.
			</p>
		</div>
	);
}
