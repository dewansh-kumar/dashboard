import avatar from "../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { useRecoilValue } from "recoil";
import { userAtomState } from "../store/user/userAtom";
export const Navbar = () => {
  const userInfo = useRecoilValue(userAtomState);
  return (
    <div className="flex justify-between border-lightTextColor border-[1px]">
      <div className=" w-[15%] border-r-lightTextColor border-r-[1px] p-3">
        <Logo />
      </div>
      <div className=" flex justify-between align-middle h-full w-[85%] p-3">
        <div className=" flex space-x-2 align-middle">
          <img src={avatar} alt="" className=" h-10 w-10" />
          <div className=" align-middle m-auto">
            <p className=" text-textColor text-sm font-semibold">
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <p className=" text-lightTextColor text-xs">Hello, welcome back!</p>
          </div>
        </div>

        {/* <div className=" flex align-middle justify-center bg-lightBackground rounded-md space-x-2 px-2">
          <FontAwesomeIcon
            icon={faSearch}
            className="  text-lightTextColor h-4 w-4 m-auto"
          />

          <Input
            placeholder="Search or type command"
            type="text"
            className=" bg-lightBackground rounded-md  xs:w-[14rem] md:w-[17rem] h-[2rem] text-textColor m-auto focus:outline-none text-sm "
          />
        </div> */}
      </div>
    </div>
  );
};
