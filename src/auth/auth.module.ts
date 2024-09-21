import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { jwtConstants } from 'src/auth/constants/jwt.constants';

@Module({
  imports:[
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '30m'}
      }),
      inject: [ConfigService],
    })
    // JwtModule.register({
    // global:true,
    // secret: jwtConstants.secret ,
    // signOptions: { expiresIn: '30m'}
    // })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule],
})
export class AuthModule {}
