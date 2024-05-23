import { LOGO, USER_AVATAR } from "../utils/contants";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/contants";
import { changeLanguage } from "../utils/configSlice";
import movieNames from "../utils/gptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //If User is signed in
        const { uid, email, displayName } = user.uid;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Reset GPT search state when navigating to the homepage
    if (location.pathname === "/") {
      dispatch(toggleGptSearchView(false));
    }
  }, [location.pathname]);

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute flex flex-col md:flex-row md:justify-between  px-8 py-1 bg-gradient-to-b from-black z-10 w-screen">
      <img className="w-40 md:mx-0 mx-auto" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2  justify-between">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-xl text-sm"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white m-2 mx-4 px-4 py-2 rounded-lg  bg-purple-600"
            onClick={handleGPTSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className=" w-12 h-11 mt-2" alt="usericon" src={USER_AVATAR} />
          <button className="font-bold text-white pl-4" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
