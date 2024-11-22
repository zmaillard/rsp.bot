import { type PostPayload, type ImagePayload, RichText } from "@skyware/bot";
import {
  type Sign,
  buildLink,
  buildLocationInformation,
  buildS3Key,
} from "./sign";
import { downloadImageFromS3 } from "./image";

export const buildPost = async (sign: Sign): Promise<PostPayload> => {
  const s3Key = buildS3Key(sign);
  const image = await downloadImageFromS3(s3Key);

  const richText = new RichText()
    .addLink(sign.title, buildLink(sign))
    .addText("\n")
    .addText(buildLocationInformation(sign));

  let imagePayload: ImagePayload = { alt: sign.title, data: image };

  return {
    text: richText,
    images: [imagePayload],
  };
};

