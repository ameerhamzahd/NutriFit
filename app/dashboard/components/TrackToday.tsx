"use client";

import { useState } from "react";
import { Plus, Minus, Dumbbell, Check, Flame, Droplet, Wheat, Activity } from "lucide-react";

// Mock date utility - replace with your actual implementation
const getBangladeshDate = () => {
	return new Date().toISOString().split('T')[0];
};

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
	return (
		<div className={`fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in z-50`}>
			{type === 'success' ? (
				<Check className="h-5 w-5" />
			) : (
				<Activity className="h-5 w-5" />
			)}
			<span className="font-medium">{message}</span>
		</div>
	);
}

export default function TrackToday({ userId }: { userId: string }) {
	const today = getBangladeshDate();

	const [form, setForm] = useState({
		calories_consumed: null as number | null,
		protein_consumed: null as number | null,
		carbs_consumed: null as number | null,
		fat_consumed: null as number | null,
		workout_completed: false,
		intensity: "Moderate" as const,
		duration_minutes: 30,
	});

	const [isLoading, setIsLoading] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

	const intensityLevels = ["Light", "Moderate", "Intense"];

	const showToast = (message: string, type: 'success' | 'error') => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	};

	// Validation: all nutrient fields must be non-null and >= 0
	const isFormValid = () => {
		const { calories_consumed, protein_consumed, carbs_consumed, fat_consumed } = form;
		return (
			calories_consumed !== null &&
			protein_consumed !== null &&
			carbs_consumed !== null &&
			fat_consumed !== null &&
			calories_consumed >= 0 &&
			protein_consumed >= 0 &&
			carbs_consumed >= 0 &&
			fat_consumed >= 0
		);
	};

	const updateNutrient = (field: string, value: string) => {
		if (value === '') {
			setForm((prev) => ({ ...prev, [field]: null }));
			return;
		}
		const num = Number(value);
		if (isNaN(num)) {
			setForm((prev) => ({ ...prev, [field]: null }));
		} else {
			setForm((prev) => ({ ...prev, [field]: Math.max(0, num) }));
		}
	};

	async function submit() {
		if (!isFormValid()) return;

		setIsLoading(true);

		try {
			// Convert nulls to 0 for API (if backend requires numbers)
			const payload = {
				user_id: userId,
				date: today,
				calories_consumed: form.calories_consumed ?? 0,
				protein_consumed: form.protein_consumed ?? 0,
				carbs_consumed: form.carbs_consumed ?? 0,
				fat_consumed: form.fat_consumed ?? 0,
				workout_completed: form.workout_completed,
				intensity: form.intensity,
				duration_minutes: form.duration_minutes,
			};

			const res = await fetch("/api/track-today", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (res.ok) {
				showToast("Daily tracking saved successfully! 🎉", "success");
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				showToast(data.error || "Failed to save data. Please try again.", "error");
			}
		} catch (error) {
			showToast("Network error. Please check your connection.", "error");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="bg-[#1A232D] text-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl mx-auto">
			{/* Toast Notification */}
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

			{/* Header */}
			<div className="mb-6 pb-4 border-b border-gray-700">
				<h2 className="text-2xl font-bold mb-1">Track Today</h2>
				<p className="text-sm text-gray-400">Log your nutrition and workout progress</p>
			</div>

			{/* Nutrition Section */}
			<div>
				<div className="grid grid-cols-1 gap-4 py-4">
					{/* Calories */}
					<div>
						<label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
							<Flame className="h-4 w-4 text-orange-400" />
							Calories
						</label>
						<div className="flex items-center gap-2">
							<input
								type="number"
								value={form.calories_consumed ?? ''}
								onChange={(e) => updateNutrient('calories_consumed', e.target.value)}
								className="flex-1 bg-[#0f1419] border border-gray-700/50 rounded-lg px-4 py-2.5 text-center text-xl font-bold focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
								placeholder="0"
								min="0"
							/>
						</div>
						<span className="text-xs text-gray-500 mt-2 block text-center">kcal</span>
					</div>

					{/* Protein */}
					<div>
						<label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
							<Droplet className="h-4 w-4 text-blue-400" />
							Protein
						</label>
						<div className="flex items-center gap-2">
							<input
								type="number"
								value={form.protein_consumed ?? ''}
								onChange={(e) => updateNutrient('protein_consumed', e.target.value)}
								className="flex-1 bg-[#0f1419] border border-gray-700/50 rounded-lg px-4 py-2.5 text-center text-xl font-bold focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
								placeholder="0"
								min="0"
							/>
						</div>
						<span className="text-xs text-gray-500 mt-2 block text-center">grams</span>
					</div>

					{/* Carbs */}
					<div>
						<label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
							<Wheat className="h-4 w-4 text-yellow-400" />
							Carbs
						</label>
						<div className="flex items-center gap-2">
							<input
								type="number"
								value={form.carbs_consumed ?? ''}
								onChange={(e) => updateNutrient('carbs_consumed', e.target.value)}
								className="flex-1 bg-[#0f1419] border border-gray-700/50 rounded-lg px-4 py-2.5 text-center text-xl font-bold focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
								placeholder="0"
								min="0"
							/>
						</div>
						<span className="text-xs text-gray-500 mt-2 block text-center">grams</span>
					</div>

					{/* Fat */}
					<div>
						<label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
							<Droplet className="h-4 w-4 text-green-400" />
							Fat
						</label>
						<div className="flex items-center gap-2">
							<input
								type="number"
								value={form.fat_consumed ?? ''}
								onChange={(e) => updateNutrient('fat_consumed', e.target.value)}
								className="flex-1 bg-[#0f1419] border border-gray-700/50 rounded-lg px-4 py-2.5 text-center text-xl font-bold focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
								placeholder="0"
								min="0"
							/>
						</div>
						<span className="text-xs text-gray-500 mt-2 block text-center">grams</span>
					</div>
				</div>
			</div>

			{/* Workout Section */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
					<Dumbbell className="h-5 w-5 text-indigo-400" />
					Workout Details
				</h3>

				{/* Workout Completed Toggle */}
				<div className="mb-4">
					<button
						onClick={() => setForm({ ...form, workout_completed: !form.workout_completed })}
						className={`w-full p-4 rounded-xl border-2 transition-all ${form.workout_completed
							? 'bg-indigo-600/20 border-indigo-500'
							: 'bg-[#252d3d] border-gray-700 hover:border-gray-600'
							}`}
					>
						<div className="flex items-center justify-between">
							<span className="font-medium">Workout Completed Today</span>
							<div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${form.workout_completed
								? 'bg-indigo-600 border-indigo-600'
								: 'border-gray-600'
								}`}>
								{form.workout_completed && <Check className="h-4 w-4" />}
							</div>
						</div>
					</button>
				</div>

				{form.workout_completed && (
					<div className="grid grid-cols-1 gap-4">
						{/* Duration */}
						<div className="bg-[#252d3d] border border-gray-700 rounded-xl p-4">
							<label className="text-sm text-gray-400 block mb-3 font-medium">Duration (minutes)</label>
							<div className="flex items-center gap-3">
								<button
									onClick={() => setForm({ ...form, duration_minutes: Math.max(5, form.duration_minutes - 5) })}
									className="w-9 h-9 bg-[#2d3548] border border-gray-600 rounded-lg hover:bg-[#364050] hover:border-indigo-500 transition-all flex items-center justify-center group"
								>
									<Minus className="h-4 w-4 text-gray-400 group-hover:text-white" />
								</button>
								<div className="flex-1 bg-[#1a1f2e] border border-gray-600 rounded-lg px-4 py-2.5 text-center text-base font-semibold">
									{form.duration_minutes}
								</div>
								<button
									onClick={() => setForm({ ...form, duration_minutes: form.duration_minutes + 5 })}
									className="w-9 h-9 bg-[#2d3548] border border-gray-600 rounded-lg hover:bg-[#364050] hover:border-indigo-500 transition-all flex items-center justify-center group"
								>
									<Plus className="h-4 w-4 text-gray-400 group-hover:text-white" />
								</button>
							</div>
						</div>

						{/* Intensity */}
						<div className="bg-[#252d3d] border border-gray-700 rounded-xl p-4">
							<label className="text-sm text-gray-400 block mb-3 font-medium">Intensity</label>
							<select
								value={form.intensity}
								onChange={(e) => setForm({ ...form, intensity: e.target.value as "Light" | "Moderate" | "Intense" })}
								className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
							>
								{intensityLevels.map((level) => (
									<option key={level} value={level}>{level}</option>
								))}
							</select>
						</div>
					</div>
				)}
			</div>

			{/* Submit Button */}
			<button
				onClick={submit}
				disabled={isLoading || !isFormValid()}
				className={`w-full font-semibold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
					isLoading || !isFormValid()
						? 'bg-gray-600 cursor-not-allowed'
						: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 hover:shadow-indigo-500/50'
				} text-white`}
			>
				{isLoading ? (
					<>
						<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						Saving...
					</>
				) : (
					<>
						<Check className="h-5 w-5" />
						Save Today's Progress
					</>
				)}
			</button>

			<style jsx>{`
				@keyframes slide-in {
					from {
						transform: translateX(100%);
						opacity: 0;
					}
					to {
						transform: translateX(0);
						opacity: 1;
					}
				}
				.animate-slide-in {
					animation: slide-in 0.3s ease-out;
				}
			`}</style>
		</div>
	);
}