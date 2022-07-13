import indexHandler from './handlers/indexHandler.js';
import qrcode from 'qrcode-terminal';
import wsb from 'whatsapp-web.js';
import fs from 'fs'

import { createConnection } from "./db.js"
import path from 'path';

const { Client, LocalAuth } = wsb;

createConnection()

const client = new Client({
  authStrategy: new LocalAuth()
});

client.initialize();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Bot Running')
})

client.on('authenticated', (session) => {
  console.error('Authenticated')
})

client.on('auth_failure', (msg) => {
  console.error('Authentication Failed')
})

client.on('message', msg => {
  console.log(msg.body)
  indexHandler(msg, client)
})

process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
})