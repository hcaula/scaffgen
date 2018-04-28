#!/usr/bin/env node

/*
 * Inputs
*/
const app_dir_name = 'app';
const controllers_dir_name = 'controllers';
const models_dir_name = 'controllers';
const routes_dir_name = 'routes';
const has_routes = false;

/*
 * Modules
*/
const path = require('path');
const fs = require('fs');

/*
 * Main
*/
const main_dir = process.cwd();
const app_dir = path.join(main_dir, 'app');

/* Creates app directory if it doesn't exist */
if (!fs.existsSync(app_dir)) fs.mkdirSync(app_dir);
