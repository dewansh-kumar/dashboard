import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signinUser } from "../service/restApi";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const onFieldChange = (event) => {
    var content = event.target.value;
    var field = event.target.name;

    if (field === "email") {
      setEmail(content);
    } else if (field === "password") {
      setPassword(content);
    }
  };

  // validate the signin page

  const validateFields = () => {
    const finalError = {};
    // email validation
    if (!email) finalError.email = "Email id required";
    if (!password) finalError.password = "Password required";

    return finalError;
  };

  // this function will execute while clicking on signin button
  const onUserSignin = async () => {
    setFieldErrors({});
    setResponseError("");
    const formErrors = validateFields();

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        // do the signin api call
        await signinUser(email, password);
        navigate("/");
      } catch (error) {
        setResponseError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      setFieldErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="xs:w-[250px] sm:w-[400px] md:w-[500px] bg-lightBackground rounded-md px-6 py-4 flex items-center justify-center">
        <div className=" w-[80%]">
          <div>
            <h1 className="text-center xs:text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-bold text-textColor">
              Sign in
            </h1>
          </div>
          <div className="space-y-3 mt-6">
            <div>
              <Input
                placeholder="Enter your email"
                type="email"
                name="email"
                onChange={onFieldChange}
                className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-full rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
              />
              {fieldErrors.email && (
                <div className="">
                  <p className="text-red-500 text-xs text-start w-[80%]">
                    {fieldErrors.email}
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className=" relative">
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onFieldChange}
                  className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-full rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
                />
                <span
                  className=" flex justify-end  absolute top-[35%] right-[4%] text-textColor cursor-pointer xs:text-xs md:text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              {fieldErrors.password && (
                <div className="">
                  <p className="text-red-500 text-xs text-start w-[80%]">
                    {fieldErrors.password}
                  </p>
                </div>
              )}
            </div>

            {responseError && (
              <div>
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {responseError}
                </p>
              </div>
            )}
          </div>
          <div className="mt-7">
            <Button
              content={loading ? "Signing in..." : "Sign in"} // Dynamic button text based on `loading`
              onClick={onUserSignin} // Event handler for registration
              className={`bg-primary w-full rounded-md font-bold hover:bg-primaryLight text-textColor xs:text-sm sm:text-[1.2rem] md:text-[1.5rem] xs:py-2 sm:py-3 md:py-4`}
              disabled={loading} // Disable the button while loading
            />
          </div>
          <div className=" mt-2">
            <p className=" text-right text-textColor cursor-pointer xs:text-xs sm:text-sm lg:text-lg">
              Forgot password?
            </p>
          </div>
          <div className="my-3">
            <hr />
          </div>
          <div>
            <p className=" text-center text-textColor xs:text-xs sm:text-sm lg:text-lg">
              Don't have an account?{" "}
              <span
                className=" text-primary font-bold cursor-pointer"
                onClick={() => {
                  navigate("/sign_up");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
