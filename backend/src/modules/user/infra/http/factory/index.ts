import { getCurrentUserService } from '../../factory';
import { GetCurrentUserController } from '../controllers/get-current-user-controller';

const getCurrentUserController = new GetCurrentUserController(
  getCurrentUserService,
);

export { getCurrentUserController };
