import { createContext, useContext, useState, useEffect } from "react";
const CustomContext = createContext()
import axios, { all } from "axios"

//import FontAwesome and the Star Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
        () => { getFilms(), getSeries() }, [search]
    )

    //update allresults array only when films and series change (view at the dependance)
    useEffect(() => {
        setAllResults([...films, ...series])
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
                stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: "goldenrod" }} />)
            }

        }

        //return a span tag with an amount of stars like the film average
        return <span>{stars}</span>
    }



    return (
        <CustomContext.Provider value={{ allResults, setAllResults, staticAll, setStaticAll, search, setSearch, handleSubmit, printStars }}>
            {children}
        </CustomContext.Provider>
    )
}

function useCustom() {
    return useContext(CustomContext)
}

export { CustomProvider, useCustom }