const { MongoClient } = require("mongodb");
const { password, database } = require("./config.js");
const requests = require('./requests.js');

async function start(app, parser) {
  const client = new MongoClient(
     `mongodb+srv://Vladislav:${password}@personalsitedatabaseclu.wzua5.mongodb.net/${database}?retryWrites=true&w=majority`,
     { useUnifiedTopology: true }
   );

  try {
    // connect
    await client.connect();

    // collections
    const users = client.db().collection("users");
    const messages = client.db().collection("messages");
    const works = client.db().collection("works");
    const about = client.db().collection("about");
    
    requests(app, parser, { users, messages, works, about });

  } catch(error) {
    console.log(error)
  };
};

module.exports = start;
