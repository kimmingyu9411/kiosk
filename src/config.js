const dotenv = require("dotenv");
dotenv.config();

function getValue(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error("There is no value in Process variable");
  } else {
    return value;
  }
}

const config = {
  db: {
    database: getValue("DB_DATABASE", ""),
    host: getValue("DB_HOST", ""),
    username: getValue("DB_USERNAME", ""),
    password: getValue("DB_PASSWORD", ""),
  },
  jwt: {
    accessSecretKey: getValue(
      "JWT_ACCESS_SECRET_KEY",
      "gMhHLk&9dzpv$4#rP!3NdAr00gTq3$SS"
    ),
    accessExpiresIn: getValue("JWT_ACCESS_EXPIRES_IN", "30m"),
    refreshSecretKey: getValue(
      "JWT_REFRESH_SECRET_KEY",
      "oUUOfKw2@r9^WpN*iNmoQrLWZf0$z7mq"
    ),
    refreshExpiresIn: getValue("JWT_REFRESH_EXPIRES_IN", "7d"),
  },
  server: {
    port: getValue("PORT", 8080),
  },
};

module.exports = config;