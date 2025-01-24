import { Controller, Post, Body } from '@nestjs/common';
import { AuthAdminService } from '../admin-auth/auth-admin.service';
import { AdminLoginDto } from '../dto/admin-login.dto';

@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post('admin-login')
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    const { username, password } = loginDto;
    return this.authService.adminLogin(username, password);
  }
}
