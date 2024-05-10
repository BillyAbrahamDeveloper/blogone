// import mongoose, { mongo } from 'mongoose';

// const connection = {};

// async function connectDB() {
//   if (connection.isConnected) {
//     return;
//   }

//   if (mongoose.connections.length > 0) {
//     connection.isConnected = mongoose.connection[0].readyState;
//     if (connection.isConnected === 1) {
//       return;
//     }
//     await mongoose.disconnect();
//   }

//   const db = await mongoose.connect(process.env.MONGODB_URI);
//   connection.isConnected = db.connections[0].readyState;
// }

// async function disconnectDB() {
//   if (connection.isConnected) {
//     if (process.env.NODE_ENV === 'production') {
//       await mongoose.disconnect();
//       connection.isConnected = false;
//     }
//   }
// }

// const db = { disconnectDB, connectDB };
// export default db;

// Import the mongoose library for MongoDB interaction
import mongoose from 'mongoose';

// Object to keep track of the database connection status
const connection = {};

// Function to connect to the MongoDB database
async function connectDB() {
  // If already connected, return early
  if (connection.isConnected) {
    return;
  }

  // If there are existing connections
  if (mongoose.connections.length > 0) {
    // Set connection status based on the readyState of the first connection
    connection.isConnected = mongoose.connections[0].readyState;
    // If the connection is already established, return early
    if (connection.isConnected === 1) {
      return;
    }
    // If connection is not established, disconnect before reconnecting
    await mongoose.disconnect();
  }

  // Establish a new connection to the MongoDB database
  const db = await mongoose.connect(process.env.MONGODB_URI);
  // Set connection status based on the readyState of the newly established connection
  connection.isConnected = db.connections[0].readyState;
}

// Function to disconnect from the MongoDB database
async function disconnectDB() {
  // If connected to the database
  if (connection.isConnected) {
    // If in production environment
    if (process.env.NODE_ENV === 'production') {
      // Disconnect from the database
      await mongoose.disconnect();
      // Update connection status
      connection.isConnected = false;
    }
  }
}

// Object containing functions to connect and disconnect from the database
const db = { connectDB, disconnectDB };

// Export the db object for use in other parts of the application
export default db;
