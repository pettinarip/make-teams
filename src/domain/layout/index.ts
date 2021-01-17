import { ILayout } from "../../containers/MakeTeam/types";

export function hasReachedMaxNumber(layouts: Array<ILayout>) {
  const max = Number(process.env.NEXT_PUBLIC_MAX_LAYOUT_AMOUNT!);
  return layouts.length >= max;
}
