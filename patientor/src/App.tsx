import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button,
  Divider,
  Container,
  Typography,
  Alert,
  } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient, NewEntry } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>();

  const onClose = (): void => {
    setError(undefined);
  }

  const submitNewEntry = async (entry: NewEntry, id: string) => {
    try {
      const patient = await patientService.addEntry({entry, id });
      setPatients(patients.concat(patient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError('unrecognized axios error');
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Home
          </Button>
          {error && <Alert onClose={onClose} severity="error">{error}</Alert>}
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={<PatientListPage patients={patients} setPatients={setPatients} />}
            />
            <Route
              path="/patients/:id"
              element={
                <PatientPage
                  submitNewEntry={submitNewEntry}
                  diagnoses={diagnoses}/>}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
