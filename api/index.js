import { createApp } from '../server/app.js';
import { createDatabase } from '../server/db.js';

const pool = await createDatabase();

export default createApp({ pool });
