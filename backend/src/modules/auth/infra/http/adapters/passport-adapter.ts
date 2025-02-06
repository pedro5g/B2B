import { IAuthStrategy } from '@/modules/auth/domain/repository/i-auth-strategy';
import { IUserPresenter } from '@/modules/user/domain/models/i-user-presenter';
import { BadRequestException } from '@/shared/exceptions';
import passport from 'passport';

/**
 * @description This is a simple adapter around auth library 'passport'
 */

export class LocalStrategyAdapter implements IAuthStrategy {
  async authenticate(req: Express.Request): Promise<{
    user?: IUserPresenter;
  }> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'local',
        (
          err: Error | null,
          user: Express.User | false,
          info?: { message: string },
        ) => {
          if (err) {
            reject(err);
          }

          if (!user) {
            reject(
              new BadRequestException(
                info?.message || 'Invalid email or password',
              ),
            );
            return;
          }

          req.logIn(user, (err) => {
            if (err) {
              reject(err);
            }
          });
          resolve({ user });
        },
      )(req);
    });
  }
}
