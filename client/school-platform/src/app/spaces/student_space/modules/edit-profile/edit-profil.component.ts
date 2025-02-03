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
        alert('Invalid file type. Please select a JPEG, PNG, or GIF image.');
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
    this.profileService.updateProfile(this.profile).subscribe(
      () => alert('Profile updated successfully!'),
      (error) => {
        console.error('Error updating profile:', error);
        alert(error.error?.message || 'Failed to update profile. Please try again.');
      }
    );
  }

  onCancel(): void {
    this.profileService.loadProfile();
  }
}
