import { Module } from '@nestjs/common';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminController } from './auth-admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') }, // Expiration time
      }),
      inject: [ConfigService], // Inject ConfigService into the factory
    }),
  ],
  controllers: [AuthAdminController], // Register the controller
  providers: [AuthAdminService], // Register the AuthService
  exports: [AuthAdminService], // Export AuthService if you need it in other modules
})
export class AuthAdminModule {}
