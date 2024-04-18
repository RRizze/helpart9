import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (err: unknown) {
    let errorMessage = 'Something went wrong';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }

});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;

  if (!id) {
    res.status(404).json({ error: 'Missing or wrong patient id' });
  }

  const patient: Patient= patientService.getPatientEntry(id) as Patient;
  if (!patient) {
    res.status(404).json({ error: 'Patient was not found' });
  }
  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  const id: string = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntryToPatient(newEntry, id);
    res.json(updatedPatient);
  } catch (err: unknown) {
    res.status(404).json({ error: `Patient was not found with id: ${id}`});
  }
});

export default router;
