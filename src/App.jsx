//import custom hook
import { CustomProvider } from "./Context.jsx/CustomContext";

//import HomePage
import HomePage from "./Pages/HomePage";

function App() {

  return (
    <>
      <CustomProvider>
        <HomePage />
      </CustomProvider>
    </>
  )
}

export default App
