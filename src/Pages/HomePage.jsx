//import country flag from react library
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

//import header component
import Header from '../Components/Header';



//import custom hook
import { useCustom } from '../Context.jsx/CustomContext';

export default function HomePage() {

    //be available custom context variables
    const { staticAll, setStaticAll, printStars, allGenres, select, setSelect } = useCustom()

    //funzione per stampare nelle card i generi del film/della serie tv
    function generi(item) {
        const raccolta = []
        // const confronto = []
        for (let i = 0; i < item.genre_ids.length; i++) {
            const id = item.genre_ids[i];
            // confronto.push(id)
            // console.log(confronto);

            for (let k = 0; k < allGenres.length; k++) {
                const genre = allGenres[k];
                // console.log(genre.id);

                if (genre.id == id) {
                    if (!raccolta.includes(genre.name)) {
                        raccolta.push(genre.name)
                    }
                }
            }
        }
        return raccolta.map(genere => genere + ' ')

    }





    return (
        <>
            <Header />

            <main>

                <div className="container">

                    <div className="row">

                        {
                            staticAll.map(item => (

                                <div key={item.id} className='card'>

                                    {/* first part of the URL is the same, second part is object key poster_path */}
                                    <img src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} alt={item.id} />

                                    <div className="details">

                                        <p>Title: <span className='title'>
                                            {
                                                item.title || item.name
                                            }
                                        </span>
                                        </p>

                                        <p>Original Title: <span className='original-title'>
                                            {
                                                item.original_title || item.original_name
                                            }
                                        </span>
                                        </p>

                                        <p className='language'>Language: {
                                            item.original_language === 'en' ?
                                                <ReactCountryFlag countryCode="SH" svg style={{ width: "20px", height: "20px" }} title="Italia" /> :
                                                item.original_language
                                        }
                                        </p>

                                        <p className='rating'>Voto: {
                                            printStars(Math.ceil(item.vote_average / 2))
                                        }
                                            {/* invoke the function to print stars, pass the average like parameter */}
                                            {/* avarage is round up to the nearest number (9.401 => 10), and divide by 2 to obtain votes between 1 and 5 */}
                                        </p>

                                        <p className='genres'>
                                            {
                                                // console.log(item.genre_ids, allGenres)
                                                <span>Generi: {generi(item)}</span>



                                            }
                                        </p>

                                        <p className='overview'>
                                            {
                                                item.overview
                                            }
                                        </p>



                                    </div>
                                    {/* /details */}

                                </div>
                            ))
                        }

                    </div>
                    {/* /row */}

                </div>
                {/* /container */}

            </main>
        </>
    )
}