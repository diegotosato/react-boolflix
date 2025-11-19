import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  //API KEY to get the films
  const apiUrl = import.meta.env.VITE_MOVIE_DB_API_KEY
  //state variable to contain the films
  const [films, setFilms] = useState([])

  //AJAX CALL to get the films and set the variable state
  function getFilms() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiUrl}&query=un+weekend+da+bamboccioni`)
      .then(res => {
        setFilms(res.data.results)
      })
  }
  //do the call immediatly at the mount of the component
  useEffect(getFilms, [])






  //static array to update the state
  const [staticFilms, setStaticFilms] = useState(films)
  console.log(staticFilms);

  //link the input change to its value
  const [search, setSearch] = useState('')
  console.log(search);


  //handle the submit to filter the films by the search input
  function handleSubmit(e) {
    e.preventDefault()
    //link the reaserch into the searchbar to the films titles, filter the information to grab the films when the search is equal to a part of the title
    const searched = films.filter(film => film.title.toLowerCase().includes(search.toLowerCase()))
    //update staticFilms state with the filtered array
    setStaticFilms(searched)

    //when the search input is empty, update statifilms state tu empty
    if (search.length === 0) {
      setStaticFilms([])
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="search" name="search" id="search" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Cerca</button>
      </form>

      {
        staticFilms.map(film => (
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
