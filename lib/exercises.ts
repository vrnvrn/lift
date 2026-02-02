export interface Exercise {
  id: string;
  name: string;
  description: string;
  tips: string;
  trackDistance?: boolean; // For farmer's walk
}

export const exercises: Exercise[] = [
  {
    id: "goblet-squat",
    name: "Goblet Squat",
    description: "Hold a dumbbell or kettlebell at chest height, squat down keeping your chest up.",
    tips: "Keep weight in your heels, knees tracking over toes.",
  },
  {
    id: "pushup",
    name: "Push-up",
    description: "Standard push-up from toes or knees. Scale by elevating hands if needed.",
    tips: "Body in a straight line, elbows at 45°. Note your variation (knees, standard, feet elevated).",
  },
  {
    id: "hip-extension",
    name: "Hip Extension",
    description: "Glute bridge or hip thrust. Can add weight or resistance band.",
    tips: "Squeeze glutes at the top, don't hyperextend your lower back.",
  },
  {
    id: "inverted-row",
    name: "Inverted Row",
    description: "Row your body up to a bar or rings. Use underhand or neutral grip.",
    tips: "Keep body straight like a plank. Lower the bar to make it harder.",
  },
  {
    id: "farmers-walk",
    name: "Farmer's Walk",
    description: "Carry heavy weights in each hand and walk. Track distance or time.",
    tips: "Stand tall, shoulders back, take short quick steps. Rest 2-3 min between sets.",
    trackDistance: true,
  },
  {
    id: "shoulder-press",
    name: "One-arm Shoulder Press",
    description: "Press a dumbbell overhead one arm at a time.",
    tips: "Keep core tight, don't lean excessively. Do both arms.",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    description: "Pull the bar down to your chest using a neutral grip.",
    tips: "Lead with your elbows, squeeze shoulder blades together at the bottom.",
  },
];

export interface ExerciseLog {
  weight: string;
  set1Reps: string;
  set2Reps: string;
  amrapReps: string;
  notes: string;
}

export type WorkoutData = Record<string, ExerciseLog>;

export function createEmptyWorkout(): WorkoutData {
  const data: WorkoutData = {};
  exercises.forEach((ex) => {
    data[ex.id] = {
      weight: "",
      set1Reps: "",
      set2Reps: "",
      amrapReps: "",
      notes: "",
    };
  });
  return data;
}

export function getProgressionAdvice(amrapReps: number): { message: string; color: string } {
  if (amrapReps >= 12) {
    return { message: "Increase weight next time!", color: "text-green-600" };
  } else if (amrapReps >= 8) {
    return { message: "Keep the same weight", color: "text-blue-600" };
  } else if (amrapReps > 0) {
    return { message: "Reduce weight or adjust variation", color: "text-amber-600" };
  }
  return { message: "", color: "" };
}
