//import custom hook
import { useCustom } from '../Context.jsx/CustomContext';

export default function Header() {

    //be available custom context variables
    const { search, setSearch, handleSubmit } = useCustom()


    return (
        <>
            <header>
                <h1>boolflix</h1>
                <form onSubmit={handleSubmit}>
                    <input type="search" name="search" id="search" value={search} onChange={e => setSearch(e.target.value)} />
                    <button type="submit">Cerca</button>
                </form>
            </header>
        </>
    )
}