import { useState, useEffect } from "react"
import axios from "axios"
import EnglandFlag from './assets/img/flags_icons/england_flag.png'

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

  //state variable to contain the films
  const [series, setSeries] = useState([])
  //AJAX CALL to get the films and set the variable state
  function getSeries() {
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiUrl}&query=breaking+bad`)
      .then(res => {
        setSeries(res.data.results)
      })
  }


  //single array with both endpoints results
  const [allResults, setAllResults] = useState([])



  //invoke of both functions at load of the component
  useEffect(
    () => { getFilms(), getSeries() }, []
  )

  //update allresults array only when films and series change (view at the dependance)
  useEffect(() => {
    setAllResults([...films, ...series])
  }, [films, series])





  //static array to update the state
  // const [staticFilms, setStaticFilms] = useState(films)

  //link the input change to its value
  const [search, setSearch] = useState('')


  //handle the submit to filter the films by the search input
  function handleSubmit(e) {
    e.preventDefault()


    //link the reaserch into the searchbar to the films titles, filter the information to grab the films when the search is equal to a part of the title
    const searched = allResults.filter(result => (result.title || result.name).toLowerCase().includes(search.toLowerCase()))
    //update staticFilms state with the filtered array
    allResults = searched

    //when the search input is empty, update statifilms state tu empty
    if (search.length === 0) {
      allResults = ''
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="search" name="search" id="search" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Cerca</button>
      </form>

      {
        allResults.map(film => (
          <div key={film.id}>
            <p>{film.title}</p>
            <p>{film.original_title}</p>
            <p>Language:
              {
                film.original_language === 'en' ? <img src={EnglandFlag} alt="england_flag" width='20px' /> : film.original_language
              }
            </p>
            <p>{film.vote_average}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
