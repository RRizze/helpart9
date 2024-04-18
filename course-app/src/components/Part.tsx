import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {

  switch (part.kind) {
    case 'basic': {
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
        </div>
      );
    }
    case 'group': {
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>groupProjectCount: {part.groupProjectCount}</p>
        </div>
      );
    }
    case 'background': {
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>backgroundMaterial: {part.backgroundMaterial}</p>
        </div>
      );
    }
    case 'special': {
      return (
        <div>
          <p>name: {part.name}</p>
          <p>exerciseCount: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <div>
            requirements: {part.requirements.map(r => <p>{r}</p>)}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};

export default Part;
