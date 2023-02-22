export default function standardiseFormatString(formatString) {
  if (
    !formatString
    ||
    formatString.toUpperCase() === "ISO 8601"
    ||
    formatString.toUpperCase() === "ISO8601"
    ||
    formatString === "yyyy-MM-dd'T'HH:mm:ss'Z'"
    ||
    formatString === "yyyy-MM-dd'T'HH:mm:ssxxx"
  ) {
    return "";
  }

  return (
    formatString
      .replace(/Y/g, "y")
      .replace(/D/g, "d")
  );
};
