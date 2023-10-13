// https://github.com/pimterry/loglevel
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import CONST_DATA from "@/mixins/const/constData";

export default (_, inject) => {
  prefix.reg(log);
  log.enableAll();
  log.setDefaultLevel('DEBUG');

  const levelConfig =
    process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL || process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.DEVELOPMENT
      ? log.levels.DEBUG
      : log.levels.WARN;
  log.setLevel(levelConfig, false);

  prefix.apply(log, {
    template: '[%t] %l (%n):',
    levelFormatter(level) {
      return level.toUpperCase();
    },
    nameFormatter(name) {
      return name || 'global';
    },
    timestampFormatter(date) {
      return date.toLocaleString('ja');
    }
  });

  inject('log', log);
};