export const ProviderEnum = {
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB',
  FACEBOOK: 'FACEBOOK',
  EMAIL: 'EMAIL',
} as const;

export type ProviderType = keyof typeof ProviderEnum;
