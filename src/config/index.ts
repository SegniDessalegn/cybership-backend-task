import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  ups: {
    clientId: process.env.UPS_CLIENT_ID!,
    clientSecret: process.env.UPS_CLIENT_SECRET!,
    baseUrl: process.env.UPS_BASE_URL || 'https://wwwcie.ups.com',
  },
};