import { useMutation } from "react-query";
import omit from "lodash.omit";

import { IPlayer, IPosition } from "../../containers/MakeTeam/types";
import { ShareLink } from "../../graphql/API";
import sdk from "../../graphql/sdk";

export interface IMutation {
  name: string;
  positions: Array<IPosition>;
}

export default function useCreateShareTeam() {
  return useMutation<ShareLink, Error, IMutation>(
    async ({ name, positions }): Promise<ShareLink> => {
      const cleanedPositions = positions.map((position: IPosition) => {
        if (position.player) {
          return {
            ...omit(position, ["id"]),
            player: omit(position.player, [
              "id",
              "createdAt",
              "createdBy",
            ]) as IPlayer,
          } as IPosition;
        } else {
          return omit(position, ["id"]) as IPosition;
        }
      });

      const response = await sdk.CreateShareLink({
        input: { name, positions: cleanedPositions },
      });

      return response.createShareLink;
    }
  );
}
