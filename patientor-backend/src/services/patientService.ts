import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  NewEntry,
} from '../types';

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientEntry = (id: string): Patient| undefined => {
  return patientData.find((p) => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient=> {
  const newId: string = uuid();
  const newPatientEntry = {
    id: newId,
    ...entry,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (entry: NewEntry, id: string): Patient => {
  const patient = patientData.find(p => p.id === id);
  const newId: string = uuid();
  const newEntry = {
    id: newId,
    ...entry,
  };
  patient?.entries.push(newEntry);
  return patient as Patient;
}

export default {
  addPatient,
  addEntryToPatient,
  getEntries,
  getNonSensitiveEntries,
  getPatientEntry,
};
