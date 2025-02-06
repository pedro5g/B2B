import { IAggregateUser } from '@/modules/user/domain/models/i-aggregate-user';
import { ITask } from './i-task';

export interface ITaskWithAssigned extends Omit<ITask, 'assignedId'> {
  assignedTo: IAggregateUser | null;
}
