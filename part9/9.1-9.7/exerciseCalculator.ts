import { isNotNumber } from "./utils";

type Rating = 1 | 2 | 3;

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateRating(average:number, target:number):Rating {
    if (average < target / 2) {
        return 1;
    }
    if (average < target) {
        return 2;
    }
    return 3;
}

const ratingDescriptions = {
    1 : "estas bien pendejo",
    2 : "not too bad but could be better",
    3 : "You're the best"
} as const;

function calculateExercises(exerciseDiary: Array<number>, target: number): Result {
    let trainingDays:number = 0;
    let totalHours:number = 0;

    for (let i = 0; i < exerciseDiary.length; i++) {
        const hoursInDay = exerciseDiary[i];
        if (hoursInDay > 0) {
            trainingDays++;
            totalHours+=hoursInDay;
        }
    }
    const average = totalHours / exerciseDiary.length;
    const success = average >= 2;
    const rating = calculateRating(average, target);
    return {
        periodLength: exerciseDiary.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescriptions[rating],
        target: target,
        average: average
    };
}

const parseArguments = (args: string[]): number[] => {
    if (args.length < 3) throw new Error('Not enough arguments');
    const args_sliced = args.slice(2);
    const numbers: number[] = args_sliced.map( element => {
        if(isNotNumber(element)) throw new Error(`The element "${element}" is not a number`);
        return Number(element);
    });
    return numbers;
};

try {
    const numbers = parseArguments(process.argv);
    console.log(calculateExercises(numbers, 2));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}