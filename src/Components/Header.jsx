//import custom hook
import { useState } from 'react';
import { useCustom } from '../Context.jsx/CustomContext';

export default function Header() {

    //be available custom context variables
    const { search, setSearch, handleSubmit, selectGenre, select, setSelect } = useCustom()


    return (
        <>
            <header>
                <a href="../Pages/HomePage.jsx">
                    <h1>boolflix</h1>
                </a>

                <form onSubmit={handleSubmit}>

                    <input type="search" name="search" id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder='Cerca film/serie TV' />
                    <button type="submit">Cerca</button>

                    <select name="generi" id="genres" onChange={e => setSelect(e.target.value)}>
                        <option value="generic">Seleziona un genere</option>
                        {
                            selectGenre.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                        }
                    </select>

                </form>
            </header>
        </>
    )
}