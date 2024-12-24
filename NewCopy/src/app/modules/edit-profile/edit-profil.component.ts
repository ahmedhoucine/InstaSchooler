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
    profilePicture: ''
  };

  defaultPicture = 'https://i.pinimg.com/736x/a4/8a/ca/a48aca275e3dbe9a00d8f90e095f25ae.jpg';
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
      },
      (error) => {
        console.error('Error fetching profile:', error);
        this.loading = false;
      }
    );
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
        console.log('New profile picture:', this.profile.profilePicture);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // Envoi des données au backend
    this.profileService.updateProfile(this.profile).subscribe(
      (response) => {
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating profile:', error);

        // Gestion des erreurs renvoyées par le backend
        if (error.error?.message) {
          alert(`Error: ${error.error.message}`);
        } else {
          alert('Failed to update profile. Please try again.');
        }
      }
    );
  }

  onCancel(): void {
    this.fetchProfile();
  }
}
