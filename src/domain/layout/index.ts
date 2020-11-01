import { ILayout } from "../../containers/MakeTeam/types"

export const MAX_LAYOUT_AMOUNT = 15

export function hasReachedMaxNumber(layouts: Array<ILayout>) {
  return layouts.length >= MAX_LAYOUT_AMOUNT
}