// Safe logging utility that masks secrets and sensitive tokens

const maskSecret = (str) => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= 6) return '******';
  return str.slice(0, 3) + '****' + str.slice(-3);
};

const logger = {
  info: (...args) => {
    console.log(`[${new Date().toISOString()}] [INFO]`, ...args);
  },
  warn: (...args) => {
    console.warn(`[${new Date().toISOString()}] [WARN]`, ...args);
  },
  error: (...args) => {
    console.error(`[${new Date().toISOString()}] [ERROR]`, ...args);
  },
  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[${new Date().toISOString()}] [DEBUG]`, ...args);
    }
  },
  maskSecret,
};

module.exports = logger;
