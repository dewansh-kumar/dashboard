import logo from "../assets/images/logo.png";
export const Logo = () => {
  return (
    <div className=" flex space-x-2">
      <img src={logo} alt="" className=" h-10 w-10" />
    </div>
  );
};
