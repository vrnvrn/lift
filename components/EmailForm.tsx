"use client";

import { useState } from "react";
import { exercises, WorkoutData } from "@/lib/exercises";

interface EmailFormProps {
  workoutData: WorkoutData;
  email: string;
  onEmailChange: (email: string) => void;
}

function formatWorkoutEmail(workoutData: WorkoutData): string {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let body = `LIFTING FUNDAMENTALS WORKOUT\n`;
  body += `${date}\n`;
  body += `${"=".repeat(40)}\n\n`;

  exercises.forEach((exercise, index) => {
    const log = workoutData[exercise.id];
    const hasData = log.weight || log.set1Reps || log.set2Reps || log.amrapReps;

    if (hasData) {
      body += `${index + 1}. ${exercise.name.toUpperCase()}\n`;
      if (log.weight) body += `   Weight: ${log.weight}\n`;
      
      const sets = [];
      if (log.set1Reps) sets.push(`Set 1: ${log.set1Reps}`);
      if (log.set2Reps) sets.push(`Set 2: ${log.set2Reps}`);
      if (log.amrapReps) sets.push(`AMRAP: ${log.amrapReps}`);
      if (sets.length > 0) body += `   ${sets.join(" | ")}\n`;

      // Add progression advice
      const amrapNum = parseInt(log.amrapReps) || 0;
      if (amrapNum >= 12) {
        body += `   → Increase weight next time!\n`;
      } else if (amrapNum >= 8) {
        body += `   → Keep the same weight\n`;
      } else if (amrapNum > 0) {
        body += `   → Reduce weight or adjust variation\n`;
      }

      if (log.notes) body += `   Notes: ${log.notes}\n`;
      body += `\n`;
    }
  });

  body += `${"=".repeat(40)}\n`;
  body += `Keep pushing!\n`;

  return body;
}

export default function EmailForm({ workoutData, email, onEmailChange }: EmailFormProps) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendEmail = async () => {
    setSending(true);
    setStatus("idle");
    setErrorMessage("");

    const subject = `Lifting Fundamentals - ${new Date().toLocaleDateString()}`;
    const body = formatWorkoutEmail(workoutData);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, body }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const hasAnyData = Object.values(workoutData).some(
    (log) => log.weight || log.set1Reps || log.set2Reps || log.amrapReps
  );

  const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
        Email Your Workout
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Send yourself a copy of today&apos;s workout summary.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSendEmail}
          disabled={!isValidEmail || !hasAnyData || sending}
          className="px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? "Sending..." : "Send to Email"}
        </button>
      </div>
      
      {status === "success" && (
        <p className="text-sm text-green-600 mt-3">
          ✓ Workout sent to {email}!
        </p>
      )}
      
      {status === "error" && (
        <p className="text-sm text-red-600 mt-3">
          ✗ {errorMessage}
        </p>
      )}
      
      {!hasAnyData && (
        <p className="text-xs text-zinc-500 mt-3">
          Fill in at least one exercise above to enable email.
        </p>
      )}
    </div>
  );
}
