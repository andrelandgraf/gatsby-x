/* eslint-disable no-console */
import { ENV } from '../enums';

const { logLevel } = ENV;

console.log('log level', logLevel);

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const shouldLog = level => logLevels[logLevel] >= logLevels[level];

console.tag = (logLabel = 'misc') => ({
  error: (message, ...params) =>
    shouldLog('error') &&
    console.error(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  warn: (message, ...params) =>
    shouldLog('warn') &&
    console.warn(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  info: (message, ...params) =>
    shouldLog('info') &&
    console.info(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  http: (message, ...params) =>
    shouldLog('http') &&
    console.log(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  verbose: (message, ...params) =>
    shouldLog('verbose') &&
    console.log(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  debug: (message, ...params) =>
    shouldLog('debug') &&
    console.debug(`[${new Date()}] ${logLabel}: ${message}`, ...params),
  silly: (message, ...params) =>
    shouldLog('silly') &&
    console.log(`[${new Date()}] ${logLabel}: ${message}`, ...params),
});
