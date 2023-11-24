const assert = require("node:assert");
const { before, after } = require("node:test");
const fs = require("node:fs");
const zlib = require("node:zlib");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");
const dotEnv = require("dotenv");
const isGzip = require("is-gzip");

function compareFile(filePath, expectedFileContent) {
  let actual = fs.readFileSync(filePath);
  if (isGzip(actual)) {
    actual = zlib.gunzipSync(actual);
  }
  actual = actual.toString("utf8");

  if (actual.startsWith("\ufeff")) {
    actual = actual.substring(1);
  }

  if (actual !== expectedFileContent) {
    console.error(actual);
  }

  return assert.equal(actual, expectedFileContent);
}

async function waitForPort(stdout) {
  const MAX_RETRIES = 120;
  let found = false;
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(
      () => {
        reject(new Error("Timed out waiting for services"));
      },
      MAX_RETRIES * 1000,
    );
    stdout.on("data", (data) => {
      if (data.toString().includes("[dataflo] service is up and running")) {
        found = true;
        clearTimeout(timeoutHandle);
        resolve();
      }
    });
    stdout.on("close", () => {
      clearTimeout(timeoutHandle);
      if (!found) {
        reject(new Error("Services did not start"));
      }
    });
  });
}

function dockerComposeDown(folderPath) {
  console.debug("Stopping services.");
  const dockerComposeProcess = spawnSync(
    "docker-compose",
    ["down", "--remove-orphans"],
    { cwd: folderPath },
  );
  return dockerComposeProcess;
}

async function dockerComposeUp(folderPath) {
  console.debug("Starting services.");

  const dockerComposeFilePath = path.join(
    folderPath,
    "docker-compose.yaml",
  );

  if (!fs.existsSync(dockerComposeFilePath)) {
    throw new Error("Docker compose file does not exist");
  }

  const dockerComposeProcess = spawn(
    "docker-compose",
    ["up", "--remove-orphans", "--force-recreate"],
    {
      cwd: folderPath,
      detached: false,
      stdio: "pipe",
    },
  );

  dockerComposeProcess.stderr.pipe(process.stderr);
  dockerComposeProcess.stdout.pipe(process.stdout);

  // dockerComposeProcess.on("exit", (code) => process.exit(code));

  process.on(
    "exit",
    () => dockerComposeDown(folderPath),
  );

  process.on(
    "SIGTERM",
    () => dockerComposeDown(folderPath),
  );

  process.on(
    "SIGINT",
    () => {
      dockerComposeDown(folderPath);
      process.exit();
    },
  );

  try {
    await waitForPort(dockerComposeProcess.stdout);
  }
  catch (e) {
    dockerComposeProcess.stdout.destroy();
    dockerComposeProcess.stdin.destroy();
    dockerComposeProcess.stderr.destroy();
    dockerComposeProcess.kill();
    throw e;
  }

  return dockerComposeProcess;
}

function setupServices(dirname) {
  before(() => dockerComposeUp(dirname));
  after(() => dockerComposeDown(dirname));
}

function loadEnv() {
  dotEnv.config({ path: path.resolve(__dirname, "../../.env.test") });
}

module.exports.setupServices = setupServices;
module.exports.dockerComposeDown = dockerComposeDown;
module.exports.dockerComposeUp = dockerComposeUp;
module.exports.loadEnv = loadEnv;

module.exports.compareFile = compareFile;
