export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  db: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    database: 'kupipodariday',
    username: 'student',
    password: 'student',
  },
  jwtSecret: 'jwt_secret',
});
