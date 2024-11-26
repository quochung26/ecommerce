import { BaseResponse } from './baseResponse';
import { UserEntity } from 'src/entities/user.entity';

export class UserResponse extends BaseResponse<UserEntity> {
  user_token: string;

  constructor(data: UserEntity, message?: string, token?: string) {
    delete data.password;
    delete data.created_at;
    delete data.updated_at;

    super(data, message);
    if (token) this.user_token = token;

    return this;
  }
}
