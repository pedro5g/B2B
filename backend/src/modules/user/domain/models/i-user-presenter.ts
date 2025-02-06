import { IUser } from './i-user';

export interface IUserPresenter extends Omit<IUser, 'password'> {}
