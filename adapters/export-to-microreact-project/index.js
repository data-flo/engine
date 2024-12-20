const validUrl = require("valid-url");

const createMicroreactDocument = require("microreact.js/index.js");

const createProject = require("./utils/create-project.js");
const updateProject = require("./utils/update-project.js");
const getFileUrl = require("./utils/get-file-url.js");
const getProjectDoc = require("./utils/get-project-doc.js");

function cleanServerApi(url) {
  if (url.endsWith("/api/")) {
    return url.substring(0, url.length - 4);
  }

  if (url.endsWith("/api")) {
    return url.substring(0, url.length - 3);
  }

  return url;
}

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

async function create(dataUrl, treeUrl, networkUrl, serverApi, args) {
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
    serverApi,
    args["access token"],
    request,
  );

  return {
    id: response.id,
    url: response.url,
  };
}

async function update(projectId, dataUrl, treeUrl, networkUrl, serverApi, args) {
  const projectDoc = await getProjectDoc(
    serverApi,
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

  if (dataUrl) {
    if (dataFileId) {
      projectDoc.files[dataFileId] = newDocument.files["data-file-1"];
    }
  }

  let resetPanes = false;

  if (treeUrl) {
    const treeFileId = findFile(
      projectDoc.files,
      [ "text/x-nh" ],
    );
    if (treeFileId) {
      projectDoc.files[treeFileId] = newDocument.files["tree-file-1"];
    }
    else {
      projectDoc.files["tree-file-1"] = newDocument.files["tree-file-1"];
      projectDoc.trees = projectDoc.trees ?? {};
      projectDoc.trees["tree-1"] = newDocument.trees["tree-1"];
      resetPanes = true;
    }
  }

  if (networkUrl) {
    const networkFileId = findFile(
      projectDoc.files,
      [ "text/vnd.graphviz" ],
    );
    if (networkFileId) {
      projectDoc.files[networkFileId] = newDocument.files["network-file-1"];
    }
    else {
      projectDoc.files["network-file-1"] = newDocument.files["network-file-1"];
      projectDoc.networks = projectDoc.networks ?? {};
      projectDoc.networks["network-1"] = newDocument.networks["network-1"];
      resetPanes = true;
    }
  }

  if (resetPanes && projectDoc.panes.model) {
    delete projectDoc.panes.model;
  }

  const response = await updateProject(
    serverApi,
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
  if (!validUrl.isUri(args["server api"])) {
    throw new Error("Invalid Microreact API URL.");
  }

  const serverApi = cleanServerApi(args["server api"]);

  const dataUrl = await getFileUrl(
    serverApi,
    args["access token"],
    args["data file"],
    args["data url"],
  );

  const treeUrl = await getFileUrl(
    serverApi,
    args["access token"],
    args["tree file"],
    args["tree url"],
  );

  const networkUrl = await getFileUrl(
    serverApi,
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
      serverApi,
      args,
    );
  }
  else {
    response = await create(
      dataUrl,
      treeUrl,
      networkUrl,
      serverApi,
      args,
    );
  }

  return {
    id: response.id,
    url: response.url,
  };
};

module.exports.manifest = require("./manifest.js");
