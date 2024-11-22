import { Readable } from "stream";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type NodeJsClient } from "@smithy/types";

export const downloadImageFromS3 = async (url: string): Promise<Blob> => {
  const s3Client = new S3Client() as NodeJsClient<S3Client>;
  const output = await s3Client.send(
    new GetObjectCommand({
      Bucket: "sign",
      Key: url,
    })
  );

  let resp = output.Body as Readable;
  let sink = new Bun.ArrayBufferSink();
  sink.start();
  for await (const chunk of resp) {
    sink.write(chunk);
  }
  let arrayBuffer = sink.end();

  return new Blob([arrayBuffer], { type: "image/jpeg" });
};