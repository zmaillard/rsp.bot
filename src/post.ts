import { type PostPayload, type ImagePayload, RichText } from "@skyware/bot";
import { Readable } from "stream";
import { type Sign, buildLink, buildLocationInformation, buildS3Key } from "./sign";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type NodeJsClient }   from "@smithy/types";

const s3Client = new S3Client() as NodeJsClient<S3Client>;

export const buildPost = async (sign:Sign):Promise<PostPayload> => {
    const s3Key = buildS3Key(sign);
    
    const richText = new RichText()
      .addLink(sign.title, buildLink(sign))
      .addText("\n")
      .addText(buildLocationInformation(sign));
      
    let imageBlob = await downloadImageFromS3(s3Key);

    let imagePayload:ImagePayload =  {alt: sign.title, data: imageBlob};

    return {
        text: richText,
        images: [imagePayload]
    }
}

const downloadImageFromS3 = async (url:string):Promise<Blob> => {
    const output =  await s3Client.send(new GetObjectCommand({
      Bucket: "sign",
      Key: url,
    })) ;   
    
    let resp = output.Body as Readable;
    let sink = new Bun.ArrayBufferSink();
    sink.start();
    for await (const chunk of resp) {
      sink.write(chunk);
    }
    let arrayBuffer = sink.end();
   
   return new Blob([arrayBuffer], {type: "image/jpeg"});
}
