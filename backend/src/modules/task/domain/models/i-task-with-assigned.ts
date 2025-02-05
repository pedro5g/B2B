import { ShortUserInfo } from '@/modules/user/domain/models/short-user';
import { ITask } from './i-task';

export interface ITaskWithAssigned extends Omit<ITask, 'assignedId'> {
  assignedTo: ShortUserInfo | null;
}
