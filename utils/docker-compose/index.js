const { exec, execSync } = require("child_process");
const fs = require("fs");

async function waitForPort(port = 8000) {
  const MAX_RETRIES = 3;

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
  const dockerProcessDown = execSync("docker-compose down", { cwd: folderPath });
  return dockerProcessDown;
}

async function dockerComposeUp(folderPath) {
  const dockerComposeFilePath = `${folderPath}/docker-compose.yaml`;
  if (!fs.existsSync(dockerComposeFilePath)) {

    throw new Error("Docker compose file does not exist");
  }
  const dockerProcessUp = exec("docker-compose up -d", { cwd: folderPath });
  process.on("exit", () => dockerComposeDown(folderPath));
  await waitForPort();
  return dockerProcessUp;
}

module.exports = dockerComposeUp;
