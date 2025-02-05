import { IUser } from '@/modules/user/domain/models/i-user';
import { ProviderType } from '@/shared/enums/account-provider';

export interface RegisterAccountDTO {
  provider: ProviderType;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}
export interface RegisterAccountReturnDTO extends IUser {}
