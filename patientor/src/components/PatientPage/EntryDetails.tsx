import {
  Entry,
  EntryType,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalView entry={entry as HospitalEntry} />;
    case EntryType.HealthCheck:
      return <HealthCheckView entry={entry as HealthCheckEntry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareView entry={entry as OccupationalHealthcareEntry} />;
    default:
      throw new Error('There is no entry in the current union'); 
  }
};

const HospitalView: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <h4>Discharge</h4>
      <p>date: {entry.discharge.date}</p>
      <p>criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

const HealthCheckView: React.FC<{ entry: HealthCheckEntry }> =
({ entry }) => {
  let color = '';
  switch (entry.healthCheckRating) {
    case '0':
      color = 'green';
      break;
    case '1':
      color = 'yellow';
      break;
    case '2':
      color = 'orange';
      break;
    case '3':
      color = 'red';
      break;
    default:
      break;
  };
  return (
    <div>
      <p>Health rating:
        <span
          style={{
            'backgroundColor': color, display: 'inline-block',
            'padding': '0.25em',
          }}>
          {entry.healthCheckRating}
        </span>
      </p>
    </div>
  );
};

const OccupationalHealthcareView: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <p>Employer: {entry.employerName}</p>
      {entry?.sickLeave && (
        <>
          <p>{entry.sickLeave.startDate}</p>
          <p>{entry.sickLeave.endDate}</p>
        </>
      )}
    </div>
  );
};

export default EntryDetails;
