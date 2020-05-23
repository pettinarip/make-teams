import domtoimage from "dom-to-image";

import { ID_ATTR as FIELD_ID_ATTR } from "../../../components/Field";

enum EImageExt {
  PNG = "png",
}

export default async function exportFieldToImage(
  __type: EImageExt = EImageExt.PNG
) {
  const fieldNode = document.getElementById(FIELD_ID_ATTR);

  if (fieldNode) {
    const dataURL = await domtoimage.toPng(fieldNode);
    const link = document.createElement("a");
    link.download = "team.png";
    link.href = dataURL;
    link.click();
  }
}
