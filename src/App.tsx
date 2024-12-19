import AddEquation from "./components/AddEquationLabel"
import {colorWhite, colorBlack} from "./constants/colors"

function App() {
  return (
      <div>
        <AddEquation
            fontFamily={"Arial"}
            fontSize={"22px"}
            fontColor={colorWhite}
            backgroundColor={colorBlack}
        />
      </div>
  )
}

export default App
