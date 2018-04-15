import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  components: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}