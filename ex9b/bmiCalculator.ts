interface InputBmi {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): InputBmi => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided weight and\\or height were not numbers');
  }
};

export const checkValues = (height: number, weight: number) => {
  if (isNaN(Number(height)) && isNaN(Number(weight))) {
    throw new Error('weight and height must be numbers');
  }

  if (Number(height) === 0 || Number(weight) === 0) {
    throw new Error('weight and height can not be zeros');
  }

  if (Number(height) < 0 || Number(weight) < 0) {
    throw new Error('weight and height can not be negative');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  checkValues(height, weight);

  height = Number(height);
  weight = Number(weight);

  const bmi = weight / (height * 0.01);

  if (bmi < 16.0) {
    return `Underweight (Severe thinness)`;
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return `Underweight (Moderate thinness)`;
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return `Underweight (Mild thinness)`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return `Normal range`;
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return `Overweight (Pre-obese)`;
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return `Obese (Class I)`;
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return `Obese (Class II)`;
  } else {
    return `Obese (Class III)`;
  }
};

//try {
//  const { weight, height} = parseArguments(process.argv);
//  console.log(calculateBmi(height, weight));
//
//} catch (err) {
//  let errorMessage = 'Something bad happened';
//  if (err instanceof Error) {
//    errorMessage += ' Error: ' + err.message;
//  }
//  console.log(errorMessage);
//}

//export {};
