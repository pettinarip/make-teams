import { useState, useCallback } from "react";
import { Center } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { fetchShareTeam } from "../../dal/shareLink/useGetShareTeam";
import Controls from "../../components/Controls";
import FieldStatic from "../../components/FieldStatic";
import { IShareTeam } from "../../containers/MakeTeam/types";
import { GetServerSideProps } from "next";

interface IProps {
  shareTeam: IShareTeam;
}

export default function ViewShareLink({ shareTeam }: IProps) {
  const [showNames, setShowNames] = useState(true);

  const handleShowNamesChange = useCallback(() => {
    setShowNames((showNames) => !showNames);
  }, []);

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${shareTeam?.id}`;

  return (
    <Center flexDirection="column">
      <NextSeo
        title="Make a Team"
        description="Choose your team layout and build your team!"
        openGraph={{
          url: shareLink,
          title: "Make a Team",
          description: "Choose your team layout and build your team!",
          images: [
            {
              url: shareTeam.snapshotUrl || "",
              width: 130,
              height: 200,
              alt: "Share your team!",
            },
          ],
          site_name: "Make a Team",
        }}
        twitter={{
          // handle: "@handle",
          // site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <FieldStatic
        readonly
        showNames={showNames}
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

export const getServerSideProps: GetServerSideProps<
  { shareTeam?: IShareTeam },
  { shareId: string }
> = async ({ params }) => {
  if (params?.shareId) {
    const shareTeam = await fetchShareTeam(params?.shareId);
    return { props: { shareTeam } };
  }

  return { props: {} };
};
