const { MongoClient } = require("mongodb");
const { password, database } = require("./config.js");

async function start() {
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

  } catch(error) {
    console.log(error)
  };
};

module.exports = start;
