if (typeof window === 'undefined') {
  require('dotenv').config();
}
export const port = process.env.PORT || 3000;
export const environment = process.env.NODE_ENV || 'production';
export const TEST_ENV = environment === 'test';
