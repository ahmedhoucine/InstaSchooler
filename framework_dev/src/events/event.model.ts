export interface Event {
  id?: string;
  title: string;
  description: string;
  startDate: Date | null; // Date only
  startTime: string; // Time only
  endDate: Date | null; // Date only
  endTime: string; // Time only
}
