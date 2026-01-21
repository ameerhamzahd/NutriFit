// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
	process.env.GEMINI_API_URL ||
	"https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY) {
	throw new Error("Missing GEMINI_API_KEY env var");
}

type Body = { message?: string };

export async function POST(req: NextRequest) {
	try {
		const { message } = (await req.json()) as Body;

		if (!message || typeof message !== "string") {
			return NextResponse.json(
				{ error: "Missing `message` in body" },
				{ status: 400 }
			);
		}

		
		const userMessage = message.trim().slice(0, 2000);

		
		const url = `${GEMINI_API_URL}/${encodeURIComponent(
			GEMINI_MODEL
		)}:generateContent`;

		const payload = {
			contents: [
				{
					parts: [{ text: userMessage }],
				},
			],
			
		};

		const resp = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-goog-api-key": GEMINI_API_KEY,
			} as Record<string, string>,
			body: JSON.stringify(payload),
		});

		if (!resp.ok) {
			const text = await resp.text();
			console.error("Gemini error:", resp.status, text);
			return NextResponse.json({ error: "AI provider error" }, { status: 502 });
		}

		const data = await resp.json();
        type GeminiPart = { text?: string };
		// According to docs: response.candidates[0].content.parts[0].text
		const candidate = data?.candidates?.[0];
		const contentPartText =
			candidate?.content?.parts?.[0]?.text ??
			(Array.isArray(candidate?.content?.parts)
				? (candidate.content.parts as GeminiPart[])
						.map((p) => p.text ?? "")
						.join(" ")
				: null);

            
		if (!contentPartText) {
			console.warn("No text found in Gemini response", data);
			return NextResponse.json(
				{ error: "No response from AI" },
				{ status: 502 }
			);
		}

		// Final sanitization: trim and limit length
		const aiReply = String(contentPartText).trim().slice(0, 5000);

		return NextResponse.json({ reply: aiReply });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "Unknown server error";
		console.error("Chat API error:", message);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
