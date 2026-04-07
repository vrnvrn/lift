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
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Slight calorie deficit</h3>
            <p className="text-sm">
              Eat about <strong>200 to 300 calories below your maintenance</strong> level. This is small enough to preserve muscle and energy, but enough to burn fat over time. Aggressive cuts kill your strength and muscle.
            </p>
            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
              If you are new to lifting or returning after a break, you may recomp at maintenance calories.
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
