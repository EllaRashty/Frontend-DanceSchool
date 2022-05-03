import admin from "./svgs/admin.svg";
import manager from "./svgs/manager.svg";
import player from "./svgs/player.svg";

export const AVATARS = {
  ADMIN: admin,
  MANAGER: manager,
  PLAYER: player,
};

export const USER_ROLES = {
  PLAYER: "PLAYER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
};

export const getAvatarByRole = (role) => {
  const Avatars = {
    [USER_ROLES.ADMIN]: AVATARS.ADMIN,
    [USER_ROLES.MANAGER]: AVATARS.MANAGER,
    [USER_ROLES.PLAYER]: AVATARS.PLAYER,
  };

  return Avatars[role];
};