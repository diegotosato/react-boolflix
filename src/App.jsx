import { useState, useEffect } from "react"
import axios from "axios"

function App() {

  const apiUrl = import.meta.env.VITE_MOVIE_DB_API_KEY
  const [films, setFilms] = useState([])

  function getFilms() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiUrl}&query=un+weekend+da+bamboccioni`)
      .then(res => {
        setFilms(res.data.results)
      })
  }


  useEffect(getFilms, [])
  console.log(films);


  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="search" />
        <button type="submit">Cerca</button>
      </form>

      {
        films.map(film => (
          <div key={film.id}>
            <p>{film.title}</p>
            <p>{film.original_title}</p>
            <p>{film.original_language}</p>
            <p>{film.vote_average}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
