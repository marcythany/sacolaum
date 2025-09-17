import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import { connectDB } from './config/db.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // allows us to accept JSON data in the req.body

app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
	// Use absolute path resolution
	const rootPath = path.resolve();

	// Serve static files from frontend/dist
	app.use(express.static(path.join(rootPath, 'frontend/dist')));

	// Handle SPA routing
	app.get('*', (req, res) => {
		res.sendFile(path.join(rootPath, 'frontend/dist/index.html'));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log('Server started at http://localhost:' + PORT);
});
