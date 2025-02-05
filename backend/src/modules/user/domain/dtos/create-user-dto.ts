export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  profilePictureUrl?: string | null;
  isActive?: boolean;
}
