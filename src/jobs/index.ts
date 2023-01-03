import cron from 'node-cron';

export default {
  initCron: (config: any) => {
    Object.keys(config).forEach((key) => {
      if (cron.validate(config[key].frequency)) {
        cron.schedule(config[key].frequency, () => {
          const handler = require(`./${config[key].handler}`);
          handler();
        });
      }
    });
  },
};
