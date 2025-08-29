import React from "react";
import { useMe } from "../../../api/useMe";

export function ProfileName() {
  const { data: me, isLoading, isError } = useMe();

  const userName = isLoading ? "불러오는 중..." : me?.name ?? "";

  return (
    <div className="w-240px h-70px marginLeft-20px marginTop-30px">
      <p className="font-size-16 font-weight-b">{isError ? "" : userName}</p>
      <p className="font-size-14 marginTop--10px display-flex-alignItems-center">
        <img
          src="/images/icons/image-list.svg"
          alt=""
          className="profile-icon"
        />
        <span className="marginLeft-5px">0</span>
        <img
          src="/images/icons/heart.svg"
          alt=""
          className="marginLeft-10px profile-icon"
        />
        <span className="marginLeft-5px">0</span>
      </p>
    </div>
  );
}
