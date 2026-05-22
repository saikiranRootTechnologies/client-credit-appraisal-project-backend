const mongoose = require("mongoose");

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => {
        console.log(`MongoDB connected: ${m.connection.host}/${m.connection.name}`);
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
