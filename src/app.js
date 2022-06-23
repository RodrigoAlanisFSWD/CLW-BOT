import * as venom from 'venom-bot'
import indexHandler from './handlers/indexHandler.js';

import { createConnection } from "./db.js"

createConnection()

venom
  .create({
    session: 'clw-bot', //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((msg) => {
    indexHandler(msg, client)
  });
}