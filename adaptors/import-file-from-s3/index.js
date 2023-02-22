import Minio  from "minio";
import Util  from "util";
import Path  from "path";
import { FileStream }  from "../../types/file";





export default async function (args) {
  const url = new URL(args.url);

  const minioClient = new Minio.Client({
    endPoint: url.hostname,
    port: parseInt(url.port, 10),
    useSSL: (url.protocol !== "http:"),
    accessKey: args["access key"],
    secretKey: args["secret key"],
  });

  const [ _, bucket, ...rest ] = url.pathname.split("/");

  const fGetObject = Util.promisify(minioClient.fGetObject).bind(minioClient);

  const file = await FileStream.createEmpty();

  await fGetObject(
    bucket,
    rest.join("/"),
    file.getSource(),
  );

  file.name = Path.basename(url.pathname);

  return { file };
};

export { default as manifest } from "./manifest";
