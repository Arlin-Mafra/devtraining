console.log('process.env.DATABASEE_URL :>> ', process.env.DATABASE_URL);
module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: ['src/migrations/'],
    entitiesDir: 'src/**/*.entity.ts',
  },
};
