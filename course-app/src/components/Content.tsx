import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: {parts: CoursePart[]}) => {
  return (
    <ul>
      {parts.map(p =>
        <li ><Part part={p} /></li>
      )}
    </ul>
  );
};

export default Content;
