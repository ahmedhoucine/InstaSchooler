import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateProfileDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Express, response } from 'express'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const response = await this.authService.login(loginDto); 
    console.log(response.token); 
    return response; 
  }

  @UseGuards(JwtAuthGuard) 
  @Put('profile/:userId')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    }),
  )
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() picture: Express.Multer.File, 
    @Request() req: any, 
  ) {
    const authenticatedUserId = req.user.id;

    if (authenticatedUserId !== userId) {
      throw new Error('Unauthorized to update this profile');
    }

    console.log('Received userId:', userId); 
    console.log('Uploaded file:', picture); 

    if (picture) {
      updateProfileDto.profilePicture = `http://localhost:3000/uploads/${picture.filename}`;
    }

    return await this.authService.updateProfile(userId, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.id;
    return this.authService.getProfile(userId);
  }
}
