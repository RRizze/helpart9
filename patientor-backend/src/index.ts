import express from 'express'
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patient';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT: number = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
