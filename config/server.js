module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
<<<<<<< HEAD
      secret: env('ADMIN_JWT_SECRET', '90f19aef1696f51e9645a2fd98b035f0'),
=======
      secret: env('ADMIN_JWT_SECRET', 'bd83e08d1f7419cb051641c2bf3f93cf'),
>>>>>>> ac26fbd481bf60e0658d79ed3c5225e568c0f9f5
    },
  },
});
