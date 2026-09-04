// api/config.js
// Returns public (non-secret) config the frontend needs at runtime.
// PayPal Client IDs are meant to be public (same as a Stripe publishable key) —
// this just lets you manage it as an env var instead of hardcoding it in index.html.

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json({
    paypalClientId: process.env.PAYPAL_CLIENT_ID || ''
  });
};
