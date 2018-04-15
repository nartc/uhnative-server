import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IUserModel extends ISharedModel {
  username?: string;
  password?: string;
  role?: UserRole;
}

export enum UserRole {
  Admin = 'Admin' as any,
  User = 'User' as any,
}

export class UserVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  username?: string;
  @ApiModelPropertyOptional()
  password?: string;
  @ApiModelPropertyOptional({
    enum: ['Admin', 'User'],
  })
  role?: UserRole;
}

export class LoginResponse {
  @ApiModelProperty()
  authToken: string;
  @ApiModelProperty({
    type: UserVm,
  })
  user: UserVm;
}

export class RegisterParams {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelPropertyOptional({
    enum: ['Admin', 'User'],
  })
  role?: UserRole;
}

export class LoginParams {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
}