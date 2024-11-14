const { MongoClient } = require('mongodb');

class Db {
  constructor() {
    this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cse341.8h2dt.mongodb.net/?retryWrites=true&w=majority&appName=cse341`;
    this.client = new MongoClient(this.uri);
  }
  async test_connection() {
    try {
      await this.client.connect().then(console.log('Connection established'));
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async getCollection(database, coll) {
    try {
      await this.client.connect();
      const db = this.client.db(database);
      const collection = db.collection(coll);
      return collection;
    } catch (e) {
      console.error(e);
    }
  }

  async get(database, coll, qry = {}, limit = 0) {
    try {
      const collection = await this.getCollection(database, coll);
      let query = collection.find(qry);
      if (limit) {
        query = query.limit(limit);
      }
      const query_result = await query.toArray();
      return query_result;
    } catch (e) {
      throw({code: 400, error: e || "No user was found with the given ID"})
    } finally {
      await this.client.close();
    }
  }

  async post(database, coll, data) {
    try {
      const collection = await this.getCollection(database, coll);
      const result = await collection.insertOne(data);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async put(database, coll, qry, fields) {
    try {
      const collection = await this.getCollection(database, coll);
      const result = await collection.updateOne(qry, { $set: fields });
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      this.client.close();
    }
  }

  async delete(database, coll, qry) {
    try {
      const collection = await this.getCollection(database, coll);
      const result = await collection.deleteOne(qry);
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      this.client.close();
    }
  }
}

module.exports = Db;
