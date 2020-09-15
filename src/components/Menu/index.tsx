/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Menu as MenuSemantic } from "semantic-ui-react";
import { navigate } from "@reach/router";

import useAuth from "../../domain/user/useAuth";
import useLogout from "../../dal/user/useLogout";

export default function Menu() {
  const { user } = useAuth();
  const [logout] = useLogout();

  const username = getUsername(user);

  async function handleSignOut() {
    await logout();
    navigate("/login");
  }

  return (
    <MenuSemantic
      pointing
      text
      secondary
      css={css`
        margin-bottom: 50px !important;
      `}
    >
      <MenuSemantic.Item name="home" active />
      <MenuSemantic.Menu position="right">
        <MenuSemantic.Item active={false}>{username}</MenuSemantic.Item>
        <MenuSemantic.Item
          name="sign out"
          active={false}
          onClick={handleSignOut}
        />
      </MenuSemantic.Menu>
    </MenuSemantic>
  );
}

function getUsername(user: any): string {
  if (!user) return "";
  return user.attributes ? user.attributes.email : user.username;
}
