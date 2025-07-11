class Logger {
  constructor() {
    this.logs = [];
  }

  log(message, level = 'info', data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, data };
    this.logs.push(logEntry);
    console.log(`[${level.toUpperCase()}] ${timestamp} - ${message}`, data);
  }

  info(message, data = {}) {
    this.log(message, 'info', data);
  }

  warn(message, data = {}) {
    this.log(message, 'warn', data);
  }

  error(message, data = {}) {
    this.log(message, 'error', data);
  }

  getLogs() {
    return this.logs;
  }
}

const logger = new Logger();
export default logger;