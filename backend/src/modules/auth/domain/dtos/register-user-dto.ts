export interface RegisterUserDTO {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUserReturnDTO {
  userId: string;
  workspaceId: string;
}
