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

const DEFAULT_WEIGHT = 70
const DEFAULT_HEIGHT = 170
const args = process.argv.slice(2)

try {
    if(isNotNumber(args[0])) throw new Error(`The Height "${args[0]}" is not a number`)
    if(isNotNumber(args[1])) throw new Error(`The Weight "${args[1]}" is not a number`)
    const height = args[0] ? Number(args[0]) : DEFAULT_HEIGHT;
    const weight = args[1] ? Number(args[1]) : DEFAULT_WEIGHT;
    console.log(calculateBmi(height, weight))
} catch (error) {
    console.log(error.message)
}
