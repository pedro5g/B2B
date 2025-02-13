import { IAggregateUser } from '@/modules/user/domain/models/i-aggregate-user';
import { ITask } from './i-task';

export interface ITaskWithAssigned extends Omit<ITask, 'assignedId'> {
  project: {
    id: string;
    name: string;
    emoji: string;
  };
  assignedTo: IAggregateUser | null;
}
