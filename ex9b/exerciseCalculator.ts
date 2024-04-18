export interface ExerciseInfo {
  periodLength: number;
  target: number;
  trainingDays: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export interface InputExercises {
  target: number;
  dailyHours: number[];
}

export const calculateExercises = (dailyHours: number[], targetHours: number): ExerciseInfo => {
  const trainingDays = dailyHours.reduce((acc, hours) => hours > 0 ? ++acc : acc, 0);
  let rating: number = 0;
  let ratingDescription: string;

  if (trainingDays < targetHours) {
    rating = 1;
    ratingDescription = 'You did less but it is ok';
  } else if (trainingDays === targetHours) {
    rating = 2;
    ratingDescription = 'You\'re on time';
  } else {
    rating = 3;
    ratingDescription = 'You worked hard';
  }

  return {
    periodLength: dailyHours.length,
    target: targetHours,
    trainingDays: trainingDays,
    average: dailyHours.reduce((acc, hours) => acc + hours, 0) / dailyHours.length,
    success: trainingDays >= targetHours,
    rating,
    ratingDescription,
  };
};

export const parseArguments = (dailyHours: string[], target: string): InputExercises => {
  if (dailyHours.length === 0 || Number(target) === 0) throw new Error('Not enough arguments');
  
  dailyHours.forEach(n => {
    if (isNaN(Number(n))) {
      throw new Error('Daily Hours were not numbers');
    }
  });

  if (!isNaN(Number(target))) {
    return {
      target: Number(target),
      dailyHours: dailyHours.map((s => Number(s))),
    };
  } else {
    throw new Error('Provided weight and\\or height were not numbers');
  }
};

//try {
//  const { targetHours, dailyHours } = parseArguments(process.argv);
//  console.log(calculateExercises(dailyHours, targetHours));
//
//} catch (err) {
//  let errorMessage = 'Something bad happened';
//  if (err instanceof Error) {
//    errorMessage += ' Error: ' + err.message;
//  }
//  console.log(errorMessage);
//}

// very 'good' design and TRUE PAUWAA of ts))
//export {};
