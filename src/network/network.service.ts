import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { verificarLatencia } from '../utils/network-check';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Injectable()
export class NetworkService {
  constructor(private whatsapp: WhatsappService) {}

  @Cron('*/5 * * * * *')
  async checarRede() {
    const hosts = [
      'www.google.com',
      'www.youtube.com',
      'www.facebook.com',
      'www.gov.br/pt-br',
    ];

    for (const host of hosts) {
      const resultado = await verificarLatencia(host);

      if (!resultado.alive) {
        const msg = `❌ [${host}] está FORA DO AR!`;
        console.log(msg);
        await this.whatsapp.enviarMensagemParaTodos(msg);
      } else if (resultado.time !== 'unknown' && resultado.time > 150) {
        const msg = `⚠️ [${host}] Alta latência: ${resultado.time}ms`;
        console.log(msg);
        await this.whatsapp.enviarMensagemParaTodos(msg);
      } else {
        console.log(`✅ [${host}] OK! Latência: ${resultado.time}ms`);
      }
    }
  }
}
