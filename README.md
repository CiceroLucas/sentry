# 📡 Sentry – Monitoramento de Rede com Alertas via WhatsApp

O **Sentry** é um microserviço desenvolvido com **NestJS** que monitora a qualidade da conexão de rede (ping) e envia **alertas automáticos via WhatsApp** para técnicos cadastrados, caso a rede esteja fora do ar ou apresente latência elevada.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) – Framework backend
- [@wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect) – Integração com WhatsApp Web
- [Node Cron](https://www.npmjs.com/package/node-cron) – Agendamento de tarefas
- [ping](https://www.npmjs.com/package/ping) – Verificação de conectividade

---

## 📦 Instalação

```
git clone https://https://github.com/CiceroLucas/sentry.git
cd sentry
npm install
```

## ⚙️ Configuração

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
TECNICOS_WHATSAPP=5598999999999,5511988888888
```

## ▶️ Execução
```
npm run start:dev
```

## O que esse serviço faz

Verifica periodicamente (a cada 5 segundos) a latência dos hosts configurados.

Envia alertas via WhatsApp para os técnicos:

✅ Conexão OK

⚠️ Latência acima de 150ms

❌ Host fora do ar

## Exemplo de mensagem enviada

```
⚠️ [www.youtube.com] Alta latência: 320ms
❌ [www.facebook.com] está FORA DO AR!
```
