"use client";
 
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
 
export default function UpdateProfile() {
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [profile, setProfile] = useState({
		full_name: "",
		phone: "",
		gender: "",
		age: "",
		height_cm: "",
		weight_kg: "",
		fitness_goal: "",
		activity_level: "",
	});
 
	// LOAD PROFILE DATA
	useEffect(() => {
		const getProfile = async () => {
			setLoading(true);
 
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) return;
 
			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", user.id)
				.single();
 
			if (!error && data) {
				setProfile({
					full_name: data.full_name || "",
					phone: data.phone || "",
					gender: data.gender || "",
					age: data.age?.toString() || "",
					height_cm: data.height_cm?.toString() || "",
					weight_kg: data.weight_kg?.toString() || "",
					fitness_goal: data.fitness_goal || "",
					activity_level: data.activity_level || "",
				});
			}
 
			setLoading(false);
		};
 
		getProfile();
	}, []);
 
	const updateField = (field: string, value: string) => {
		setProfile((prev) => ({ ...prev, [field]: value }));
	};
 
	// SAVE PROFILE
	const handleSave = async () => {
		setSaving(true);
 
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) return;
 
		const { error } = await supabase
			.from("profiles")
			.update({
				full_name: profile.full_name,
				phone: profile.phone,
				gender: profile.gender,
				age: parseInt(profile.age),
				height_cm: parseFloat(profile.height_cm),
				weight_kg: parseFloat(profile.weight_kg),
				fitness_goal: profile.fitness_goal,
				activity_level: profile.activity_level,
			})
			.eq("id", user.id);
 
		setSaving(false);
 
		if (error) {
			alert("Failed to update profile.");
		} else {
			alert("Profile updated successfully!");
		}
	};
 
	if (loading) return <p className="text-center py-10">Loading...</p>;
 
	return (
		<div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-xl rounded-xl">
			<h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
 
			<div className="space-y-4">
				<div>
					<Label>Full Name</Label>
					<Input
						value={profile.full_name}
						onChange={(e) => updateField("full_name", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Phone</Label>
					<Input
						value={profile.phone}
						onChange={(e) => updateField("phone", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Gender</Label>
					<Select
						value={profile.gender}
						onValueChange={(v) => updateField("gender", v)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</div>
 
				<div>
					<Label>Age</Label>
					<Input
						type="number"
						value={profile.age}
						onChange={(e) => updateField("age", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Height (cm)</Label>
					<Input
						type="number"
						value={profile.height_cm}
						onChange={(e) => updateField("height_cm", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Weight (kg)</Label>
					<Input
						type="number"
						value={profile.weight_kg}
						onChange={(e) => updateField("weight_kg", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Fitness Goal</Label>
					<Input
						value={profile.fitness_goal}
						onChange={(e) => updateField("fitness_goal", e.target.value)}
					/>
				</div>
 
				<div>
					<Label>Activity Level</Label>
					<Select
						value={profile.activity_level}
						onValueChange={(v) => updateField("activity_level", v)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Select level" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="low">Low</SelectItem>
							<SelectItem value="medium">Medium</SelectItem>
							<SelectItem value="high">High</SelectItem>
						</SelectContent>
					</Select>
				</div>
 
				<Button
					onClick={handleSave}
					disabled={saving}
					className="w-full bg-[#FF6600] hover:bg-[#e75a00]"
				>
					{saving ? "Saving..." : "Save Changes"}
				</Button>
			</div>
		</div>
	);
}