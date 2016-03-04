// All stored configurations and configuration manipulations, put that to a good beat :)
'use strict';

// simple variables
const appName = 'KOA-TEST'
const version = '1'

// Quick definitions
exports.DATABASE_URL = process.env.DATABASE_URL || null;
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.PORT = Number.parseInt(process.env.PORT, 10) || 3000;
exports.JWT = process.env.JWT || 'shared-secret';
exports.APPNAME = appName

// Session definitions
exports.headers = {}
exports.headers['version'] = `application/${appName}.v${version}+json`
exports.headers['content-type'] = `application/json`
