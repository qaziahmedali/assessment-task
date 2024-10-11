import { userService } from '@/services/userService';
import { errorResponseService } from '@/common/services/errorResponseService';

export async function POST(req: Request) {
  try {
    return userService.login(req);
  } catch (error) {
    return errorResponseService.internalServerError();
  }
}
