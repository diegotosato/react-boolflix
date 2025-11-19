import { useState, useEffect } from "react"
import axios, { all } from "axios"
import EnglandFlag from './assets/img/flags_icons/england_flag.png'


//import FontAwesome and the Star Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";



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
  const [staticAll, setStaticAll] = useState(allResults)

  //link the input change to its value
  const [search, setSearch] = useState('')


  //handle the submit to filter the films by the search input
  function handleSubmit(e) {
    e.preventDefault()

    //link the reaserch into the searchbar to the films titles, filter the information to grab the films when the search is equal to a part of the title
    const searched = allResults.filter(result => (result.title || result.name).toLowerCase().includes(search.toLowerCase()))
    //update results state with the filtered array
    setStaticAll(searched)

    //when the search input is empty, update statifilms state tu empty
    if (search.length === 0) {
      setStaticAll([])
    }

  }



  //function to create the stars, pass the average lika a parameter
  function printStars(vote) {

    //empty array to store the stars
    const stars = []

    //valutation to compare
    const valutation = [1, 2, 3, 4, 5]

    //cycle to compare the valutation with the average
    //if the valutation is minor then the average, fill the array with the starIcon

    for (let i = 0; i < valutation.length; i++) {

      //at cycle ZERO valutation is 1, average is keep from film average, in that case is 4 => 1 < 4 => fill the array with one icon
      if (valutation[i] <= vote) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} />)
      }

    }

    //return a span tag with an amount of stars like the film average
    return <span>{stars}</span>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="search" name="search" id="search" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Cerca</button>
      </form>

      {
        staticAll.map(item => (

          <div key={item.id}>

            {/* first part of the URL is the same, second part is object key poster_path */}
            <img src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} alt={item.id} />

            <p>
              {
                item.title || item.name
              }
            </p>

            <p>
              {
                item.original_title || item.original_name
              }
            </p>

            <p>Language:
              {
                item.original_language === 'en' ? <img src={EnglandFlag} alt="england_flag" width='20px' /> : item.original_language
              }
            </p>

            <p>
              {/* invoke the function to print stars, pass the average like parameter */}
              {/* avarage is round up to the nearest number (9.401 => 10), and divide by 2 to obtain votes between 1 and 5 */}
              {
                printStars(Math.ceil(item.vote_average / 2))
              }
            </p>
          </div>
        ))
      }
    </>
  )
}

export default App
