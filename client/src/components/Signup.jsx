import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import {
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "../validators/validator";
import { signupUser } from "../service/restApi";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [responseError, setResponseError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFieldChange = (event) => {
    var content = event.target.value;
    var field = event.target.name;

    if (field === "firstName") {
      setFirstName(content);
    } else if (field === "lastName") {
      setLastName(content);
    } else if (field === "email") {
      setEmail(content);
    } else if (field === "password") {
      setPassword(content);
    } else {
      setConfirmPassword(content);
    }
  };

  // validate during focus on input field
  const validateFields = (event) => {
    const finalError = {};
    const fieldName = event.target.name;

    setFieldErrors((prev) => ({ ...prev, [fieldName]: "" }));

    if (fieldName !== "firstName" && firstName.length > 0) {
      finalError.firstName = validateFirstName(firstName);
    }

    if (fieldName !== "lastName" && lastName.length > 0) {
      finalError.lastName = validateLastName(lastName);
    }

    if (fieldName !== "email" && email.length > 0) {
      finalError.email = validateEmail(email);
    }

    if (fieldName !== "password" && password.length > 0) {
      finalError.password = validatePassword(password);
    }

    if (fieldName !== "confirmPassword" && confirmPassword.length > 0) {
      finalError.confirmPassword = validateConfirmPassword(
        password,
        confirmPassword
      );
    }

    setFieldErrors(finalError);
  };

  // validate on signup button click
  const validateOnSignupClick = () => {
    const finalError = {};

    if (validateFirstName(firstName))
      finalError.firstName = validateFirstName(firstName);

    if (validateLastName(lastName))
      finalError.lastName = validateLastName(lastName);

    if (validateEmail(email)) finalError.email = validateEmail(email);

    if (validatePassword(password))
      finalError.password = validatePassword(password);

    if (validateConfirmPassword(password, confirmPassword))
      finalError.confirmPassword = validateConfirmPassword(
        password,
        confirmPassword
      );

    return finalError;
  };

  // Handle form submission
  const onUserRegister = async() => {
    const formErrors = validateOnSignupClick();
    setResponseError("");
    if (Object.keys(formErrors).length === 0) {
      // No errors, proceed with registration
      console.log("user registered");
      setLoading(true);
      try {
        // api call
        await signupUser(firstName, lastName, email, password, confirmPassword)
        navigate("/sign_in");
      } catch (error) {
        // set the response error if we are getting
        // setResponseError("user already exist");
      } finally {
        setLoading(false);
      }
    } else {
      setFieldErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" xs:w-[250px] sm:w-[400px] md:w-[500px] bg-lightBackground rounded-md px-6 py-4">
        <div>
          <h1 className="text-center xs:text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-bold text-textColor">
            Sign up
          </h1>
        </div>
        <div className="space-y-3 mt-6">
          <div>
            <Input
              placeholder="First Name"
              type="text"
              name="firstName"
              onChange={onFieldChange}
              onFocus={validateFields}
              className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-[80%] rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
            />
            {fieldErrors.firstName && (
              <div className=" flex align-middle justify-center">
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {fieldErrors.firstName}
                </p>
              </div>
            )}
          </div>
          <div>
            <Input
              placeholder="Last Name"
              type="text"
              name="lastName"
              onChange={onFieldChange}
              onFocus={validateFields}
              className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-[80%] rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
            />
            {fieldErrors.lastName && (
              <div className=" flex align-middle justify-center">
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {fieldErrors.lastName}
                </p>
              </div>
            )}
          </div>
          <div>
            <Input
              placeholder="Email id"
              type="email"
              name="email"
              onChange={onFieldChange}
              onFocus={validateFields}
              className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-[80%] rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
            />
            {fieldErrors.email && (
              <div className=" flex align-middle justify-center">
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {fieldErrors.email}
                </p>
              </div>
            )}
          </div>
          <div>
            <div className=" relative">
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={onFieldChange}
                onFocus={validateFields}
                className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-[80%] rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
              />
              <span
                className=" flex justify-center absolute right-[13%] top-[35%] text-textColor cursor-pointer xs:text-xs md:text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            {fieldErrors.password && (
              <div className=" flex align-middle justify-center">
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {fieldErrors.password}
                </p>
              </div>
            )}
          </div>

          <div>
            <div className=" relative">
              <Input
                placeholder="Confirm Password"
                type= {showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={onFieldChange}
                onFocus={validateFields}
                className="xs:h-[1.5rem] sm:h-[2rem] lg:h-[2.5rem] w-[80%] rounded-md focus:outline-none xs:text-xs sm:text-sm lg:text-lg px-2 bg-lightBackground border-[1px] border-textColor text-textColor"
              />
              <span
                className=" flex justify-center absolute right-[13%] top-[35%] text-textColor cursor-pointer xs:text-xs md:text-sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            {fieldErrors.confirmPassword && (
              <div className=" flex align-middle justify-center">
                <p className="text-red-500 text-xs text-start w-[80%]">
                  {fieldErrors.confirmPassword}
                </p>
              </div>
            )}
          </div>
          {responseError && (
            <div className="flex align-middle justify-center">
              <p className="text-red-500 text-xs text-center w-[80%]">
                {responseError}
              </p>
            </div>
          )}
        </div>
        <div className="mt-7">
          <Button
            content={loading ? "Signing up..." : "Sign up"} // Dynamic button text based on `loading`
            onClick={onUserRegister} // Event handler for registration
            className={`bg-primary w-[80%] rounded-md font-bold hover:bg-primaryLight text-textColor xs:text-sm sm:text-[1.2rem] md:text-[1.5rem] xs:py-2 sm:py-3 md:py-4`}
            disabled={loading} // Disable the button while loading
          />
        </div>
        <div className=" flex align-middle justify-center my-3">
          <hr className=" w-[80%]" />
        </div>
        <div>
          <p className=" text-center text-textColor">
            Already have an account?{" "}
            <span
              className=" text-primary font-bold cursor-pointer"
              onClick={() => {
                navigate("/sign_in");
              }}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
