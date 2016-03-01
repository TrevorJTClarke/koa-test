// All stored configurations and configuration manipulations, put that to a good beat :)
'use strict';

// Quick definitions
exports.DATABASE_URL = process.env.DATABASE_URL || null;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.PORT = Number.parseInt(process.env.PORT, 10) || 3000;
