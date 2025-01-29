export interface EventData {
  _id?: string;
  title: string;
  description: string;
  startDate: string; // ISO string format (YYYY-MM-DD)
  startTime: string; // Time format (HH:mm)
  endDate: string;
  endTime: string;
  studentId?: string;  // Add studentId as an optional property

}
