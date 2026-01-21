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
import { Loader2, User, Phone, X } from "lucide-react";

interface UpdateProfileProps {
    onClose?: () => void;
}

export default function UpdateProfile({ onClose }: UpdateProfileProps) {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

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

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

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
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const updateField = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setToast(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("User not authenticated");

            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: profile.full_name,
                    phone: profile.phone,
                    age: profile.age ? parseInt(profile.age, 10) : null,
                    height_cm: profile.height_cm ? parseFloat(profile.height_cm) : null,
                    weight_kg: profile.weight_kg ? parseFloat(profile.weight_kg) : null,
                    fitness_goal: profile.fitness_goal || null,
                    activity_level: profile.activity_level || null,
                })
                .eq("id", user.id);

            if (error) throw error;

            setToast({ type: "success", message: "Profile updated successfully!" });
        } catch (err) {
            console.error("Save error:", err);
            setToast({ type: "error", message: "Failed to update profile" });
        } finally {
            setSaving(false);
            setTimeout(() => setToast(null), 3000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="w-full pb-6">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg text-sm font-medium ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        }`}
                >
                    {toast.message}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                {/* Close Button - Fixed */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4 text-gray-600" />
                    </button>
                )}

                {/* Body */}
                <div className="p-4 space-y-4">
                    {/* Personal Info */}
                    <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-black text-[#1A232D] mb-4 sm:mb-6 flex items-center gap-2">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label htmlFor="full_name" className="text-xs text-gray-600">Full Name</Label>
                                <Input
                                    id="full_name"
                                    value={profile.full_name}
                                    onChange={(e) => updateField("full_name", e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                    placeholder="Alex Johnson"
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-xs text-gray-600">Phone</Label>
                                <div className="relative mt-1">
                                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        className="pl-8 h-9 text-sm"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <Label className="text-xs text-gray-600">Gender</Label>
                                <div className="mt-1 px-3 py-2 rounded-md bg-gray-50 border text-sm text-gray-600">
                                    {profile.gender || "Not specified"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Metrics */}
                    <div className="space-y-3 pt-3 border-t">
                        <h3 className="text-sm font-semibold text-gray-700">Health Metrics</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <Label htmlFor="age" className="text-xs text-gray-600">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={profile.age}
                                    onChange={(e) => updateField("age", e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                    placeholder="28"
                                />
                            </div>

                            <div>
                                <Label htmlFor="height_cm" className="text-xs text-gray-600">Height (cm)</Label>
                                <Input
                                    id="height_cm"
                                    type="number"
                                    min="50"
                                    max="250"
                                    value={profile.height_cm}
                                    onChange={(e) => updateField("height_cm", e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                    placeholder="175"
                                />
                            </div>

                            <div>
                                <Label htmlFor="weight_kg" className="text-xs text-gray-600">Weight (kg)</Label>
                                <Input
                                    id="weight_kg"
                                    type="number"
                                    min="20"
                                    max="300"
                                    step="0.1"
                                    value={profile.weight_kg}
                                    onChange={(e) => updateField("weight_kg", e.target.value)}
                                    className="mt-1 h-9 text-sm"
                                    placeholder="70.5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fitness Goals */}
                    <div className="space-y-3 pt-3 border-t">
                        <h3 className="text-sm font-semibold text-gray-700">Fitness Goals</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs text-gray-600">Fitness Goal</Label>
                                <Select value={profile.fitness_goal} onValueChange={(v) => updateField("fitness_goal", v)}>
                                    <SelectTrigger className="mt-1 h-9 text-sm">
                                        <SelectValue placeholder="Select goal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                                        <SelectItem value="Gain Muscle">Gain Muscle</SelectItem>
                                        <SelectItem value="Maintain Weight">Maintain Weight</SelectItem>
                                        <SelectItem value="Improve Endurance">Improve Endurance</SelectItem>
                                        <SelectItem value="General Fitness">General Fitness</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className="text-xs text-gray-600">Activity Level</Label>
                                <Select value={profile.activity_level} onValueChange={(v) => updateField("activity_level", v)}>
                                    <SelectTrigger className="mt-1 h-9 text-sm">
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sedentary">Sedentary</SelectItem>
                                        <SelectItem value="Lightly Active">Lightly Active</SelectItem>
                                        <SelectItem value="Moderately Active">Moderately Active</SelectItem>
                                        <SelectItem value="Very Active">Very Active</SelectItem>
                                        <SelectItem value="Extremely Active">Extremely Active</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 border-t flex justify-end gap-2">
                    {onClose && (
                        <Button onClick={onClose} variant="outline" className="h-9 px-4 text-sm">
                            Cancel
                        </Button>
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="h-9 px-5 text-sm bg-linear-to-r from-[#1A232D] to-[#FF6600] text-white font-medium"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}