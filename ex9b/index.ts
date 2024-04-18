import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { ExerciseInfo, InputExercises, calculateExercises, parseArguments } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = req.query;

  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const bmi: string = calculateBmi(Number(height), Number(weight));
    res.json({ weight, height, bmi });
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: err.message });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const parsed: InputExercises = parseArguments(daily_exercises, target);
    const exerciseInfo: ExerciseInfo = calculateExercises(parsed.dailyHours, parsed.target);
    res.status(200).json(exerciseInfo);
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).json({ error: err.message });
  }
});

const PORT: number = 3003;

app.listen(PORT, () => {
  console.log(`start and listening port: ${PORT}`);
});
