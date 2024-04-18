"use strict";
;
var parseArguments = function (args) {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
        };
    }
    else {
        throw new Error('Provided weight and\or height were not numbers');
    }
};
var calculateBmi = function (height, weight) {
    if (height === 0)
        throw new Error('Can not divide by zero');
    var bmi = weight / (height * 0.01);
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    }
    else if (bmi >= 16.0 && bmi <= 16.9) {
        return "Underweight (Moderate thinness)";
    }
    else if (bmi >= 17.0 && bmi <= 18.4) {
        return "Underweight (Mild thinness)";
    }
    else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal range";
    }
    else if (bmi >= 25.0 && bmi <= 29.9) {
        return "Overweight (Pre-obese)";
    }
    else if (bmi >= 30.0 && bmi <= 34.9) {
        return "Obese (Class I)";
    }
    else if (bmi >= 35.0 && bmi <= 39.9) {
        return "Obese (Class II)";
    }
    else if (bmi >= 40.0) {
        return "Obese (Class III)";
    }
};
try {
    var _a = parseArguments(process.argv), weight = _a.weight, height = _a.height;
    console.log(calculateBmi(height, weight));
}
catch (err) {
    var errorMessage = 'Something bad happened';
    if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
    }
    console.log(errorMessage);
}
