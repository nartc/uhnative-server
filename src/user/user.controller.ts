import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IUserModel, LoginParams, LoginResponse, RegisterParams, UserVm } from './models/user.model';
import { UserService } from './user.service';
import { ApiException } from '../shared/models/shared.model';
import { MongoError } from 'mongodb';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@ApiUseTags('Authentication')
export class UserController {

  constructor(private readonly _userService: UserService,
              private readonly _authService: AuthService) {
  }

  @Post('register')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Register successfully',
    type: UserVm,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'POST Register new User',
    operationId: 'Authentication_Register',
  })
  async register(@Body() registerParams: RegisterParams): Promise<IUserModel> {
    const username: string = registerParams.username;

    if (!username) throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);

    const existed: IUserModel = await this._userService.getOne(username, 'username');

    if (existed instanceof MongoError) throw new HttpException('Server error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    if (existed) throw new HttpException(`${username} is already existed`, HttpStatus.BAD_REQUEST);

    return await this._userService.createNewUser(registerParams);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Login successfully',
    type: LoginResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'POST Login User',
    operationId: 'Authentication_Login',
  })
  async login(@Body() loginParams: LoginParams): Promise<LoginResponse> {
    const { username, password } = loginParams;

    if (!username) throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);

    const fetched: IUserModel = await this._userService.getOne(username, 'username');

    if (fetched instanceof MongoError) throw new HttpException('Server error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    if (!fetched || fetched === null) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    const isMatched: boolean = await this._userService.comparePassword(password, fetched.password);

    if (!isMatched) throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);

    const payload = { user: fetched };
    const token = await this._authService.signPayload(payload);

    return await this._userService.loginUser(fetched, token);
  }
}
