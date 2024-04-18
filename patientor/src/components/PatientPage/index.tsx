import { useParams } from "react-router-dom";
import { Diagnosis, NewEntry, Patient } from "../../types";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "../AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
  submitNewEntry: (entry: NewEntry, id: string) => void;
}

const PatientPage = ({ diagnoses, submitNewEntry }: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(id as string);
      setPatient(patient);
    };
    void fetchPatient();
    
  }, [patient]);

  if (!patient) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>birth: {patient.dateOfBirth}</p>

      <AddEntryForm submitNewEntry={submitNewEntry} />
      <h3>Entries</h3>
      <ul>
        {patient.entries?.map((entry) =>
          <li key={entry.id}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((code) =>
                <li key={code}>{code}:
                  <span>
                    {(diagnoses?.find(d => d.code === code)?.name)}
                  </span>
                </li>
              )}
            </ul>
            <EntryDetails entry={entry} />
          </li>
        )
        }
      </ul>
    </div>
  );
};

export default PatientPage;
