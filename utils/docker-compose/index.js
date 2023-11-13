const { spawn } = require("child_process");
const fs = require("fs");

async function dockerComposeUp(folderPath) {
  const dockerComposeFilePath = `${folderPath}/docker-compose.yaml`;
  if (fs.existsSync(dockerComposeFilePath)) {
    const process = await spawn("docker-compose", ["up", "-d"], { cwd: folderPath });
    return process;
  }
}

async function dockerComposeDown(folderPath) {
  const process = await spawn("docker-compose", ["down"], { cwd: folderPath });
  return process;

}
module.exports = { dockerComposeUp, dockerComposeDown };
