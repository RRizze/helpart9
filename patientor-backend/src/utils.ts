import {
  Entry,
  Gender,
  NewPatientEntry,
  NewEntry,
  EntryType,
  Discharge,
  HealthCheckRating,
  SickLeave,
  Diagnosis,
} from "./types";

function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

//function isNumber(value: unknown): value is number {
//  return typeof value === 'number' || value instanceof Number;
//}

function parseName(name: unknown): string {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}

function parseDate(date: unknown): string {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return date;
}

function isGender(gender: string): gender is Gender {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
}

function parseGender(gender: unknown): Gender {
  if(!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
}

function parseSsn(ssn: unknown): string {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
}

function parseOccupation(occupation: unknown): string {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

function isType(type: string): type is EntryType {
  return Object.values(EntryType).map(e => e.toString()).includes(type);
}

function parseType(type: unknown): EntryType {
  if (!isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing name');
  }
  return type;
}

function parseSpecialist(specialist: unknown): string {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
}

function parseDescription(description: unknown): string {
  if (!isString(description)) {
    throw new Error('Incorrect or missing specialist');
  }
  return description;
}

function parseCriteria(criteria: unknown): string {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
}

function isDischarge(discharge: unknown) : discharge is Discharge {
  if(!discharge
    || typeof discharge !== 'object'
    || !('date' in discharge)
    || !('criteria' in discharge)) {
    return false;
  } 

  return true;
}

function parseDischarge(discharge: unknown): Discharge {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing data for Discharge');
  }

  const newDischarge: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };

  return newDischarge;
}

function isHealthCheckRating(rating: string): rating is HealthCheckRating {
  return Object.values(HealthCheckRating).map(r => r as string)
    .includes(rating);
}

function parseHealthCheckRating(rating: unknown): HealthCheckRating {
  if (!isString(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing data for HealthRating');
  }

  return rating;
}

function parseEmployerName(employerName: unknown): string {
  if(!isString(employerName)) {
    throw new Error('Incorrect or missing data for employerName');
  }
  return employerName;
}

function parseSickLeave(sickLeave: unknown): SickLeave {
  if (!sickLeave || typeof sickLeave !== 'object'
    || !('startDate' in sickLeave)
    || !('endDate' in sickLeave)
  ) {
    throw new Error('Incorrect or missing data for SickLeave');
  }

  const newSickLeave: SickLeave = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };

  return newSickLeave;
}
function parseDiagnosisCodes(object: unknown): Array<Diagnosis['code']> {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object
    && 'entries' in object
  ) {
    const newPatientEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: object.entries as Entry[],
    };

    return newPatientEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object'
    || !('type' in object)) {
    throw new Error('Incorrect or missing data');
  }

  switch (object.type as EntryType) {
    case EntryType.Hospital:
      if ('type' in object
        && 'discharge' in object
        && 'description' in object
        && 'date' in object
        && 'specialist' in object
        && 'diagnosisCodes' in object
      ) {
        const newEntry: NewEntry = {
          type: parseType(object.type),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          description: parseDescription(object.description),
          discharge: parseDischarge(object.discharge),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data for Hospital Entry');
      }

    case EntryType.HealthCheck:
      if ('type' in object
        && 'description' in object
        && 'date' in object
        && 'specialist' in object
        && 'healthCheckRating' in object
        && 'diagnosisCodes' in object
      ) {
        const newEntry: NewEntry = {
          type: parseType(object.type),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          description: parseDescription(object.description),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data for HealthCheck Entry');
      }

    case EntryType.OccupationalHealthcare:
      if ('type' in object
        && 'description' in object
        && 'date' in object
        && 'specialist' in object
        && 'employerName' in object
        && 'sickLeave' in object
        && 'diagnosisCodes' in object
      ) {
        const newEntry: NewEntry = {
          type: parseType(object.type),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          description: parseDescription(object.description),
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
          diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        };
        return newEntry;
      } else {
        throw new Error('Incorrect or missing data for HealthCheck Entry');
      }
    default:
      throw new Error('Invalid type of Entry');
  }
};
