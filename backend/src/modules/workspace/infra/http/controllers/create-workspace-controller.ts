import { CreateWorkspaceService } from '@/modules/workspace/services/create-workspace-service';
import { asyncHandler } from '@/shared/middleware/async-handler';
import { HTTP_STATUS } from '@/shared/utils/http-status';
import { createWorkspaceSchema } from '@/shared/validators/workspace-validators';

export class CreateWorkspaceController {
  constructor(
    private readonly createWorkspaceService: CreateWorkspaceService,
  ) {}

  public handle = asyncHandler(async (req, res) => {
    const { name, description } = createWorkspaceSchema.parse(req.body);
    const userId = req.user?.id || '';

    const { workspace } = await this.createWorkspaceService.execute({
      name,
      description,
      ownerId: userId,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'workspace created successfully',
      workspace,
    });
  });
}
