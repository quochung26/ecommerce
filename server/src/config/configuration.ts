export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES,
    },
  },
});

export const envFile = () => {
  const environment = process.env.NODE_ENV;
  let filePath = '.env';
  switch (environment) {
    case 'production':
      filePath = '.env.production';
      break;
    case 'development':
      filePath = '.env.production';
      break;
    default:
      break;
  }
  return filePath;
};
