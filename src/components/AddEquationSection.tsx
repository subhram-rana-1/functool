import {CSSProperties} from "react";
import PlusIcon from "./PlusIcon";
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
            <PlusIcon
                padding={'0px 28px 13px 31px'}
            />
            <AddEquationLabel />
        </div>
    )
}

export default AddEquationSection;
