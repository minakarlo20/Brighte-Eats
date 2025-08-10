import sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'BrighteEats',
  server: process.env.DB_SERVER || 'localhost',
  options: {
    encrypt: false, // set to true if using Azure
    trustServerCertificate: true
  }
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

export default sql;