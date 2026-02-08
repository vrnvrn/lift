"use client";

import { useState } from "react";
import { exercises, WorkoutData, parseFarmersWalkSteps } from "@/lib/exercises";

interface EmailFormProps {
  workoutData: WorkoutData;
  email: string;
  onEmailChange: (email: string) => void;
}

function formatWorkoutSummary(workoutData: WorkoutData): string {
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
    
    // Check if there's any data for this exercise
    const hasStandardData = log.weight || log.set1Reps || log.set2Reps || log.amrapReps;
    const hasShoulderPressData = exercise.isShoulderPress && (
      log.leftWeight || log.rightWeight || 
      log.set1RepsLeft || log.set1RepsRight ||
      log.set2RepsLeft || log.set2RepsRight ||
      log.amrapRepsLeft || log.amrapRepsRight
    );
    const hasWarmupData = log.warmupWeight || log.warmupReps;
    const hasData = hasStandardData || hasShoulderPressData || hasWarmupData;

    if (hasData) {
      body += `${index + 1}. ${exercise.name.toUpperCase()}\n`;
      
      // Warmup data
      if (hasWarmupData) {
        const warmupParts = [];
        if (log.warmupWeight) warmupParts.push(`Weight: ${log.warmupWeight}`);
        if (log.warmupReps) warmupParts.push(`Reps: ${log.warmupReps}`);
        body += `   Warmup: ${warmupParts.join(", ")}\n`;
      }
      
      // Shoulder press - special left/right format
      if (exercise.isShoulderPress && hasShoulderPressData) {
        // Left arm
        const hasLeftData = log.leftWeight || log.set1RepsLeft || log.set2RepsLeft || log.amrapRepsLeft;
        if (hasLeftData) {
          body += `   LEFT ARM:\n`;
          if (log.leftWeight) body += `      Weight: ${log.leftWeight}\n`;
          const leftSets = [];
          if (log.set1RepsLeft) leftSets.push(`Set 1: ${log.set1RepsLeft}`);
          if (log.set2RepsLeft) leftSets.push(`Set 2: ${log.set2RepsLeft}`);
          if (log.amrapRepsLeft) leftSets.push(`AMRAP: ${log.amrapRepsLeft}`);
          if (leftSets.length > 0) body += `      ${leftSets.join(" | ")}\n`;
          
          // Left arm progression advice
          const leftAmrap = parseInt(log.amrapRepsLeft || "") || 0;
          if (leftAmrap >= 12) {
            body += `      → Increase weight next time!\n`;
          } else if (leftAmrap >= 8) {
            body += `      → Keep the same weight\n`;
          } else if (leftAmrap > 0) {
            body += `      → Reduce weight or adjust variation\n`;
          }
        }
        
        // Right arm
        const hasRightData = log.rightWeight || log.set1RepsRight || log.set2RepsRight || log.amrapRepsRight;
        if (hasRightData) {
          body += `   RIGHT ARM:\n`;
          if (log.rightWeight) body += `      Weight: ${log.rightWeight}\n`;
          const rightSets = [];
          if (log.set1RepsRight) rightSets.push(`Set 1: ${log.set1RepsRight}`);
          if (log.set2RepsRight) rightSets.push(`Set 2: ${log.set2RepsRight}`);
          if (log.amrapRepsRight) rightSets.push(`AMRAP: ${log.amrapRepsRight}`);
          if (rightSets.length > 0) body += `      ${rightSets.join(" | ")}\n`;
          
          // Right arm progression advice
          const rightAmrap = parseInt(log.amrapRepsRight || "") || 0;
          if (rightAmrap >= 12) {
            body += `      → Increase weight next time!\n`;
          } else if (rightAmrap >= 8) {
            body += `      → Keep the same weight\n`;
          } else if (rightAmrap > 0) {
            body += `      → Reduce weight or adjust variation\n`;
          }
        }
      } else if (hasStandardData) {
        // Standard exercise format
        if (log.weight) body += `   Weight: ${log.weight}\n`;
        
        const sets = [];
        if (log.set1Reps) sets.push(`Set 1: ${log.set1Reps}`);
        if (log.set2Reps) sets.push(`Set 2: ${log.set2Reps}`);
        if (log.amrapReps) sets.push(exercise.isFarmersWalk ? `Set 3: ${log.amrapReps}` : `AMRAP: ${log.amrapReps}`);
        if (sets.length > 0) body += `   ${sets.join(" | ")}\n`;

        // Add progression advice
        if (exercise.isFarmersWalk) {
          // Farmer's Walk uses 40+ total steps logic
          const total1 = parseFarmersWalkSteps(log.set1Reps);
          const total2 = parseFarmersWalkSteps(log.set2Reps);
          const total3 = parseFarmersWalkSteps(log.amrapReps);
          
          if (total1 >= 40 && total2 >= 40 && total3 >= 40) {
            body += `   → Increase weight next time!\n`;
          } else if (total1 > 0 || total2 > 0 || total3 > 0) {
            body += `   → Keep the same weight until all sets are 40+ steps\n`;
          }
        } else {
          // Standard AMRAP-based progression
          const amrapNum = parseInt(log.amrapReps) || 0;
          if (amrapNum >= 12) {
            body += `   → Increase weight next time!\n`;
          } else if (amrapNum >= 8) {
            body += `   → Keep the same weight\n`;
          } else if (amrapNum > 0) {
            body += `   → Reduce weight or adjust variation\n`;
          }
        }
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
  const [copied, setCopied] = useState(false);

  const hasAnyData = Object.values(workoutData).some(
    (log) => log.weight || log.set1Reps || log.set2Reps || log.amrapReps ||
      log.warmupWeight || log.warmupReps ||
      log.leftWeight || log.rightWeight ||
      log.set1RepsLeft || log.set1RepsRight ||
      log.set2RepsLeft || log.set2RepsRight ||
      log.amrapRepsLeft || log.amrapRepsRight
  );

  const summary = formatWorkoutSummary(workoutData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEmailClick = () => {
    const subject = `Lifting Fundamentals - ${new Date().toLocaleDateString()}`;
    const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
    window.location.href = mailtoLink;
  };

  if (!hasAnyData) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mt-8">
        <h2 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          Your Workout Summary
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fill in at least one exercise above to see your summary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Your Workout Summary
        </h2>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      
      <textarea
        readOnly
        value={summary}
        className="w-full h-64 px-4 py-3 text-sm font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none resize-none"
      />

      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          Or email it to yourself:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleEmailClick}
            disabled={!email}
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Open in Email
          </button>
        </div>
      </div>
    </div>
  );
}
