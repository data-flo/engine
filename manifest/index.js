const latestVesion = 3;

export default async function (prevDoc) {
  const docVersion = prevDoc.version || 0;

  let nextDoc = prevDoc;

  for (
    let versionNumber = docVersion + 1;
    versionNumber <= latestVesion;
    versionNumber++
  ) {
    const updator = await import(`./version-${versionNumber}`);
    nextDoc = updator.default(nextDoc);
  }

  return nextDoc;
}
