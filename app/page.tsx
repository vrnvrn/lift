"use client";

import { useState } from "react";
import { exercises, createEmptyWorkout, ExerciseLog, WorkoutData } from "@/lib/exercises";
import ProgramInfo from "@/components/ProgramInfo";
import ExerciseCard from "@/components/ExerciseCard";
import EmailForm from "@/components/EmailForm";
import HowToBurn from "@/components/HowToBurn";

type Tab = "how-to-burn" | "workout";

export default function Home() {
  const [tab, setTab] = useState<Tab>("how-to-burn");
  const [workoutData, setWorkoutData] = useState<WorkoutData>(createEmptyWorkout);
  const [email, setEmail] = useState("");

  const handleExerciseChange = (exerciseId: string, field: keyof ExerciseLog, value: string) => {
    setWorkoutData((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Lifting Fundamentals
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            7 movements to build a strong foundation
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl p-1 mb-8">
          <button
            onClick={() => setTab("how-to-burn")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              tab === "how-to-burn"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            How to Burn
          </button>
          <button
            onClick={() => setTab("workout")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              tab === "workout"
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Workout
          </button>
        </div>

        {tab === "how-to-burn" && <HowToBurn />}

        {tab === "workout" && (
          <>
            {/* Program Info */}
            <ProgramInfo />

            {/* Exercise Section */}
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Your Workout
              </h2>

              {exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  log={workoutData[exercise.id]}
                  onChange={(field, value) => handleExerciseChange(exercise.id, field, value)}
                  index={index}
                />
              ))}
            </section>

            {/* Email Form */}
            <EmailForm
              workoutData={workoutData}
              email={email}
              onEmailChange={setEmail}
            />
          </>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Consistency beats intensity. Show up, lift safely, progress slowly.
          </p>
        </footer>
      </div>
    </div>
  );
}
