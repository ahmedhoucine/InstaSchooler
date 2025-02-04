import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/spaces/student_space/services/profileEdit.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css'],
})
export class EditProfileComponent implements OnInit {
  profile: any = {
    userId: '',
    username: '',
    email: '',
    currentPassword: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
  };

  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
  loading = false;

  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';
  showAlert: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    console.log('EditProfileComponent loaded');
    this.profileService.profile$.subscribe((data) => {
      if (data) this.profile = { ...data };
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        this.showAlertMessage('Invalid file type. Please select a JPEG, PNG, or GIF image.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.profile.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.showAlert = false;

    this.profileService.updateProfile(this.profile).subscribe(
      () => {
        this.showAlertMessage('Profile updated successfully!', 'success');
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.showAlertMessage(error.error?.message || 'Failed to update profile. Please try again.', 'error');
      }
    );
  }

  onCancel(): void {
    this.profileService.loadProfile();
  }

  private showAlertMessage(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.showAlert = true;
    }, 0);
  }
}
