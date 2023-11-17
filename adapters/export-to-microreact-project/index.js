const createMicroreactDocument = require("microreact.js/index.js");

const createProject = require("./utils/create-project.js");
const updateProject = require("./utils/update-project.js");
const getFileUrl = require("./utils/get-file-url.js");
const getProjectDoc = require("./utils/get-project-doc.js");

function findFile(files, types) {
  for (const fileId of Object.keys(files)) {
    const file = files[fileId];
    if (types.includes(file.format)) {
      return fileId;
    }
  }
  return undefined;
}

function normaliseProjectUrl(projectUrlOrId) {
  let projectId = projectUrlOrId;
  {
    const match = projectUrlOrId.match(/^https?:\/\/.*\/project\/(.*)/i);
    if (match) {
      projectId = match[1];
    }
  }

  return projectId;
}

async function create(dataUrl, treeUrl, networkUrl, args) {
  const request = await createMicroreactDocument({
    name: args.name,
    description: args.description,

    data: dataUrl,
    tree: treeUrl,
    network: networkUrl,

    dataStream: args["data file"] ? args["data file"].getReader() : undefined,

    settings: {
      id: args["id column"],
      timeline_field: args["timeline column"],
      map_latitude: args["latitude column"],
      map_longitude: args["longitude column"],
    },
  });

  const response = await createProject(
    args["server api"],
    args["access token"],
    request,
  );

  return {
    id: response.id,
    url: response.url,
  };
}

async function update(projectId, dataUrl, treeUrl, networkUrl, args) {
  const projectDoc = await getProjectDoc(
    args["server api"],
    args["access token"],
    projectId,
  );

  const dataFileId = findFile(
    projectDoc.files,
    [
      "text/csv",
      "application/x-speadsheet",
    ],
  );

  const newDocument = await createMicroreactDocument({
    name: args.name,
    description: args.description,
    data: dataUrl,
    tree: treeUrl,
    network: networkUrl,
    dataStream: args["data file"] ? args["data file"].getReader() : undefined,
  });

  projectDoc.meta.name = newDocument.meta.name || projectDoc.meta.name;
  projectDoc.meta.description = newDocument.meta.description || projectDoc.meta.description;

  if (args.data) {
    if (dataFileId) {
      projectDoc.files[dataFileId] = newDocument.files["data-file-1"];
    }
  }

  if (args.tree) {
    const treeFileId = findFile(
      projectDoc.files,
      [ "text/x-nh" ],
    );
    if (treeFileId) {
      projectDoc.files[treeFileId] = newDocument.files["tree-file-1"];
    }
    else {
      projectDoc.files["tree-file-1"] = newDocument.files["tree-file-1"];
    }
  }

  if (args.network) {
    const networkFileId = findFile(
      projectDoc.files,
      [ "text/vnd.graphviz" ],
    );
    if (networkFileId) {
      projectDoc.files[networkFileId] = newDocument.files["network-file-1"];
    }
    else {
      projectDoc.files["network-file-1"] = newDocument.files["network-file-1"];
    }
  }

  const response = await updateProject(
    args["server api"],
    args["access token"],
    projectId,
    projectDoc,
  );

  return {
    id: response.id,
    url: response.url,
  };
}

module.exports = async function createMicroreactProject(args) {
  if (!(/^https?:\/\/.*\/api\//i).test(args["server api"])) {
    throw new Error("Invalid Microreact API URL.");
  }

  const dataUrl = await getFileUrl(
    args["server api"],
    args["access token"],
    args["data file"],
    args["data url"],
  );

  const treeUrl = await getFileUrl(
    args["server api"],
    args["access token"],
    args["tree file"],
    args["tree url"],
  );

  const networkUrl = await getFileUrl(
    args["server api"],
    args["access token"],
    args["network file"],
    args["network url"],
  );

  let response;

  if (args.project) {
    const projectId = normaliseProjectUrl(args.project);
    response = await update(
      projectId,
      dataUrl,
      treeUrl,
      networkUrl,
      args,
    );
  }
  else {
    response = await create(
      dataUrl,
      treeUrl,
      networkUrl,
      args,
    );
  }

  return {
    id: response.id,
    url: response.url,
  };
};

module.exports.manifest = require("./manifest.js");
