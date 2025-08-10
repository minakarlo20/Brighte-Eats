import express, { Request, Response } from 'express';
import leadRoutes from './routes/lead.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/leads", leadRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});