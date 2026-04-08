"use client";

import { useState } from "react";

const ACTIVITY_LEVELS = [
  { label: "Sedentary (desk job, little movement)", multiplier: 1.2 },
  { label: "Lightly active (1 to 3 workouts/week)", multiplier: 1.375 },
  { label: "Moderately active (3 to 5 workouts/week)", multiplier: 1.55 },
  { label: "Very active (6 to 7 workouts/week)", multiplier: 1.725 },
  { label: "Athlete / physical job + training", multiplier: 1.9 },
];

function MaintenanceCalculator() {
  const [weight, setWeight] = useState("");
  const [muscleMass, setMuscleMass] = useState("");
  const [fatPct, setFatPct] = useState("");
  const [activityIdx, setActivityIdx] = useState(1);

  const w = parseFloat(weight);
  const mm = parseFloat(muscleMass);
  const fp = parseFloat(fatPct);

  let result: { bmr: number; maintenance: number; deficit: number; protein: { low: number; high: number }; lbm: number } | null = null;

  if (w > 0 && fp >= 0 && fp < 100) {
    const fatMass = w * (fp / 100);
    const lbm = w - fatMass;
    // Katch-McArdle uses lean body mass for accuracy
    const bmr = Math.round(370 + 21.6 * lbm);
    const multiplier = ACTIVITY_LEVELS[activityIdx].multiplier;
    const maintenance = Math.round(bmr * multiplier);
    const deficit = maintenance - 250;
    const protein = { low: Math.round(w * 1.5), high: Math.round(w * 2.2) };
    result = { bmr, maintenance, deficit, protein, lbm: Math.round(lbm * 10) / 10 };
  }

  const inputClass =
    "w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="bg-blue-50 dark:bg-zinc-800/60 rounded-xl border border-blue-100 dark:border-zinc-700 p-5">
      <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">InBody Calculator</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
        Enter the numbers from your InBody printout. Uses the Katch-McArdle formula, which accounts for your lean body mass and is more accurate than height/weight-only formulas.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Skeletal Muscle Mass (kg)
          </label>
          <input
            type="number"
            value={muscleMass}
            onChange={(e) => setMuscleMass(e.target.value)}
            placeholder="30"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Body Fat (%)
          </label>
          <input
            type="number"
            value={fatPct}
            onChange={(e) => setFatPct(e.target.value)}
            placeholder="25"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Activity level
          </label>
          <select
            value={activityIdx}
            onChange={(e) => setActivityIdx(Number(e.target.value))}
            className={inputClass}
          >
            {ACTIVITY_LEVELS.map((l, i) => (
              <option key={i} value={i}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="mt-4 space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Lean body mass</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{result.lbm} kg</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">BMR (at rest, 24h)</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{result.bmr} kcal</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Maintenance (TDEE)</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{result.maintenance} kcal</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Recomp target (~250 deficit)</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{result.deficit} kcal</p>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Daily protein target</p>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {result.protein.low}g to {result.protein.high}g
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Based on 1.5 to 2.2g per kg bodyweight
            </p>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 pt-1">
            These are estimates. Track your actual intake for 2 to 3 weeks and adjust based on real results.
          </p>
        </div>
      )}
    </div>
  );
}

