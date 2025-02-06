import { IUserPresenter } from './i-user-presenter';

export interface IUserWithWorkspace
  extends Omit<IUserPresenter, 'currentWorkspace'> {
  currentWorkspace: {
    id: string;
    name: string;
    ownerId: string;
    inviteCode: string;
  };
}
