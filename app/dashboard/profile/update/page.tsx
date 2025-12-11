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
import { Loader2, User, Phone, Ruler, Scale, Target, Zap } from "lucide-react";

export default function UpdateProfile() {
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
          // gender is omitted (read-only)
          age: profile.age ? parseInt(profile.age, 10) : null,
          height_cm: profile.height_cm ? parseFloat(profile.height_cm) : null,
          weight_kg: profile.weight_kg ? parseFloat(profile.weight_kg) : null,
          fitness_goal: profile.fitness_goal || null,
          activity_level: profile.activity_level || null,
        })
        .eq("id", user.id);

      if (error) throw error;

      setToast({ type: "success", message: "✅ Profile updated successfully!" });
    } catch (err) {
      console.error("Save error:", err);
      setToast({ type: "error", message: "❌ Failed to update profile. Please try again." });
    } finally {
      setSaving(false);
      // Auto-dismiss toast after 3s
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium animate-fade-in ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <User className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Update Your Profile</h2>
          </div>
          <p className="mt-1 opacity-90 text-sm">
            Keep your health & fitness details up to date for personalized insights.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Section: Personal Info */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => updateField("full_name", e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g. Alex Johnson"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="pl-10 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-700">Gender</Label>
                <div className="mt-1 flex items-center">
                  <span className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 w-full">
                    {profile.gender || "Not specified"}{" "}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border border-gray-100"></div>

          {/* Section: Health Metrics */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Ruler className="h-4 w-4 text-orange-500" />
              Health Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={profile.age}
                  onChange={(e) => updateField("age", e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="28"
                />
              </div>

              <div>
                <Label htmlFor="height_cm" className="text-sm font-medium text-gray-700">
                  Height (cm)
                </Label>
                <div className="relative mt-1">
                  <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="height_cm"
                    type="number"
                    min="50"
                    max="250"
                    value={profile.height_cm}
                    onChange={(e) => updateField("height_cm", e.target.value)}
                    className="pl-10 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="175"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="weight_kg" className="text-sm font-medium text-gray-700">
                  Weight (kg)
                </Label>
                <div className="relative mt-1">
                  <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="weight_kg"
                    type="number"
                    min="20"
                    max="300"
                    step="0.1"
                    value={profile.weight_kg}
                    onChange={(e) => updateField("weight_kg", e.target.value)}
                    className="pl-10 border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="70.5"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Section: Goals & Lifestyle */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-500" />
              Fitness & Lifestyle
            </h3>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label className="text-sm font-medium text-gray-700">Fitness Goal</Label>
                <Select
                  value={profile.fitness_goal}
                  onValueChange={(v) => updateField("fitness_goal", v)}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                    <SelectValue placeholder="Select your primary goal" />
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
                <Label className="text-sm font-medium text-gray-700">Activity Level</Label>
                <Select
                  value={profile.activity_level}
                  onValueChange={(v) => updateField("activity_level", v)}
                >
                  <SelectTrigger className="mt-1 border-gray-300 focus:ring-orange-500 focus:border-orange-500">
                    <SelectValue placeholder="How active are you daily?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="Lightly Active">Lightly Active (light exercise 1–3 days/week)</SelectItem>
                    <SelectItem value="Moderately Active">Moderately Active (moderate exercise 3–5 days/week)</SelectItem>
                    <SelectItem value="Very Active">Very Active (hard exercise 6–7 days/week)</SelectItem>
                    <SelectItem value="Extremely Active">Extremely Active (very hard exercise & physical job)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
        </div>

        {/* Footer: Save Button */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      {/* Optional: Add subtle fade-in animation for toast */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}