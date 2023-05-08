import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(to: string, subject: string, body: string): void {
    const emailUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    window.open(emailUrl);
  }
}
