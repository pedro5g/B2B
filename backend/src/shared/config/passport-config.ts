import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import { config } from '.';
import { NotFoundException } from '../exceptions';
import {
  loginOrCreateAccountService,
  verifyUserService,
} from '@/modules/auth/infra/factory';
import { ProviderEnum } from '../enums/account-provider';
import { IUserWithoutPassword } from '@/modules/user/domain/models/i-user';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub, picture } = profile._json;
        if (!sub) {
          throw new NotFoundException('Google ID (sub) is missing');
        }

        const { user } = await loginOrCreateAccountService.execute({
          provider: ProviderEnum.GOOGLE,
          displayName: profile.displayName,
          providerId: sub,
          picture,
          email,
        });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    async (email, password, done) => {
      try {
        const { user } = await verifyUserService.execute({ email, password });
        done(null, user);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Invalid credentials';
        done(e, false, { message });
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: IUserWithoutPassword, done) =>
  done(null, user),
);

export { passport };
