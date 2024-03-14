function cleanErrorMessage(err, args) {
  for (const key of ["message", "originalMessage", "shortMessage", "command", "escapedCommand", "spawnargs"]) {
    if (Array.isArray(err[key])) {
      for (let index = 0; index < err[key].length; index++) {
        err[key][index] = err[key][index].replace?.(
          args.password,
          "*".repeat(args.password.length),
        );
      }
    }
    else {
      err[key] = err[key].replace(
        args.password,
        "*".repeat(args.password.length),
      );
    }
  }
}

module.exports = cleanErrorMessage;
