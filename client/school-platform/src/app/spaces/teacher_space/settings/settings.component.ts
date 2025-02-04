import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../services/enseignant.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  enseignant: any = {
    name: '',
    email: '',
    password: '', // Nouveau mot de passe
    currentPassword: '', // Mot de passe actuel
    newPassword: '', // Nouveau mot de passe
  };

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.fetchEnseignant();
  }

  fetchEnseignant(): void {
    this.enseignantService.getEnseignantDetails().subscribe(
      (data: any) => {
        this.enseignant.firstname = data.firstname;
        this.enseignant.lastName = data.lastName;
        this.enseignant.email = data.email;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données de l\'enseignant :', error);
      }
    );
  }

  onSaveSettings(form: any): void {
    if (form.valid) {
      if (!this.enseignant.currentPassword || !this.enseignant.newPassword) {
        alert('Please provide both the current password and the new password.');
        return;
      }
      this.enseignantService.updateEnseignant(this.enseignant).subscribe(
        (response) => {
          alert('Settings saved successfully !');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des paramètres :', error);
          alert('Error saving the settings.');
        }
      );
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  onSendTicket(form: any): void {
    if (form.valid) {
      const ticketData = form.value;
      this.enseignantService.sendTicket(ticketData).subscribe(
        () => {
          alert('Ticket sent successfully !');
          form.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du ticket :', error);
          alert('Error sending the ticket.');
        }
      );
    }
  }
}
