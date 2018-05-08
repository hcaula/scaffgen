#!/usr/bin/env node

/*
 * Inputs
*/
const app_dir_name = 'app';
const controllers_dir_name = 'controllers';
const models_dir_name = 'models';
const routes_dir_name = 'routes';
const separated_routes = false;

/*
 * Modules
*/
const path = require('path');
const fs = require('fs');

/*
 * Constants
*/
const main_dir = process.cwd();
const app_dir = path.join(main_dir, app_dir_name);
const controllers_dir = path.join(app_dir, controllers_dir_name);
const models_dir = path.join(app_dir, models_dir_name);
const routes_dir = path.join(app_dir, routes_dir_name);

/*
 * Main
*/

/* Creates directories if they don't exist */
if (!fs.existsSync(app_dir)) fs.mkdirSync(app_dir);
if (!fs.existsSync(controllers_dir)) fs.mkdirSync(controllers_dir);
if (!fs.existsSync(models_dir)) fs.mkdirSync(models_dir);
if (!fs.existsSync(routes_dir) && separated_routes) fs.mkdirSync(routes_dir);