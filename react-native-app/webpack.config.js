const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  if (config.mode === 'development') {

    config.devServer.proxy = {

      'api/location/search': {
        target: {
          host: 'metaweather.com',
          protocol: 'https',
          port: 443,
        },
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    };


    console.log('config', config); 
       
  }



  // Customize the config before returning it.
  return config;
};
