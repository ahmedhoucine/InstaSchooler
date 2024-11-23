import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profileEdit.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfileComponent implements OnInit {
  profile = {
    userId: '',
    username: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    picture: ''
  };

  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
  passwordsMatch = true; 
  currentPasswordValid = false; 
  saveButtonEnabled = false; 
  loading = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    console.log('EditProfileComponent loaded');
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profile = { ...data };
        this.loading = false;
        this.checkPasswordMatch();
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
      }
    );
  }

  validateCurrentPassword(): void {
    if (!this.profile.currentPassword.trim()) {
      this.currentPasswordValid = false;
      this.updateSaveButtonState(this.profile); // Pass profile here
      return;
    }

    this.profileService.validateCurrentPassword(this.profile.currentPassword).subscribe(
      (isValid) => {
        this.currentPasswordValid = isValid;
        this.updateSaveButtonState(this.profile); // Pass profile here
      },
      (error) => {
        console.error('Error validating current password:', error);
        this.currentPasswordValid = false;
        this.updateSaveButtonState(this.profile); // Pass profile here
      }
    );
  }

  checkPasswordMatch(): void {
    this.passwordsMatch = this.profile.password === this.profile.confirmPassword;
    this.updateSaveButtonState(this.profile); // Pass profile here
  }

  updateSaveButtonState(profile: any): void {
    const picture = profile.picture;
    this.saveButtonEnabled = picture && picture.trim().length > 0;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.profile = this.profile || {
          userId: '',
          username: '',
          email: '',
          currentPassword: '',
          password: '',
          confirmPassword: '',
          picture: ''
        };

        this.profile.picture = reader.result as string;

        console.log('Selected file as base64:', this.profile.picture);

        this.updateSaveButtonState(this.profile); // Pass profile here
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.saveButtonEnabled) {
      alert('Please fix the errors before saving.');
      return;
    }

    this.profileService.updateProfile(this.profile).subscribe(
      () => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    );
  }

  onCancel(): void {
    this.fetchProfile();
  }
}
