import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>) {}

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    const newTicket = new this.ticketModel(ticketData);
    return newTicket.save();
  }

  async sendEmail(ticketData: Partial<Ticket>): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fatmabouhari20@gmail.com', // Remplacez par votre email Gmail
        pass: 'mlhsypzvqfzuscmw', // Mot de passe d'application Gmail
      },
    });

    const mailOptions = {
      from: 'fatmabouhari20@gmail.com',
      to: 'fatma.bouhari@insat.ucar.tn',
      subject: `Ticket: ${ticketData.subject} - Urgence: ${ticketData.urgency}`,
      text: ticketData.message,
    };

    await transporter.sendMail(mailOptions);
  }
}
