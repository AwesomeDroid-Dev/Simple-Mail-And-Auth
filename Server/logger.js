import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, json } = format;

const isProduction = process.env.NODE_ENV === 'production';

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const loggerTransports = [];

if (isProduction) {
  loggerTransports.push(
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console({
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json())
    })
  );
} else {
  loggerTransports.push(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    })
  );
}

const logger = createLogger({
  level: 'info',
  transports: loggerTransports
});

export default logger;
