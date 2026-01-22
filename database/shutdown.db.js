import { closeClient } from './db.js';

process.on("SIGINT", async ()=> {
  console.log('Received SIGINT, closing MD client and exiting...');
  try { await closeClient(); }
  catch (error) { console.error(error) }
  process.exit(0);
});

process.on('SIGTERM', async ()=> {
  console.log('Received SIGTERM, closing MD client and exiting...');
  try { await closeClient(); }
  catch (error) { console.error(error) }
  process.exit(0);
})