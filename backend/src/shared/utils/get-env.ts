import { env, EnvType } from '../env';

type Keys = keyof EnvType;

export function getEnv<Key extends Keys>(key: Key, value?: (typeof env)[Key]) {
  if (value) {
    return value;
  }
  return env[key];
}
