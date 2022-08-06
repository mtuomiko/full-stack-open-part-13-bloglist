import 'dotenv/config';

const required = ['DB_URL', 'JWT_SECRET'];
let errors = false;

required.forEach(envVar => {
  if (!process.env[envVar]) {
    console.log(`env var ${envVar} must be defined`);
    errors = true;
  }
});

if (errors) { process.exit(1); }

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

export {
  DB_URL,
  PORT,
  JWT_SECRET,
};
