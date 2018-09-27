export const AUTH_CONFIG = {
  clientId: 'OC5JBWrQ2BfLHm7RX2d3S88opMc8l1hM',
  domain: 'agilentinnovations.auth0.com',
  callbackUrl: 'http://127.0.0.1:8080/callback',
  // callbackUrl: 'http://pennypincher.agilentinnovations.com/callback',
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080/callback' : 'https://pennypincher.agilentinnovations.com/callback',
  apiUrl: 'API_IDENTIFIER'
}
