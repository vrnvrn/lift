export default function ProgramInfo() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
        The Program
      </h2>
      
      <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            Progressive Overload
          </h3>
          <p className="text-sm">
            The best way to build strength is <strong>progressive overload</strong>: gradually 
            doing a little more over time. This means more weight, more reps, or cleaner reps.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            Your Workout Structure
          </h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>1 warm-up set</strong> at ~50% of your working weight</li>
            <li><strong>3 sets of 10 reps</strong></li>
            <li>On your 3rd (final) set, do <strong>AMRAP</strong> — as many reps as possible with good form</li>
          </ul>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            Progression Rules
          </h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-green-500"></span>
              <span><strong>12+ reps</strong> on AMRAP → Increase weight next time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-blue-500"></span>
              <span><strong>8–11 reps</strong> on AMRAP → Keep the same weight</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-1.5 rounded-full bg-amber-500"></span>
              <span><strong>&lt;8 reps</strong> on AMRAP → Reduce weight or adjust variation</span>
            </li>
          </ul>
        </div>

        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <strong>Rest:</strong> 60–120 seconds between sets (Farmer&apos;s Walks may need 2–3 min).
          </p>
          <p className="mt-1">
            <strong>Frequency:</strong> Do this routine 2–3× per week.
          </p>
        </div>
      </div>
    </div>
  );
}
