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
    return (
      <div className="h-96 animate-pulse bg-gray-50 rounded-3xl mt-8 w-full" />
    );

  const totalDays = data.length || 0;
  const avgCalories =
    totalDays > 0
      ? Math.round(
        data.reduce((acc, curr) => acc + curr.calories_consumed, 0) / totalDays
      )
      : 0;
  const targetCalories = data[0]?.calories_target || 2200;
  const avgProtein =
    totalDays > 0
      ? Math.round(
        data.reduce((acc, curr) => acc + (curr.protein_consumed || 0), 0) /
        totalDays
      )
      : 0;
  const targetProtein = data[0]?.protein_target || 150;

  return (
    <div className="space-y-6 w-full md:pb-6">
      {/* Chart Card */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 w-full">
        <h2 className="text-xl sm:text-2xl font-black text-[#1A232D] mb-4 sm:mb-6 flex items-center gap-2">
          <FaChartLine className="text-[#BFFF00]" />
          Weekly Performance
        </h2>

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
                tick={{
                  fontSize: 10,
                  fontWeight: 700,
                  fill: "#9ca3af",
                  dy: 8,
                }}
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
              <ReferenceLine
                y={targetCalories}
                stroke="#1A232D"
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="calories_consumed"
                stroke="#BFFF00"
                strokeWidth={3}
                fill="#BFFF0033"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-6 border-t border-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
      </div>

      <div className="w-full">
        <ConsistencyHeatmap history={data} />
      </div>
    </div>
  );
}