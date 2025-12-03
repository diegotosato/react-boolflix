import { createContext, useContext, useState, useEffect } from "react";
const CustomContext = createContext()
import axios, { all } from "axios"

//import FontAwesome and the Star Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

//customProvider
function CustomProvider({ children }) {

    //API KEY to get the films
    const apiUrl = import.meta.env.VITE_MOVIE_DB_API_KEY

    //link the input change to its value
    const [search, setSearch] = useState('')

    //state variable to contain the films
    const [films, setFilms] = useState([])
    //AJAX CALL to get the films and set the variable state
    function getFilms() {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiUrl}&query=${search}`)
            .then(res => {
                setFilms(res.data.results)
                // console.log(res.data.results[0].genre_ids);

            })
    }

    //state variable to contain the films
    const [series, setSeries] = useState([])
    //AJAX CALL to get the films and set the variable state
    function getSeries() {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiUrl}&query=${search}`)
            .then(res => {
                setSeries(res.data.results)
            })
    }




    //state variable to contain the genres
    const [filmGenres, setFilmGenres] = useState([])
    //AJAX CALL to get the films genres and set the variable state
    function getFilmGenres() {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiUrl}&language=en-EN`)
            .then(res => {
                setFilmGenres(res.data.genres)
            })
    }

    //state variable to contain the genres
    const [seriesGenres, setSeriesGenres] = useState([])
    //AJAX CALL to get the films genres and set the variable state
    function getSeriesGenres() {
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiUrl}&language=en-EN`)
            .then(res => {
                setSeriesGenres(res.data.genres)
            })
    }



    //single array with both endpoints results
    const [allResults, setAllResults] = useState([])

    //single array with both genres results
    const [allGenres, setAllGenres] = useState([])



    //invoke of both functions at load of the component
    useEffect(
        () => { getFilms(), getSeries(), getFilmGenres(), getSeriesGenres() }, [search]
    )

    //update allresults array only when films and series change (view at the dependance)
    useEffect(() => {
        setAllResults([...films, ...series]), setAllGenres([...filmGenres, ...seriesGenres]);

    }, [films, series])

    //static array to update the state
    const [staticAll, setStaticAll] = useState(allResults)






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
                stars.push(<FontAwesomeIcon key={i} icon={faStarSolid} style={{ color: "goldenrod" }} />)
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={faStarRegular} style={{ color: "goldenrod" }} />)
            }

        }

        //return a span tag with an amount of stars like the film average
        return <span>{stars}</span>
    }



    return (
        <CustomContext.Provider value={{ allResults, setAllResults, staticAll, setStaticAll, allGenres, search, setSearch, handleSubmit, printStars }}>
            {children}
        </CustomContext.Provider>
    )
}

function useCustom() {
    return useContext(CustomContext)
}

export { CustomProvider, useCustom }