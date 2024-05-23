import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/contants";
import { json } from "react-router-dom";
import { addGptMovieResult } from "../utils/gptSlice";
import { useEffect } from "react";
import { clearGptMovieResults } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    // console.log(searchText.current.value);

    //Make an api call to GPT API and get Movie results

    // const gptQuery =
    //   "Act as a Movie Recommendation system and suggest some movies for the query" +
    //   searchText.current.value +
    //   ".Only give me 10 movies, comma separated. like the example result given ahead. Example Result:Gadar,Animal,Sholey,Don,Sam Bahadur";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    // console.log(gptResults.choices?.[0]?.message?.content);
    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const gptMovies = [
      "Animal",
      "Sam bahadur",
      "Dhol",
      "12th Fail",
      "3 Idiots",
      "The Godfather",
      "Namaste London",
    ];

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center px-2 md:px-0">
      <form
        className="w-full md:w-1/2 bg-black bg-opacity-80 grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-2 m-[14px] col-span-9 text-lg text-center"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="col-span-3 m-[12px] md:m-4 md:py-2 text-xl bg-red-700 text-white rounded-lg hover:bg-red-600"
          onClick={handleGPTSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
