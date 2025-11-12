//db.js is repsonsible for the connection to mongodb database using the URI env key.
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    const conn = await connect(process.env.MONGO_URI, {});
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

export default connectDB;
