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

    </>
  )
}

export default App
