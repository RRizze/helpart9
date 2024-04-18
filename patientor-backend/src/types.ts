export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum EntryType {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  type: EntryType;
}

export enum HealthCheckRating {
  Healthy = '0',
  LowRisk = '1',
  HighRisk = '2',
  CriticalRisk = '3',
}

interface HealthCheckEntry extends BaseEntry {
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;

