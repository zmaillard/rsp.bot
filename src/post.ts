import type { PostPayload, ImagePayload } from "@skyware/bot";
import { type Sign, buildSignUrl, buildLocationInformation } from "./sign";

const buildPost = (sign:Sign):PostPayload => {
    const imageUrl = buildSignUrl(sign);

    let imagePayload:ImagePayload =  {alt: sign.title, data: imageUrl};
    return {
        text: sign.title,
        images: [imagePayload]
    }
}

/*
const title = item.title;

const titleRt = new RichText({ text: title });

let b = await r2Reference.blob();

const agent = new BskyAgent({
  service: "https://bsky.social",
});

await agent.login({
  identifier: env.BLUESKY_HANDLE,
  password: env.BLUESKY_PASSWORD,
});

const { data } = await agent.uploadBlob(b);

await agent.post({
  text: `${title}\n${buildDesc(item)}`,
  facets: [
    {
      index: {
        byteStart: 0,
        byteEnd: titleRt.length,
      },
      features: [
        {
          $type: "app.bsky.richtext.facet#link",
          uri: `https://roadsign.pictures/sign/${randomSign}`,
        },
      ],
    },
  ],
  embed: {
    $type: "app.bsky.embed.images",
    images: [
      {
        alt: title,
        image: data.blob,
      },
    ],
  },
  createdAt: new Date().toISOString(),
});
};
ctx.waitUntil(sendRandomSkeet(env));
},
};*/