import { registerUserService } from '../../factory';
import { LocalStrategyAdapter } from '../adapters/passport-adapter';
import { GoogleLoginCallbackController } from '../controllers/google-login-callback-controller';
import { LoginController } from '../controllers/login-controller';
import { LogoutController } from '../controllers/logout-controller';
import { RegisterUserController } from '../controllers/register-user-controller';

const localStrategyAdapter = new LocalStrategyAdapter();

const registerUserController = new RegisterUserController(registerUserService);
const loginController = new LoginController(localStrategyAdapter);
const googleLoginCallbackController = new GoogleLoginCallbackController();
const logoutController = new LogoutController();

export {
  registerUserController,
  loginController,
  googleLoginCallbackController,
  logoutController,
};
