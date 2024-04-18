import { useParams } from "react-router-dom";
import {
  EntryType,
  HealthCheckRating,
  NewEntry,
  } from "../types";
import { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  } from '@mui/material';

interface Props {
  typeEntry: EntryType;
  patientId: string;
  submitNewEntry: (entry: NewEntry, id: string) => void;
}

// WHAT do you want ICD-9-CM? ICD-10-CM? ???
const CODES: string[] = [
  'S62.5',
  'Z57.1',
  'Z74.3',
  'M51.2',
  'N30.0',
  'L60.1',
];

const EntryForm = ({ typeEntry, patientId, submitNewEntry }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] =
    useState<string[]>([]);
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');

  const handleChangeCodes = (e: SelectChangeEvent<typeof diagnosisCodes>) => {
    const { target: { value }} = e;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value
    );

  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let baseEntry: {[k: string]: any} = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: typeEntry,
    };

    switch (typeEntry) {
      case EntryType.Hospital:
        baseEntry.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        break;
      case EntryType.HealthCheck:
        baseEntry.healthCheckRating = healthCheckRating;
        break;
      case EntryType.OccupationalHealthcare:
        baseEntry.employerName = employerName;
        baseEntry.sickLeave = {
          start: sickLeaveStart,
          end: sickLeaveEnd,
        };
        break;
    }

    submitNewEntry(baseEntry as NewEntry, patientId);
  };

  const partOfForm = () => {
    switch (typeEntry) {
      case EntryType.Hospital:
        return (
          <>
            <p>discharge:</p>
            <TextField
              id='discharge-date-field'
              variant='outlined'
              helperText='date'
              type='date'
              value={dischargeDate}
              size='small'
              sx={{ m: 1, width: '25ch' }}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              id='discharge-criteria-field'
              variant='outlined'
              label='criteria'
              value={dischargeCriteria}
              size='small'
              sx={{ m: 1, width: '25ch' }}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        );
      case EntryType.HealthCheck:
        return (
          <div>
            <TextField
              size='small'
              sx={{ m: 1, width: '25ch' }}
              select
              value={healthCheckRating}
              onChange={(e) =>
                setHealthCheckRating(e.target.value as HealthCheckRating)}
              helperText="Please select health rating"
            >
              <MenuItem
                key={HealthCheckRating.Healthy}
                value={HealthCheckRating.Healthy}
              >
                {HealthCheckRating.Healthy}
              </MenuItem>
              <MenuItem
                key={HealthCheckRating.LowRisk}
                value={HealthCheckRating.LowRisk}
              >
                {HealthCheckRating.LowRisk}
              </MenuItem>
              <MenuItem
                value={HealthCheckRating.HighRisk}
                key={HealthCheckRating.HighRisk}
              >
                {HealthCheckRating.HighRisk}
              </MenuItem>
              <MenuItem
                value={HealthCheckRating.CriticalRisk}
                key={HealthCheckRating.CriticalRisk}
              >
                {HealthCheckRating.CriticalRisk}
              </MenuItem>
            </TextField>
          </div>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <div>
              employerName:
              <input
                type='text'
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </div>
            <div>
              sick Leave:
              <div>
                start date:
                <input
                  type='text'
                  onChange={(e) => setSickLeaveStart(e.target.value)}
                />
              </div>
              <div>
                end date:
                <input
                  type='text'
                  onChange={(e) => setSickLeaveEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      default:
        throw new Error('Invalid entry type');
    }
  };

  return (
    <div>
      <Box
        sx={{display: 'flex', flexDirection: 'column'}}
        component='form' onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id='description-field'
          variant='outlined'
          label='Description'
          value={description}
          size='small'
          sx={{ m: 1, width: '25ch' }}
          onChange={(e) => setDescription(e.target.value)}/>
        <TextField
          id='date-field'
          variant='outlined'
          type='date'
          size='small'
          value={date}
          helperText='date'
          sx={{ m: 1, width: '25ch' }}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          id='specialist-field'
          variant='outlined'
          label='specialist'
          size='small'
          value={specialist}
          sx={{ m: 1, width: '25ch' }}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <Stack
          sx={{}}>
          <InputLabel id='diagnosis-codes'>
            Diagnosis codes
          </InputLabel>
          <Select
            sx={{ m: 1, width: '25ch' }}
            size='small'
            labelId='diagnosis-codes'
            id='diagnosis-codes-select'
            multiple
            value={diagnosisCodes}
            onChange={handleChangeCodes}
            input={<OutlinedInput label='tag' />}
            renderValue={(selected) => selected.join(', ')}
          >
            {CODES?.map((code) => (
              <MenuItem key={code} value={code}>
                <Checkbox checked={diagnosisCodes.indexOf(code) > -1} />
                <ListItemText primary={code} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {partOfForm()}
        <Button variant="outlined"
          color="primary"
          sx={{ m: 1, width: '25ch' }}
          type='submit'>
          add entry
        </Button>
      </Box>
    </div>
  );
};

interface PropsForm {
  submitNewEntry: (entry: NewEntry, id: string) => void;
}
const AddEntryForm = ({ submitNewEntry }: PropsForm) => {
  const [typeEntry, setTypeEntry] = useState<EntryType>(EntryType.Hospital);
  const id = useParams().id;

  return (
    <div>
      <TextField value={typeEntry} select
        name='select-entry'
        size='small'
        sx={{ m: 1, width: '25ch' }}
        onChange={e => setTypeEntry(e.target.value as EntryType)}
        helperText="Please select type entry"
      >
        <MenuItem
          key={EntryType.Hospital}
          value={EntryType.Hospital}>
          {EntryType.Hospital}
        </MenuItem>
        <MenuItem
          key={EntryType.HealthCheck}
          value={EntryType.HealthCheck}>
          {EntryType.HealthCheck}
        </MenuItem>
        <MenuItem
          key={EntryType.OccupationalHealthcare}
          value={EntryType.OccupationalHealthcare}>
          {EntryType.OccupationalHealthcare}
        </MenuItem>
      </TextField>
      <EntryForm
        typeEntry={typeEntry}
        patientId={id as string}
        submitNewEntry={submitNewEntry}
       />
    </div>
  );
};

export default AddEntryForm;
