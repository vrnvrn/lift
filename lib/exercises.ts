export interface Exercise {
  id: string;
  name: string;
  description: string;
  tips: string;
  isFarmersWalk?: boolean; // Special handling for steps format
  isShoulderPress?: boolean; // Special handling for left/right arms
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
    description: "Carry heavy weights in each hand. Walk 20 steps out, 20 steps back per set.",
    tips: "Stand tall, shoulders back, take short quick steps. Rest 2-3 min between sets.",
    isFarmersWalk: true,
  },
  {
    id: "shoulder-press",
    name: "One-arm Shoulder Press",
    description: "Press a dumbbell overhead one arm at a time.",
    tips: "Keep core tight, don't lean excessively. Do both arms.",
    isShoulderPress: true,
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    description: "Pull the bar down to your chest using a neutral grip.",
    tips: "Lead with your elbows, squeeze shoulder blades together at the bottom.",
  },
];

export interface ExerciseLog {
  warmupWeight: string;
  warmupReps: string;
  weight: string;
  set1Reps: string;
  set2Reps: string;
  amrapReps: string;
  notes: string;
  // Shoulder press left/right fields
  leftWeight?: string;
  rightWeight?: string;
  set1RepsLeft?: string;
  set1RepsRight?: string;
  set2RepsLeft?: string;
  set2RepsRight?: string;
  amrapRepsLeft?: string;
  amrapRepsRight?: string;
}

export type WorkoutData = Record<string, ExerciseLog>;

export function createEmptyWorkout(): WorkoutData {
  const data: WorkoutData = {};
  exercises.forEach((ex) => {
    data[ex.id] = {
      warmupWeight: "",
      warmupReps: "",
      weight: "",
      set1Reps: "",
      set2Reps: "",
      amrapReps: "",
      notes: "",
      // Shoulder press left/right fields
      leftWeight: "",
      rightWeight: "",
      set1RepsLeft: "",
      set1RepsRight: "",
      set2RepsLeft: "",
      set2RepsRight: "",
      amrapRepsLeft: "",
      amrapRepsRight: "",
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

// Parse "X+Y" format and return total, or just the number if no "+"
export function parseFarmersWalkSteps(value: string): number {
  if (!value) return 0;
  // Handle "X+Y" format
  if (value.includes("+")) {
    const parts = value.split("+").map(p => parseInt(p.trim()) || 0);
    return parts.reduce((sum, n) => sum + n, 0);
  }
  return parseInt(value) || 0;
}

export function getFarmersWalkAdvice(set1: string, set2: string, set3: string): { message: string; color: string } {
  const total1 = parseFarmersWalkSteps(set1);
  const total2 = parseFarmersWalkSteps(set2);
  const total3 = parseFarmersWalkSteps(set3);
  
  // All sets should have 40+ total steps to recommend increasing weight
  if (total1 >= 40 && total2 >= 40 && total3 >= 40) {
    return { message: "Increase weight next time!", color: "text-green-600" };
  } else if (total1 > 0 || total2 > 0 || total3 > 0) {
    return { message: "Keep the same weight until all sets are 40+ steps", color: "text-blue-600" };
  }
  return { message: "", color: "" };
}
