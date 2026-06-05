import 'dotenv/config';
import { createApp } from './app.js';
import { createDatabase } from './db.js';

const port = Number(process.env.PORT || 3001);
const pool = await createDatabase();
const app = createApp({ pool });

app.listen(port, '127.0.0.1', () => {
  console.log(`Workforce API listening on http://127.0.0.1:${port}`);
});
