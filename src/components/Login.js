import { useRef, useState } from "react";
import { BG_URL } from "../utils/contants";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleBtnClick = () => {
    //Validate the form data
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );

    setErrorMessage(message);

    if (message) return;

    //Sign in/signup Logic

    if (!isSignInForm) {
      //Signup Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Signin Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:w-3/12 w-[80] absolute p-12 my-[85px] mx-auto right-0 left-0 bg-black bg-opacity-75 rounded-md text-white"
      >
        <h1 className="font-bold text-3xl py-2 pb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className="p-4 my-2 w-full rounded-lg bg-gray-900 bg-opacity-50"
            type="text"
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="p-4 my-2 w-full rounded-lg bg-gray-900 bg-opacity-50"
          type="text"
          placeholder="Email"
        ></input>
        <input
          ref={password}
          className="p-4 my-2 w-full rounded-lg bg-gray-900 bg-opacity-50"
          type="password"
          placeholder="Password"
        ></input>
        <p className="text-red-600">{errorMessage}</p>

        <button
          className="p-2 my-2 rounded-lg bg-red-600 hover:bg-red-700 w-full"
          onClick={handleBtnClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="p-2 cursor-pointer font-bold text-lg"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to NetFlix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
