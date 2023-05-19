import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    subject: '',
    email: '',
    message: ''
  };

  constructor(private emailService: ContactService) { }

  onSubmit() {
    this.emailService.sendEmail(this.formData.email, this.formData.subject, this.formData.message)
      .subscribe(() => {
        // El correo electrónico se envió correctamente
        console.log('Correo electrónico enviado');
      }, (error) => {
        // Ocurrió un error al enviar el correo electrónico
        console.error('Error al enviar el correo electrónico', error);
      });
    
  }


}
