// lib/dateUtils.ts
export function getBangladeshDate(offsetDays = 0) {
	const date = new Date();
	// Add or subtract days (useful for calculating "tomorrow")
	date.setDate(date.getDate() + offsetDays);

	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Dhaka",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
}
