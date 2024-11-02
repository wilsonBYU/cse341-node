const {MongoClient} = require("mongodb")

class Db {
  constructor() {
    this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cse341.8h2dt.mongodb.net/?retryWrites=true&w=majority&appName=cse341`
    this.client = new MongoClient(this.uri)
  }
  async test_connection() {
    try {
    await this.client.connect()
        .then(console.log("Connection established"))
    } catch (e) {
      console.error(e)
    } finally {
      await this.client.close()
    }
  }

  async query(database, coll,qry = {}, limit=0) {
    try {
      await this.client.connect()
      const db = this.client.db(database)
      const collection = db.collection(coll)
      let query = collection.find(qry)
      if (limit) {
        query = query.limit(limit)
      }
      const query_result = await query.toArray()
      return query_result
    } catch (e) {
      console.error(e)
    } finally {
      await this.client.close()
    }
  }
}


module.exports = Db