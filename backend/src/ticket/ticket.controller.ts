import { Body, Controller, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.schema';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async createTicket(@Body() ticketData: Partial<Ticket>): Promise<{ message: string }> {
    await this.ticketService.createTicket(ticketData); // Enregistrer dans la base de données
    await this.ticketService.sendEmail(ticketData); // Envoyer l'email
    return { message: 'Ticket envoyé avec succès' };
  }
}
