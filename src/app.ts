import express from 'express';
import eventRoutes from './domain/event/routes/eventRoutes';
import { errorHandler } from './common/middleware/errorHandling';
import { connect } from './common/config/dbConfig';

const app = express();

app.use(express.json());
app.use('/api', eventRoutes);

// Error handling middleware
app.use(errorHandler);


// Function to start the server
const startServer = async () => {
    try {
      // Connect to the in-memory MongoDB
      await connect();
      console.log('In-memory MongoDB connected');
  
      // Start the Express server
      const PORT = process.env.PORT || 3001;
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process with failure code
    }
  };
  
  // Start the server
  startServer();
  
  // Gracefully shut down the server
  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await close();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await close();
    process.exit(0);
  });

export default app;
