// app/dashboard/components/ConsistencyHeatap.tsx
"use client";
import { FaFire } from "react-icons/fa";
 
export default function ConsistencyHeatmap({
	history = [],
}: {
	history: any[];
}) {
	const days = Array.from({ length: 28 }, (_, i) => i).reverse();
 
	return (
		<div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center justify-center gap-2">
					<FaFire className="text-orange-500" />
					<h3 className="text-xl sm:text-2xl font-black text-[#1A232D] flex items-center gap-2">
						Consistency Map
					</h3>
				</div>
				<div className="flex gap-2 text-[9px] font-black uppercase text-gray-400">
					<span className="flex items-center gap-1">
						<span className="w-2 h-2 bg-gray-100 rounded-sm"></span> Missed
					</span>
					<span className="flex items-center gap-1">
						<span className="w-2 h-2 bg-[#BFFF00] rounded-sm shadow-[0_0_5px_#BFFF00]"></span>{" "}
						Tracked
					</span>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="grid grid-rows-4 gap-2 text-[8px] font-black text-gray-300 uppercase py-1">
					<span>W1</span>
					<span>W2</span>
					<span>W3</span>
					<span>W4</span>
				</div>
				<div className="flex-1 grid grid-flow-col grid-rows-4 gap-3">
					{days.map((day) => {
						const date = new Date();
						date.setDate(date.getDate() - day);
						const dateStr = date.toISOString().split("T")[0];
						const hasLog = history.some((log) => log.date === dateStr);
						return (
							<div
								key={day}
								title={dateStr}
								className={`w-full aspect-square rounded-sm transition-all duration-300 ${hasLog ? "bg-[#BFFF00] shadow-[0_0_8px_rgba(191,255,0,0.4)]" : "bg-gray-100"}`}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}