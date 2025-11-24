// app/dashboard/chat/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type Message = {
	id: string;
	role: "user" | "assistant" | "system";
	text: string;
};

export default function ChatPage() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "system-1",
			role: "system",
			text: "You are NutriFit's friendly assistant. Keep answers short and helpful.",
		},
	]);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const scrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [messages]);

	// very simple rate limit: prevent spamming (client-side only)
	const [lastSentAt, setLastSentAt] = useState<number | null>(null);
	const MIN_INTERVAL_MS = 800; // one message every 800ms

	const sendMessage = async () => {
		if (!input.trim()) return;
		if (isSending) return;

		const now = Date.now();
		if (lastSentAt && now - lastSentAt < MIN_INTERVAL_MS) {
			setError("You're sending messages too quickly. Please wait a moment.");
			return;
		}

		setError(null);
		setIsSending(true);
		setLastSentAt(now);

		const userMsg: Message = {
			id: `u-${now}`,
			role: "user",
			text: input.trim(),
		};
		setMessages((m) => [...m, userMsg]);
		setInput("");

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userMsg.text }),
			});

			const body = await res.json();

			if (!res.ok || body?.error) {
				throw new Error(body?.error || "AI provider returned an error");
			}

			const assistantMsg: Message = {
				id: `a-${Date.now()}`,
				role: "assistant",
				text: body.reply,
			};
			setMessages((m) => [...m, assistantMsg]);
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			setError(msg);
			setMessages((m) => [
				...m,
				{
					id: `a-${Date.now()}`,
					role: "assistant",
					text: "Sorry — I couldn't reach the AI right now.",
				},
			]);
		} finally {
			setIsSending(false);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="min-h-screen flex flex-col p-6">
			<h2 className="text-2xl font-semibold mb-4">
				Chat with NutriFit Assistant
			</h2>

			<div
				ref={scrollRef}
				className="flex-1 overflow-auto p-4 border rounded-lg mb-4 bg-white max-h-[60vh]"
				aria-live="polite"
			>
				{messages.map((m) => (
					<div
						key={m.id}
						className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}
					>
						<div
							className={`inline-block px-4 py-2 rounded-lg ${
								m.role === "user" ? "bg-orange-100" : "bg-gray-100"
							}`}
						>
							<p className="whitespace-pre-wrap">{m.text}</p>
						</div>
					</div>
				))}
			</div>

			{error && <p className="text-red-600 mb-2">{error}</p>}

			<div className="flex gap-2">
				<textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={onKeyDown}
					placeholder="Ask something about fitness or the app..."
					className="flex-1 p-3 rounded-md border resize-none h-20"
				/>
				<button
					onClick={sendMessage}
					disabled={isSending}
					className="px-4 py-2 rounded-md bg-orange-600 text-white disabled:opacity-60"
				>
					{isSending ? "Thinking..." : "Send"}
				</button>
			</div>

			<p className="text-xs text-gray-500 mt-2">
				Tip: Press Enter to send (Shift+Enter for newline).
			</p>
		</div>
	);
}
