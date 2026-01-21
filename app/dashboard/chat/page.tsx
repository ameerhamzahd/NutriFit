// app/dashboard/chat/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, Copy, ThumbsUp, ThumbsDown, Share, RotateCcw, MoreHorizontal } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	}, [messages]);

	// Auto-resize textarea
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "24px";
			textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
		}
	}, [input]);

	const [lastSentAt, setLastSentAt] = useState<number | null>(null);
	const MIN_INTERVAL_MS = 800;

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

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied to clipboard!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}).catch(() => {
			toast.error("Failed to copy to clipboard", {
				position: "top-right",
				autoClose: 2000,
			});
		});
	};

	const regenerateResponse = async (messageId: string) => {
		const messageIndex = messages.findIndex(m => m.id === messageId);
		if (messageIndex === -1) return;

		// Find the user message before this assistant message
		const userMessage = messages[messageIndex - 1];
		if (!userMessage || userMessage.role !== "user") return;

		// Remove the assistant message
		setMessages(m => m.filter((_, idx) => idx !== messageIndex));

		setError(null);
		setIsSending(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: userMessage.text }),
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

	const formatMessageText = (text: string): React.ReactNode[] => {
		// Split by lines
		const lines = text.split('\n');
		const formatted: React.ReactNode[] = [];

		lines.forEach((line, index) => {
			// Skip empty lines but add spacing
			if (line.trim() === '') {
				formatted.push(<div key={`empty-${index}`} className="h-4" />);
				return;
			}

			// Handle bullet points (*, -, •)
			if (line.trim().match(/^[\*\-•]\s+/)) {
				const content = line.trim().replace(/^[\*\-•]\s+/, '');
				formatted.push(
					<div key={index} className="flex gap-2 mb-2">
						<span className="text-gray-400 mt-1">•</span>
						<span>{processInlineFormatting(content)}</span>
					</div>
				);
				return;
			}

			// Handle numbered lists
			if (line.trim().match(/^\d+\.\s+/)) {
				const match = line.trim().match(/^(\d+)\.\s+(.+)/);
				if (match) {
					formatted.push(
						<div key={index} className="flex gap-2 mb-2">
							<span className="text-gray-400">{match[1]}.</span>
							<span>{processInlineFormatting(match[2])}</span>
						</div>
					);
					return;
				}
			}

			// Regular paragraph
			formatted.push(
				<p key={index} className="mb-2">
					{processInlineFormatting(line)}
				</p>
			);
		});

		return formatted;
	};

	const processInlineFormatting = (text: string): React.ReactNode => {
		const parts: (string | React.ReactElement)[] = [];
		let lastIndex = 0;

		// Match **bold** text
		const boldRegex = /\*\*([^*]+)\*\*/g;
		let match;

		while ((match = boldRegex.exec(text)) !== null) {
			// Add text before the match
			if (match.index > lastIndex) {
				parts.push(text.substring(lastIndex, match.index));
			}
			// Add bold text
			parts.push(
				<strong key={`bold-${match.index}`} className="font-semibold">
					{match[1]}
				</strong>
			);
			lastIndex = match.index + match[0].length;
		}

		// Add remaining text
		if (lastIndex < text.length) {
			parts.push(text.substring(lastIndex));
		}

		return parts.length > 0 ? parts : text;
	};

	// Filter out system messages from display
	const displayMessages = messages.filter(m => m.role !== "system");

	return (
		<div className="flex flex-col min-h-screen">
			{/* Toast Container */}
			<ToastContainer />

			{/* Messages Container */}
			<div
				ref={scrollRef}
				className="flex-1"
			>
				{displayMessages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center px-4">
						<div className="mb-8">
							<h2 className="text-3xl font-semibold mb-2">
								What can I help with?
							</h2>
						</div>
					</div>
				) : (
					<div className="max-w-6xl mx-auto px-4">
						{displayMessages.map((m) => (
							<div key={m.id} className="py-8">
								{m.role === "user" ? (
									<div className="flex justify-end">
										<div className="text-right py- bg-[#1A232D]/5 rounded-full px-3 py-2">
											<div className="text-base font-normal">
												{m.text}
											</div>
										</div>
									</div>
								) : (
									<div>
										<div className="text-base leading-7 mb-4">
											{formatMessageText(m.text)}
										</div>
										{/* Action buttons */}
										<div className="flex gap-2">
											<button
												onClick={() => copyToClipboard(m.text)}
												className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded transition-colors"
												title="Copy"
											>
												<Copy className="w-4 h-4" />
											</button>
											<button
												onClick={() => regenerateResponse(m.id)}
												disabled={isSending}
												className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2f2f2f] rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
												title="Regenerate"
											>
												<RotateCcw className="w-4 h-4" />
											</button>
										</div>
									</div>
								)}
							</div>
						))}

						{/* Loading indicator */}
						{isSending && (
							<div className="py-8">
								<div className="flex gap-1 items-center">
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Input Area */}
			<div className="pb-8 px-4">
				<div className="max-w-6xl mx-auto">
					{error && (
						<div className="mb-3 px-4 py-2 bg-red-900/30 border border-red-700 rounded-lg text-sm text-red-400">
							{error}
						</div>
					)}

					<div className="">
						<div className="flex items-center gap-2 bg-[#2f2f2f] rounded-3xl px-4 py-4 border border-transparent focus-within:border-gray-600">
							<textarea
								ref={textareaRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={onKeyDown}
								placeholder="Ask anything"
								className="flex-1 resize-none border-0 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0"
								rows={1}
								style={{ maxHeight: "200px", minHeight: "24px" }}
								disabled={isSending}
							/>

							<div className="flex items-center gap-2 shrink-0">
								<button
									onClick={sendMessage}
									disabled={isSending || !input.trim()}
									className="w-8 h-8 rounded-full bg-white text-gray-900 hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors flex items-center justify-center"
									aria-label="Send message"
								>
									<Send className="w-4 h-4" />
								</button>
							</div>
						</div>

						<p className="text-xs text-gray-500 mt-3 text-center">
							NutriFit Assistant Coach can make mistakes. Check important info.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}