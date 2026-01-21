// app/dashboard/components/TrackToday.tsx
 
"use client";
 
import { useState } from "react";
import { getBangladeshDate } from "@/lib/dateUtils";
 
export default function TrackToday({ userId }: { userId: string }) {
	const today = getBangladeshDate();
 
	const [form, setForm] = useState({
		calories_consumed: 0,
		protein_consumed: 0,
		carbs_consumed: 0,
		fat_consumed: 0,
		workout_completed: false,
		intensity: "Moderate",
		duration_minutes: 30,
	});
 
	const [message, setMessage] = useState("");
 
	async function submit() {
		setMessage("Saving...");
 
		const res = await fetch("/api/track-today", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: userId,
				date: today,
				...form,
			}),
		});
 
		const data = await res.json();
		setMessage(res.ok ? "Saved successfully" : data.error);
	}
 
	return (
		<div className="bg-white p-6 rounded-xl shadow">
			<h2 className="text-xl font-bold mb-4">Track Today</h2>
 
			{[
				"calories_consumed",
				"protein_consumed",
				"carbs_consumed",
				"fat_consumed",
			].map((f) => (
				<input
					key={f}
					type="number"
					className="border p-2 mb-2 w-full"
					placeholder={f.replace("_", " ")}
					onChange={(e) => setForm({ ...form, [f]: Number(e.target.value) })}
				/>
			))}
 
			<label className="block my-2">
				<input
					type="checkbox"
					onChange={(e) =>
						setForm({ ...form, workout_completed: e.target.checked })
					}
				/>{" "}
				Workout Completed
			</label>
 
			<button
				onClick={submit}
				className="bg-black text-white px-4 py-2 rounded"
			>
				Save Today
			</button>
 
			<p className="mt-2 text-sm">{message}</p>
		</div>
	);
}