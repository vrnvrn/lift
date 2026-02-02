"use client";

import { Exercise, ExerciseLog, getProgressionAdvice } from "@/lib/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  log: ExerciseLog;
  onChange: (field: keyof ExerciseLog, value: string) => void;
  index: number;
}

export default function ExerciseCard({ exercise, log, onChange, index }: ExerciseCardProps) {
  const amrapNum = parseInt(log.amrapReps) || 0;
  const advice = getProgressionAdvice(amrapNum);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-5 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="text-zinc-400 dark:text-zinc-600 mr-2">{index + 1}.</span>
            {exercise.name}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {exercise.description}
          </p>
        </div>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-4 italic">
        💡 {exercise.tips}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Weight
          </label>
          <input
            type="text"
            value={log.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="20 kg"
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            {exercise.isFarmersWalk ? "Set 1 (out + back)" : "Set 1"}
          </label>
          <input
            type="text"
            value={log.set1Reps}
            onChange={(e) => onChange("set1Reps", e.target.value)}
            placeholder={exercise.isFarmersWalk ? "20 + 20" : "10"}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            {exercise.isFarmersWalk ? "Set 2 (out + back)" : "Set 2"}
          </label>
          <input
            type="text"
            value={log.set2Reps}
            onChange={(e) => onChange("set2Reps", e.target.value)}
            placeholder={exercise.isFarmersWalk ? "20 + 20" : "10"}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            {exercise.isFarmersWalk ? "Set 3 (out + back)" : "AMRAP (Set 3)"}
          </label>
          <input
            type="text"
            value={log.amrapReps}
            onChange={(e) => onChange("amrapReps", e.target.value)}
            placeholder={exercise.isFarmersWalk ? "20 + 20" : "12+"}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-2">
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
          Notes
        </label>
        <input
          type="text"
          value={log.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Optional: form cues, how it felt, etc."
          className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {advice.message && (
        <p className={`text-sm font-medium mt-3 ${advice.color}`}>
          → {advice.message}
        </p>
      )}
    </div>
  );
}
