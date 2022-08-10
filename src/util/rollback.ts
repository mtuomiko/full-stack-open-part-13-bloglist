// umzug & typescript related
require('ts-node/register');

import { rollbackMigration } from './db';

void rollbackMigration();
