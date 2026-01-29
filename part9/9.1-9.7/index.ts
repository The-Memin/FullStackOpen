import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello, World!');
});


app.post('/exercises', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    
    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' });
        return;
    }
    
    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    try {
        const result = calculateExercises(daily_exercises as Array<number>, Number(target));
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(500).send({ error: errorMessage });
    }   
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    try {
        const bmiResult = calculateBmi(height, weight);
        res.send({ weight, height, bmi: bmiResult });
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(500).send({ error: errorMessage });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});