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
    theme: 'light', // Valeur par défaut
    password: '', // Nouveau mot de passe

  };

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.fetchEnseignant();
    this.applyTheme(this.enseignant.theme);
  }

  fetchEnseignant(): void {
    this.enseignantService.getEnseignants().subscribe(
      (data) => {
        if (data.length > 0) {
          this.enseignant = data[0];
          this.applyTheme(this.enseignant.theme);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données de l\'enseignant :', error);
      }
    );
  }

  onSaveSettings(form: any): void {
    if (form.valid) {
      if (!this.enseignant._id) {
        console.error('ID de l\'enseignant manquant.');
        alert('Impossible de mettre à jour sans ID.');
        return;
      }
      if (this.enseignant.newPassword) {
        this.enseignant.password = this.enseignant.newPassword; // Remplace l'ancien mot de passe
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
        (response) => {
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
  
  applyTheme(theme: string): void {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
