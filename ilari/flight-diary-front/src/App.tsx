import { useEffect, useState } from 'react';
import './App.css';
import { DiaryEntry } from './types';
import { createDiary, getAllDiaries } from './services/diaryService';

const Diary = ({ diary }: { diary: DiaryEntry}) => {
  return (
    <>
      <p>{diary.date}</p>
      <p>{diary.weather}</p>
      <p>{diary.visibility}</p>
      {diary.comment ? <p>{diary.comment}</p> : null}
    </>
  );
};

const Error = ({ error } : { error: string | any }) => {
  console.log(error);
  return (
    <div>{error}</div>
  );
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createDiary({ date, visibility, weather, comment })
      .then(data => setDiaries(diaries.concat(data as DiaryEntry)))
      .catch(err => {
        setError(err.data);
        setTimeout(() => {
          setError(null);
        }, 1500);
      });
  };

  return (
    <section>
      <h1>Add new diary</h1>
      {error ? <Error error={error} /> : null}
      <form onSubmit={onSubmit}>
        <div>
          date
          <input type='date' onChange={(e) => setDate(e.target.value)}/>
        </div>
        <div>
          visibility
          <label htmlFor='visibility-great'>great</label>
          <input
            name='visibility'
            id='visibility-great'
            type='radio'
            onChange={() => setVisibility('great')}
          />
          <label htmlFor='visibility-good'>good</label>
          <input
            name='visibility'
            id='visibility-good'
            type='radio'
            onChange={() => setVisibility('good')}
          />
          <label htmlFor='visibility-ok'>ok</label>
          <input
            name='visibility'
            id='visibility-ok'
            type='radio'
            onChange={() => setVisibility('ok')}
          />
          <label htmlFor='visibility-poor'>poor</label>
          <input
            name='visibility'
            id='visibility-poor'
            type='radio'
            onChange={() => setVisibility('poor')}
          />
        </div>
        <div>
          weather
          <label htmlFor='weather-sunny'>sunny</label>
          <input
            name='weather'
            id='weather-sunny'
            type='radio'
            onChange={() => setWeather('sunny')}
          />
          <label htmlFor='weather-rainy'>rainy</label>
          <input
            name='weather'
            id='weather-rainy'
            type='radio'
            onChange={() => setWeather('rainy')}
          />
          <label htmlFor='weather-cloudy'>cloudy</label>
          <input
            name='weather'
            id='weather-cloudy'
            type='radio'
            onChange={() => setWeather('cloudy')}
          />
          <label htmlFor='weather-stormy'>stormy</label>
          <input
            name='weather'
            id='weather-stormy'
            type='radio'
            onChange={() => setWeather('stormy')}
          />
          <label htmlFor='weather-windy'>windy</label>
          <input
            name='weather'
            id='weather-windy'
            type='radio'
            onChange={() => setWeather('windy')}
          />
        </div>
        <div>
          comment<input onChange={(e) => setComment(e.target.value)}/>
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <ul>
        {diaries?.map(diary =>
          <li key={diary.id}><Diary diary={diary} /></li>
        )
        }
      </ul>
    </section>
  );
}

export default App;
