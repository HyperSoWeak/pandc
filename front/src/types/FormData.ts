export interface FormData {
  studentName: string;
  schoolGrade: string;
  parentPhone: string;
  branch: string;
  diet: string;
  selectedCourses: Record<number, { transportation: string; location: string }>;
}
