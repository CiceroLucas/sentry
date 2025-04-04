import { Injectable, OnModuleInit } from '@nestjs/common';
import * as wppconnect from '@wppconnect-team/wppconnect';
import { Whatsapp } from '@wppconnect-team/wppconnect';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Whatsapp;
  private numerosTecnicos: string[];

  constructor(private configService: ConfigService) {
    const raw = this.configService.get<string>('TECNICOS_WHATSAPP') || '';
    this.numerosTecnicos = raw.split(',').map((num) => num.trim());
  }

  async onModuleInit() {
    this.client = await wppconnect.create({
      session: 'sentry-bot',
      headless: true,
      catchQR: (base64Qr, asciiQR, attempts, urlCode) => {
        console.log('📱 Escaneie o QR Code para autenticar:');
        console.log(asciiQR);
      },
      statusFind: (statusSession, session) => {
        console.log(`📡 Status da sessão [${session}]: ${statusSession}`);
      },
    });
  }

  async enviarMensagemParaTodos(mensagem: string) {
    if (!this.client) {
      console.error('❌ Cliente WhatsApp não inicializado!');
      return;
    }

    for (const numero of this.numerosTecnicos) {
      try {
        await this.client.sendText(`${numero}@c.us`, mensagem);
        console.log(`✅ Mensagem enviada para ${numero}`);
      } catch (err) {
        console.error(`❌ Erro ao enviar mensagem para ${numero}`, err);
      }
    }
  }
}
