//import country flag from react library
import React from 'react';
import ReactCountryFlag from 'react-country-flag';



//import custom hook
import { useCustom } from '../Context.jsx/CustomContext';

export default function HomePage() {

    //be available custom context variables
    const { staticAll, search, setSearch, handleSubmit, printStars } = useCustom()

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
                                item.original_language === 'en' ?
                                    <ReactCountryFlag countryCode="SH" svg style={{ width: "20px", height: "20px" }} title="Italia" /> :
                                    item.original_language
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