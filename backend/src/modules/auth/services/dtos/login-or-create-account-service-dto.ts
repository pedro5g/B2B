import { IUserWithWorkspace } from '@/modules/user/domain/models/i-user-with-workspace';
import { ProviderType } from '@/shared/enums/account-provider';

export interface LoginOrCreateAccountServiceDTO {
  provider: ProviderType;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}

export interface LoginOrCreateAccountServiceReturnDTO {
  user: IUserWithWorkspace;
}
