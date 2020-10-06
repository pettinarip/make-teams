import { useState, useCallback } from "react";
import { Center } from "@chakra-ui/core";

import useGetShareTeam from "../../dal/shareLink/useGetShareTeam";
import Controls from "../../components/Controls";
import FieldStatic from "../../components/FieldStatic";
import { useRouter } from "next/router";

interface IProps {}

export default function ViewShareLink(__props: IProps) {
  const router = useRouter();
  const { data: shareTeam, isFetching } = useGetShareTeam(
    router.query.shareId as string
  );
  const [showNames, setShowNames] = useState(true);

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  return (
    <Center flexDirection="column">
      <FieldStatic
        readonly
        showNames={showNames}
        loading={isFetching}
        positions={shareTeam ? shareTeam.positions : []}
        onPositionDropInPosition={() => {}}
      />
      <Controls
        showNames={showNames}
        onShowNamesChange={handleShowNamesChange}
        mt={30}
      />
    </Center>
  );
}
