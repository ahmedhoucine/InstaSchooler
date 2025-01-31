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
        alert('Veuillez renseigner à la fois le mot de passe actuel et le nouveau mot de passe.');
        return;
      }
      this.enseignantService.updateEnseignant(this.enseignant).subscribe(
        (response) => {
          alert('Paramètres enregistrés avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des paramètres :', error);
          alert('Erreur lors de la sauvegarde des paramètres.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  onSendTicket(form: any): void {
    if (form.valid) {
      const ticketData = form.value;
      this.enseignantService.sendTicket(ticketData).subscribe(
        () => {
          alert('Ticket envoyé avec succès !');
          form.resetForm();
        },
        (error) => {
          console.error('Erreur lors de l\'envoi du ticket :', error);
          alert('Erreur lors de l\'envoi du ticket.');
        }
      );
    }
  }
}
