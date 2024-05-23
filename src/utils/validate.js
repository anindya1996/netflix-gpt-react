export const checkValidateData = (email, password) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordvalid =
    /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordvalid) return "Password is not valid";

  return null;
};

//  const isNamevalid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
// if (!isNamevalid) return "Name is not valid";
