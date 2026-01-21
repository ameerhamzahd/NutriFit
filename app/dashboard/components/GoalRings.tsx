// app/dashboard/components/GoalRings.tsx

"use client";
import { IconType } from "react-icons";

interface GoalRingProps {
	current: number;
	target: number;
	label: string;
	icon: IconType;
	unit: string;
}

export default function GoalRing({
	current,
	target,
	label,
	icon: Icon,
	unit,
}: GoalRingProps) {
	const percentage = Math.min(Math.round((current / (target || 1)) * 100), 100);
	const radius = 35;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;

	let strokeColor = "#BFFF00";
	if (percentage < 50) strokeColor = "#FF6600";
	if (percentage > 105) strokeColor = "#FF3131";

	return (
		<div className="flex flex-col items-center group">
			<div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-110">
				<svg className="w-full h-full transform -rotate-90">
					<circle
						cx="48"
						cy="48"
						r={radius}
						stroke="#F3F4F6"
						strokeWidth="8"
						fill="transparent"
					/>
					<circle
						cx="48"
						cy="48"
						r={radius}
						stroke={strokeColor}
						strokeWidth="8"
						fill="transparent"
						strokeDasharray={circumference}
						style={{
							strokeDashoffset: offset,
							transition: "stroke-dashoffset 2s ease-in-out",
						}}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<Icon className="text-[#1A232D] opacity-80" size={14} />
					<span className="text-sm font-black text-[#1A232D]">
						{percentage}%
					</span>
				</div>
			</div>
			<div className="mt-3 text-center">
				<p className="text-[10px] font-black uppercase text-gray-400 mb-0.5">
					{label}
				</p>
				<p className="text-[11px] font-bold text-[#1A232D]">
					{current}/{target}
					{unit}
				</p>
			</div>
		</div>
	);
}
