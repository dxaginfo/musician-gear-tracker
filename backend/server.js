const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const gearRoutes = require('./routes/gear.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const reportRoutes = require('./routes/report.routes');

// Import middleware
const { authenticateToken } = require('./middleware/auth.middleware');
const errorHandler = require('./middleware/error.middleware');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Apply middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/gear', authenticateToken, gearRoutes);
app.use('/api/maintenance', authenticateToken, maintenanceRoutes);
app.use('/api/reports', authenticateToken, reportRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes