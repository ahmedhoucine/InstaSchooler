import { Body, Controller, Get, Param, Post, Put, Request, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UpdateProfileDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { Express } from 'express';  // Vérifiez que ce type est correctement importé


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

  @UseGuards(JwtAuthGuard) // Protéger la route de mise à jour du profil
  @Put('profile/:userId')
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './uploads', // Dossier où les fichiers seront stockés
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + path.extname(file.originalname)); // Créer un nom de fichier unique
      },
    }),
  }))
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() picture: Express.Multer.File, // Fichier téléchargé, vérifiez le type ici
    @Request() req: any,  // Récupérer l'utilisateur authentifié depuis la requête
  ) {
    const authenticatedUserId = req.user.id;

    // Vérifier si l'utilisateur authentifié essaie de mettre à jour son propre profil
    if (authenticatedUserId !== userId) {
      throw new Error('Unauthorized to update this profile');
    }

    console.log('Received userId:', userId);  // Vérifier l'ID de l'utilisateur
    console.log('Uploaded file:', picture);  // Vérifier le fichier téléchargé

    // Si une image a été téléchargée, ajouter son URL au DTO
    if (picture) {
      updateProfileDto.profilePicture = `http://localhost:3000/uploads/${picture.filename}`;
    }

    // Appeler le service pour mettre à jour le profil
    return await this.authService.updateProfile(userId, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard) // Protéger la route pour récupérer le profil
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.id; // ID de l'utilisateur récupéré du token JWT
    return this.authService.getProfile(userId);
  }

  @Get('users') // Endpoint pour récupérer tous les utilisateurs
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
