import pino from "pino";

const log = pino({
  enabled: true,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const logger = log;
