export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(JSON.stringify({ level: "info", message, timestamp: new Date().toISOString(), ...sanitize(context) }));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(JSON.stringify({ level: "error", message, timestamp: new Date().toISOString(), ...sanitize(context) }));
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(JSON.stringify({ level: "warn", message, timestamp: new Date().toISOString(), ...sanitize(context) }));
  },
};

function sanitize(context?: Record<string, unknown>) {
  if (!context) return {};
  const sanitized = { ...context };
  // Simple PII sanitization
  if (typeof sanitized.phone === "string") {
    sanitized.phone = sanitized.phone.replace(/(\d{3})\d+(\d{4})/, "$1****$2");
  }
  if (typeof sanitized.email === "string") {
    sanitized.email = sanitized.email.replace(/(.{2})(.*)(@.*)/, "$1****$3");
  }
  return sanitized;
}
