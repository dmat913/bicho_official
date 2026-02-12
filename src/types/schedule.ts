export interface ScheduleData {
  _id: string;
  date: Date | string;
  title: string;
  description: string;
  teamName: string;
  thumbnail: string;
  location: string;
  result: string;
  pk: string;
  kickoffTime: string;
  scorer: string[];
}
