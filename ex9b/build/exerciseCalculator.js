"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var calculateExercises = function (dailyHours, targetHours) {
    var trainingDays = dailyHours.reduce(function (acc, hours) { return hours > 0 ? ++acc : acc; }, 0);
    var rating = 0;
    var ratingDescription;
    if (trainingDays < targetHours) {
        rating = 1;
        ratingDescription = 'You did less but it is ok';
    }
    else if (trainingDays === targetHours) {
        rating = 2;
        ratingDescription = 'You\'re on time';
    }
    else {
        rating = 3;
        ratingDescription = 'You worked hard';
    }
    return {
        periodLength: dailyHours.length,
        target: targetHours,
        trainingDays: trainingDays,
        average: dailyHours.reduce(function (acc, hours) { return acc + hours; }, 0) / dailyHours.length,
        success: trainingDays >= targetHours,
        rating: rating,
        ratingDescription: ratingDescription,
    };
};
var parseArguments = function (args) {
    if (args.length < 3)
        throw new Error('Not enough arguments');
    var potentialNums = args.slice(3);
    potentialNums.forEach(function (n) {
        if (isNaN(Number(n))) {
            throw new Error('Hours were not numbers');
        }
    });
    if (!isNaN(Number(args[2]))) {
        return {
            targetHours: Number(args[2]),
            dailyHours: potentialNums.map((function (s) { return Number(s); })),
        };
    }
    else {
        throw new Error('Provided weight and\or height were not numbers');
    }
};
try {
    var _a = parseArguments(process.argv), targetHours = _a.targetHours, dailyHours = _a.dailyHours;
    console.log(calculateExercises(dailyHours, targetHours));
}
catch (err) {
    var errorMessage = 'Something bad happened';
    if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
    }
    console.log(errorMessage);
}
