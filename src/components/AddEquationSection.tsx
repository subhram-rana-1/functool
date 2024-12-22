import {CSSProperties} from "react";
import PlusIconLandingPage from "./PlusIconLandingPage";
import AddEquationLabel from "./AddEquationLabel";
import {alignmentCenter, displayStyleFlex, flexDirectionColumn} from "../constants/displayStyles";

interface AddEquationSectionProps {}

const AddEquationSection: React.FC<AddEquationSectionProps> = (
    {}: AddEquationSectionProps
) => {
    const cssStylingProperties: CSSProperties = {
        display: displayStyleFlex,
        flexDirection: flexDirectionColumn,
        justifyContent: alignmentCenter,
        alignItems: alignmentCenter,
    }

    return (
        <div
            style={cssStylingProperties}
        >
            <PlusIconLandingPage
                padding={'0px 40px 13px 43px'}
            />
            <AddEquationLabel />
        </div>
    )
}

export default AddEquationSection;
