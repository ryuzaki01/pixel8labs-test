import { createAppAuth } from '@octokit/auth-app';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12341234567890abcdef1234",
});
