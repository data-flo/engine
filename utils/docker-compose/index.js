const { spawn } = require("child_process");
const fs = require("fs");

function dockerComposeUp(folderPath) {
  const dockerComposeFilePath = `${folderPath}/docker-compose.yaml`;
  if (fs.existsSync(dockerComposeFilePath)) {
    const dockerProcessUp = spawn("docker-compose", ["up"], { cwd: folderPath });
    return dockerProcessUp;
  }
  else {
    console.error("Docker compose file does not exist");
  }
}

function dockerComposeDown(folderPath) {
  const dockerProcessDown = spawn("docker-compose", ["down"], { cwd: folderPath });
  return dockerProcessDown;
}
module.exports = { dockerComposeUp, dockerComposeDown };
