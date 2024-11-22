import { test, expect, describe, mock } from "bun:test";
import { downloadImageFromS3 } from "./image";
import { buildLocationInformation } from "./sign"
import { buildPost } from "./post";

describe("testing post creation", () => {
  test("create post", async () => {
    var sign = {
      imageid: "5023730498567716297",
      title: "US-90 West/LA-18 West at US-90/LA-18 Split",
      state: "Louisiana",
      place: "Nine Mile Point",
      county: "Jefferson Parish",
      country: "United States",
    };

    mock.module("./image",() => {
        return {
            downloadImageFromS3: () => {
                return new Blob();
            }
        }
    })
    
    const getLocation = buildLocationInformation(sign);
    
    const post = await buildPost(sign);
    expect(post.images?.[0]?.alt).toBe(sign.title);
    post.text.toString().includes(sign.title);
    post.text.toString().includes(getLocation);
    post.text.toString().includes("<a href='https://roadsign.pictures/sign/5023730498567716297'>US-90 West/LA-18 West at US-90/LA-18 Split</a>");
  });
});
