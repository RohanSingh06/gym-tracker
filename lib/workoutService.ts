import { supabase } from "./supabase";

type WorkoutExercise = {
  exercise: string;
  sets: {
    weight: number;
    reps: number;
  }[];
};

export async function saveWorkout(
  userId: number,
  workoutDay: string,
  exercises: WorkoutExercise[]
) {
  try {
    // 1. Create workout
    const { data: workout, error: workoutError } = await supabase
      .from("workouts")
      .insert({
        user_id: userId,
        workout_day: workoutDay,
        workout_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (workoutError) throw workoutError;

    // 2. Save all exercises in parallel
    await Promise.all(
      exercises.map(async (exercise) => {
        const { data: exerciseLog, error: exerciseError } = await supabase
          .from("exercise_logs")
          .insert({
            workout_id: workout.id,
            exercise_name: exercise.exercise,
          })
          .select()
          .single();

        if (exerciseError) throw exerciseError;

        // 3. Save all sets of this exercise in one request
        const sets = exercise.sets.map((set, index) => ({
          exercise_log_id: exerciseLog.id,
          set_number: index + 1,
          weight: set.weight,
          reps: set.reps,
          completed: true,
        }));

        const { error: setError } = await supabase
          .from("set_logs")
          .insert(sets);

        if (setError) throw setError;
      })
    );

    return true;
  } catch (error) {
    console.error("Save Workout Error:", error);
    return false;
  }
}