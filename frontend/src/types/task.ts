export interface Task {
  _id: string;
  title: string;
  deadline?: string | null;
  description: string;
  status: boolean;
}