export default function HowToBurn() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-xl font-semibold mb-1 text-zinc-900 dark:text-zinc-100">
          Body Recomposition
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Lose fat and build muscle at the same time. Slower than doing either alone, but sustainable and you keep your strength.
        </p>

        <div className="space-y-5 text-zinc-700 dark:text-zinc-300">
          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Eat enough protein</h3>
            <p className="text-sm">
              Aim for <strong>0.7 to 1g of protein per pound of bodyweight</strong> (1.5 to 2.2g per kg) per day. This is the single most important dietary change you can make. Protein keeps you full, preserves muscle while you lose fat, and helps build new muscle when you train.{" "}
              <a
                href="https://examine.com/guides/protein-intake/?srsltid=AfmBOopY2wVyO5-qRWe0mpa0wc2e6ce6nD6PK0eaEMSi0PgAddhRX-AZ"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Examine guide on protein intake.
              </a>
            </p>
            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
              Example: if you weigh 160 lbs (73 kg), target 110 to 160g of protein per day.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Maintenance calories and how to find yours</h3>
            <p className="text-sm">
              Your <strong>maintenance calories</strong> (also called TDEE, total daily energy expenditure) are how many calories you burn on an average day. Eat at this number and your weight stays the same. Eat below it and you lose fat. Eat above it and you gain.
            </p>
            <p className="text-sm mt-2">
              The most common formula is <strong>Mifflin-St Jeor</strong>, which uses height, weight, age, and sex. It is fine for most people. But if you have an InBody scan, the <strong>Katch-McArdle</strong> formula is more accurate because it uses your actual lean body mass instead of estimating it from height and weight alone. Lean body mass is everything that is not fat: muscle, bone, organs, water. The more lean mass you have, the higher your BMR.
            </p>
            <div className="mt-3 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3 space-y-1 font-mono text-zinc-600 dark:text-zinc-400">
              <p>Lean body mass = weight x (1 - fat% / 100)</p>
              <p>BMR = 370 + (21.6 x lean body mass in kg)</p>
              <p>TDEE = BMR x activity multiplier</p>
            </div>
            <p className="text-sm mt-3 text-zinc-500 dark:text-zinc-400">
              Activity multipliers: sedentary 1.2, lightly active 1.375, moderately active 1.55, very active 1.725. For recomposition, aim for TDEE minus 200 to 300 calories.
            </p>
          </div>

          <MaintenanceCalculator />

          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Slight calorie deficit</h3>
            <p className="text-sm">
              Eat about <strong>200 to 300 calories below your maintenance</strong> level. This is small enough to preserve muscle and energy, but enough to burn fat over time. Aggressive cuts kill your strength and muscle.
            </p>
            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
              If you are new to lifting or returning after a break, you may recomp at maintenance calories.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Muscle raises your metabolism permanently</h3>
            <p className="text-sm">
              Muscle is metabolically expensive. Your body burns calories just to maintain it, 24 hours a day, even while you sleep. This is your <strong>basal metabolic rate (BMR)</strong>, and more muscle means a higher one.
            </p>
            <p className="text-sm mt-2">
              CICO (calories in, calories out) is real and non-negotiable for fat loss. But what most people miss is that building muscle raises the "calories out" side of that equation permanently. A more muscular body needs more food just to maintain itself.
            </p>
            <p className="text-sm mt-2">
              This is why the classic approach of eating very little and doing only cardio tends to backfire. You lose weight, but a large portion of it is muscle. Your BMR drops. You have to eat even less to keep losing. The moment you stop, you gain it back fast because your body now burns fewer calories at rest than before you started.
            </p>
            <p className="text-sm mt-2">
              Building muscle and eating enough protein does the opposite: your maintenance calories go up over time, you have more room to eat, and fat loss becomes easier to sustain without suffering.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Lift heavy and progressively</h3>
            <p className="text-sm">
              Resistance training is what tells your body to hold onto muscle (or build it) while in a deficit. Without it, a calorie deficit just makes you a smaller version of the same shape. <strong>Progressive overload matters here too.</strong>
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">The basics</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span><strong>Protein first.</strong> Build every meal around a protein source. Eggs, chicken, Greek yogurt, cottage cheese, fish, beef, tofu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span><strong>Sleep 7 to 9 hours.</strong> Most fat loss and muscle repair happens while you sleep. Chronic sleep deprivation raises cortisol and stalls recomp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span><strong>Walk more.</strong> Low-intensity movement burns calories without increasing appetite much. 8,000 to 10,000 steps a day adds up significantly over weeks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span><strong>Track for a few weeks.</strong> You do not have to count calories forever. But tracking for 2 to 4 weeks builds awareness of where protein and calories actually come from.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
                <span><strong>Be patient.</strong> Recomp is measured in months, not weeks. The scale might barely move while your body is changing shape significantly.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">How to measure progress</h3>
            <p className="text-sm">
              The scale is a poor proxy. Use a combination of:
            </p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-zinc-600 dark:text-zinc-400">
              <li>How your clothes fit</li>
              <li>Waist, hip, and arm measurements every 2 to 4 weeks</li>
              <li>Progress photos in consistent lighting</li>
              <li>Strength in the gym going up</li>
            </ul>
          </div>

          <div className="text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <p>
              <strong className="text-zinc-700 dark:text-zinc-300">Bottom line:</strong> High protein, slight deficit, lift heavy, sleep well, walk daily. That is it. Everything else is details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
