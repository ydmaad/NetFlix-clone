import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { movieId, mediaType } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(`/${mediaType}/${movieId}`);
      console.log("request:::::", request);
      setMovie(request.data);
    };
    fetchData();
  }, [movieId, mediaType]);
  console.log("movieId:::", movieId);

  if (!movie.id) return <div>...loading</div>;
  return (
    <>
      <section>
        <img
          className="modal_poster-img"
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="poster"
        />
      </section>
    </>
  );
};

export default DetailPage;
