export interface ILesson {
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}

export function compareLessons(l1:ILesson, l2: ILesson) {
  const compareCourses = l1.courseId - l2.courseId;

  if (compareCourses > 0) {
    return 1;
  }
  else if (compareCourses < 0){
    return -1;
  }
  else {
    return l1.seqNo - l2.seqNo;
  }
}