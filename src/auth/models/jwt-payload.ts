import { IUserModel } from '../../user/models/user.model';

export interface JwtPayloadInterface {
  user?: IUserModel;
  iat?: Date;
}