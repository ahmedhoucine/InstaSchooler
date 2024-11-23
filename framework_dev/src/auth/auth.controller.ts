import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateProfileDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard) // Protect the updateProfile route with JWT Auth Guard
  @Put('profile/:userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req: any,  // Get the authenticated user from the request
  ) {
    const authenticatedUserId = req.user.id;

    // Check if the authenticated user is trying to update their own profile
    if (authenticatedUserId !== userId) {
      throw new Error('Unauthorized to update this profile');
    }

    console.log('Received userId:', userId);  // Log the userId to verify it's correct
    return await this.authService.updateProfile(userId, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard) // Protect the route
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.id; // Assuming userId is stored in JWT token
    return this.authService.getProfile(userId);
  }

  @Get('users') // Endpoint to get all users
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
