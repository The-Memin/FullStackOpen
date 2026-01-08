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
        return 1
    }
    if (average < target) {
        return 2
    }
    return 3
}

const ratingDescriptions = {
    1 : "estas bien pendejo",
    2 : "not too bad but could be better",
    3 : "You're the best"
} as const

function calculateExercises(exerciseDiary: Array<number>, target: number): Result {
    let trainingDays:number = 0;
    let totalHours:number = 0;

    for (let i = 0; i < exerciseDiary.length; i++) {
        const hoursInDay = exerciseDiary[i];
        if (hoursInDay > 0) {
            trainingDays++;
            totalHours+=hoursInDay
        }
    }
    const average = totalHours / exerciseDiary.length
    const success = average >= 2;
    const rating = calculateRating(average, target)
    return {
        periodLength: exerciseDiary.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescriptions[rating],
        target: target,
        average: average
    }
}

const args = process.argv.slice(2)
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
try {

    const numbers: number[] = args.map( element => {
        if(isNotNumber(element)) throw new Error(`The element "${element}" is not a number`);
        return Number(element)
    })
    console.log(calculateExercises(numbers, 2))
} catch (error) {
    console.log(error.message)
}