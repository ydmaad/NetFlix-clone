import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SearchPage.css";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);

  // console.log("useLocation()", useLocation());
  // console.log("searchTerm", searchTerm);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adults=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.error("error:::", error);
    }
  };

  // const renderSearchResults = () => {
  //   return searchResults.length > 0 ? (
  //     <section className="search-container">
  //       {searchResults.map((movie) => {
  //         if (movie.backdrop_path !== null && movie.media_type !== "person") {
  //           const movieImageUrl =
  //             "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
  //           return (
  //             <div className="movie" key={movie.id}>
  //               <div className="movie_column-poster">
  //                 <img
  //                   src={movieImageUrl}
  //                   alt="movie-image"
  //                   className="movie_poster"
  //                 />
  //               </div>
  //             </div>
  //           );
  //         }
  //       })}
  //     </section>
  //   ) : (
  //     <section className="no-results">
  //       <div className="no-result_text">
  //         <p>
  //           찾고자하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.
  //         </p>
  //       </div>
  //     </section>
  //   );
  // };

  return (
    <>
      {searchResults.length > 0 ? (
        <section className="search-container">
          {searchResults
            .filter(
              (movie) =>
                movie.backdrop_path !== null && movie.media_type !== "person"
            )
            .map((movie) => {
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
              return (
                <Link
                  key={movie.id}
                  className="movie"
                  to={`/detail/${movie.media_type}/${movie.id}`}
                >
                  <div className="movie_column-poster">
                    <img
                      src={movieImageUrl}
                      alt="movie-image"
                      className="movie_poster"
                    />
                  </div>
                </Link>
              );
            })}
        </section>
      ) : (
        <section className="no-results">
          <div className="no-result_text">
            <p>
              찾고자하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;
