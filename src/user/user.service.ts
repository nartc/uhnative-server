import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IUserModel, LoginResponse, RegisterParams, UserVm } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';

@Component()
export class UserService extends SharedService<IUserModel> {

  constructor(@InjectModel(UserSchema) private readonly _userModel: Model<IUserModel>) {
    super(_userModel);
  }

  async createNewUser(registerParams: RegisterParams): Promise<IUserModel> {
    const newUser: IUserModel = new User();
    newUser.username = registerParams.username;
    newUser.role = registerParams.role;
    const salt = await genSalt(10);
    newUser.password = await hash(registerParams.password, salt);
    return this._userModel.create(newUser);
  }

  async loginUser(currentUser: IUserModel, token: string): Promise<LoginResponse> {
    return new Promise<LoginResponse>(resolve => {
      const result: LoginResponse = {
        authToken: token,
        user: (currentUser as UserVm),
      };
      resolve(result);
    });
  }

  async comparePassword(input: string, password: string): Promise<boolean> {
    return compare(input, password);
  }
}
