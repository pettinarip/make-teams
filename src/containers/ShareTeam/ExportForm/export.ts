import domtoimage from "dom-to-image";

import isMobileOrTablet from "../../../utils/isMobileOrTablet";
import objectToGetParams from "../../../utils/objectToGetParams";
import { ID_ATTR as FIELD_ID_ATTR } from "../../../components/Field";

enum EImageExt {
  PNG = "png",
}

export async function exportFieldToImage(__type: EImageExt = EImageExt.PNG) {
  const fieldNode = document.getElementById(FIELD_ID_ATTR);

  if (fieldNode) {
    const dataURL = await domtoimage.toPng(fieldNode);
    const link = document.createElement("a");
    link.download = "team.png";
    link.href = dataURL;
    link.click();
  }
}

export function whatsappLink(text: string): string {
  return `https://${
    isMobileOrTablet() ? "api" : "web"
  }.whatsapp.com/send${objectToGetParams({
    text,
  })}`;
}

export function facebookLink(
  url: string,
  { quote, hashtag }: { quote?: string; hashtag?: string } = {}
) {
  return `https://www.facebook.com/sharer/sharer.php${objectToGetParams({
    u: url,
    quote,
    hashtag,
  })}`;
}

export function twitterLink(
  url: string,
  {
    title,
    via,
    hashtags = [],
    related = [],
  }: {
    title?: string;
    via?: string;
    hashtags?: string[];
    related?: string[];
  } = {}
) {
  return `https://twitter.com/share${objectToGetParams({
    url,
    text: title,
    via,
    hashtags: hashtags.length > 0 ? hashtags.join(",") : undefined,
    related: related.length > 0 ? related.join(",") : undefined,
  })}`;
}
