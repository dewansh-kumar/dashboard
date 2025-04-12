// first name validator
export const validateFirstName = (firstName) => {
  if (!firstName.trim()) {
    return "First name is required.";
  } else if (firstName.trim().length < 3) {
    return "Content is too short";
  }
};

// last name validator
export const validateLastName = (lastName) => {
  if (!lastName.trim()) {
    return "Last name is required.";
  } else if (lastName.trim().length < 3) {
    return "Content is too short";
  }
};

// Email validator
export const validateEmail = (email) => {
  if(!email) {
    return "Email id required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Please enter a valid email address";
  }
};

// password validator
export const validatePassword= (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,#^()_+=-])[A-Za-z\d@$!%*?&.,#^()_+=-]{8,}$/;

  if (!password) {
    return "Password is required";
  } else if (!passwordRegex.test(password)) {
    return "Must be at least 8 characters with at least one uppercase letter, one number, and one special character";
  }
};

// confirm password validator

export const validateConfirmPassword = (password, confirmPassword) => {
    if(!confirmPassword){
        return 'Confirm password is required'
    }else if(password !== confirmPassword){
        return "The passwords you entered do not match."
    }
  };