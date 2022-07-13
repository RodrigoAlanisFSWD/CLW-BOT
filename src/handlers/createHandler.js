import createController from "../controllers/createController.js";

export default function createHandler(msg, client) {
  switch (true) {
    case /crear (Crepa|Waffle) \w [\d ]+/g.test(msg.body):
        let msgArray = msg.body.split(" ");

        let type = msgArray[1].toUpperCase()
        const count = msgArray[2]
        const list = msgArray.slice(3)

        const ingredients = list.map(str => {
          return Number(str);
        });

        return createController.create(client, msg, ingredients, type, count)

    case /crear/g.test(msg.body):
        return helpController.create(client, msg)

    default:
      return helpController.create(client, msg)
  }
}
