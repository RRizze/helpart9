interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  kind: 'group'
  groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartBaseDescription {
  kind: 'background'
  backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartBaseDescription {
  kind: 'special'
  requirements: string[]
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

