export const ExitStatus = {
  FAILURE: 1,
  SUCCESS: 0,
} as const;

export type ExitStatusType = keyof typeof ExitStatus;
