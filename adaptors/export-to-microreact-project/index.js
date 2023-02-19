const createMicroreactDocument = require("microreact.js");
const storeFile = require("mr.js/api-client/files/store");
const createProject = require("mr.js/api-client/projects/create");

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

async function createProject(data, tree, network, args) {
  const request = await createMicroreactDocument({
    name: args.name,
    description: args.description,

    data,
    tree,
    network,

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

async function getFileUrl(apiUrl, accessToken, file, url) {
  if (file) {
    const svaedUrl = await storeFile(
      apiUrl,
      accessToken,
      file.getReader(),
    );

    return svaedUrl;
  }

  if (url) {
    return url;
  }
}

module.exports = async function createMicroreactProject(args) {
  if ((/^https?:\/\/.*\/api/i).test(args["server api"])) {
    throw new Error("Invalid Microreact API URL.");
  }

  const dataUrl = getFileUrl(
    args["server api"],
    args["access token"],
    args["data file"],
    args["data url"],
  );

  if (args.project) {
    await updateProject(args);
  }
  else {
    await createProject(args);
  }

  let projectId = args.project;
  {
    const match = args.projectId.match(/^https?:\/\/.*\/project\/(.*)/i);
    if (match) {
      projectId = match[1];
    }
  }

  const apiUrl = args.api.endsWith("/") ? args.api.substr(0, args.api.length - 1) : args.api;

  const oldDocument = await context.request.postJson(
    `${apiUrl}/projects/json?project=${projectId}`,
    {},
    { "access-token": args["access token"].trim() },
  );

  const dataFileId = findFile(
    oldDocument.files,
    [
      "text/csv",
      "application/x-speadsheet",
    ],
  );

  const newDocument = await createMicroreactDocument({
    name: args.name,
    description: args.description,
    data: args.data ?? dataFileId.url,
    tree: args.tree,
    network: args.network,
  });

  oldDocument.meta.name = newDocument.meta.name ?? oldDocument.meta.name;
  oldDocument.meta.description = newDocument.meta.description ?? oldDocument.meta.description;

  if (args.data) {
    if (dataFileId) {
      oldDocument.files[dataFileId] = newDocument.files["data-file-1"];
    }
  }

  if (args.tree) {
    const treeFileId = findFile(
      oldDocument.files,
      [
        "text/x-nh",
      ],
    );
    if (treeFileId) {
      oldDocument.files[treeFileId] = newDocument.files["tree-file-1"];
    }
    else {
      oldDocument.files["tree-file-1"] = newDocument.files["tree-file-1"];
    }
  }

  if (args.network) {
    const networkFileId = findFile(
      oldDocument.files,
      [
        "text/vnd.graphviz",
      ],
    );
    if (networkFileId) {
      oldDocument.files[networkFileId] = newDocument.files["network-file-1"];
    }
    else {
      oldDocument.files["network-file-1"] = newDocument.files["network-file-1"];
    }
  }

  const response = await context.request.postJson(
    `${apiUrl}/projects/update?project=${projectId}`,
    oldDocument,
    { "access-token": args["access token"].trim() },
  );

  return {
    id: response.id,
    url: response.url,
  };
};

module.exports.manifest = require("./manifest");
