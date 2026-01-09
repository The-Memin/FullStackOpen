import { isNotNumber } from "./utils";

type BMICategory = | 'Underweigth' | 'Normal' | 'Overweight' | 'Obesity';

const BMI_LIMITS = {
    UNDERWEIGHT: 18.5,
    NORMAL: 25,
    OVERWEIGHT: 30
} as const

function getBmi(heightCm: number, weight: number): number{    
    const heightM = heightCm / 100
    return weight / (heightM ** 2)
}

function clasifyBMI(bmi: number): BMICategory {
    if (bmi < BMI_LIMITS.UNDERWEIGHT) {
        return 'Underweigth';
    }
    if (bmi < BMI_LIMITS.NORMAL) {
        return 'Normal';
    }
    if (bmi < BMI_LIMITS.OVERWEIGHT) {
        return 'Overweight'
    }
    return 'Obesity'
}

function calculateBmi(height: number, weight: number): String {
    const bmi = getBmi(height, weight)
    const bmiCategory = clasifyBMI(bmi)

    if(bmiCategory === 'Normal') return bmiCategory + ' (healthy weight)'

    return bmiCategory + ' (unhealthy weight)'
}

interface PersonSizes{
    height: number;
    weight: number;
}
const parseArguments = (args: string[]): PersonSizes  => {
    if(args.length < 4 ) throw new Error('Not enough arguments');
    if(args.length > 4 ) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
    const {height, weight} = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch (error) {
    console.log(error.message)
}
