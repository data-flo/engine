const assert = require("node:assert");
const { before, after } = require("node:test");
const fs = require("node:fs");
const zlib = require("node:zlib");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

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

  return assert.equal(actual, expectedFileContent);
}

async function waitForPort(port = 8000) {
  console.log("Waiting for services...");
  const MAX_RETRIES = 20;
  for (let index = 0; index < MAX_RETRIES; index++) {
    try {
      const response = await fetch("http://localhost:8000");
      if (response.ok) {
        return true;
      }
    }
    catch (err) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
  }
  throw new Error(`Timed out waiting for port ${port}`);
}

function dockerComposeDown(folderPath) {
  console.log("Stopping services.");
  const dockerComposeProcess = spawnSync(
    "docker-compose",
    ["down", "--remove-orphans"],
    { cwd: folderPath },
  );
  return dockerComposeProcess;
}

async function dockerComposeUp(folderPath) {
  console.log("Starting services.");

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

  await waitForPort();

  return dockerComposeProcess;
}

function setupServices(dirname) {
  before(() => dockerComposeUp(dirname));
  after(() => dockerComposeDown(dirname));
}

module.exports.setupServices = setupServices;
module.exports.dockerComposeDown = dockerComposeDown;
module.exports.dockerComposeUp = dockerComposeUp;

module.exports.compareFile = compareFile;
