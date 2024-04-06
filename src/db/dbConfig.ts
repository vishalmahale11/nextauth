import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo DB Connected");
    });
    connection.on("error", (error) => {
      console.log(
        "Mongo DB Connection failed Make Sure DB connection established and Mongo is Running Up: ",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log(
      "Something Went Wrong Mongo DB Connections Establishment Failed"
    );
    console.log("Error Message", error);
  }
}
