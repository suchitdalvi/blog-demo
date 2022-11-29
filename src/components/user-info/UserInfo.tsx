import React from "react";

import Profile from "../../assests/profile.jpeg";
import Image from "../../ui/image/Image";

export interface UserInfoProps {
  name: string;
  profilePhoto?: string;
}

export default function UserInfo({ name, profilePhoto }: UserInfoProps) {
  return (
    <div className="flex items-center">
      <div className="w-20 px-4">
        <Image
          src={profilePhoto ? profilePhoto : Profile}
          alt={name}
          classes="shadow rounded-full max-w-full h-auto align-middle border-none"
        />
      </div>

      <span className="mr-2">{name}</span>
    </div>
  );
}
