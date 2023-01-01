const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const contactsOperations = require("./contacts");

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "remove":
      const contactToRemove = await contactsOperations.removeContact(id);
      console.log(contactToRemove);
      break;

    case "add":
      const contactToAdd = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(contactToAdd);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// invokeAction({ action: "list" });
// const id = "5";

// invokeAction({ action: "get", id });

// const id = "3";
// invokeAction({ action: "remove", id });

// const name = "Mango";
// const email = "mango@gmail.com";
// const phone = "322-22-22";

// invokeAction({ action: "add", name, email, phone });
