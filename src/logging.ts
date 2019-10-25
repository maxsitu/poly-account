import path from 'path';
import { Logger, createLogger, format, transports } from 'winston';

const isDev = process.env.NODE_ENV === 'development';

function getLogger(_module: NodeModule): Logger {
  const filename = path.basename(_module.filename);

  return createLogger({
    level: isDev ? 'DEBUG' : 'INFO',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      // for the log file
      format.printf((info) => `[${info.level}] [${info.timestamp}] [${filename}]: ${info.message}`),
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(format.colorize()),
      }),
    ],
  });
}

export { getLogger as default };
