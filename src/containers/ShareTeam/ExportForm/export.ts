import isMobileOrTablet from "../../../utils/isMobileOrTablet";
import objectToGetParams from "../../../utils/objectToGetParams";

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
