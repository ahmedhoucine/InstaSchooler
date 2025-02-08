export interface Event {
  id?: string;
  title: string;
  description: string;
  startDate: Date | null; 
  startTime: string; 
  endDate: Date | null; 
  endTime: string; 
}
