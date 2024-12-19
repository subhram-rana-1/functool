import { CSSProperties } from "react"

interface AddEquationLabelProps {
    fontFamily: string;
    fontSize: string|number;
    fontColor: string;
    backgroundColor: string;
}

const AddEquationLabel: React.FC<AddEquationLabelProps> = (
    {
        fontFamily,
        fontSize,
        fontColor,
        backgroundColor,
    }: AddEquationLabelProps) => {
    const cssStylingProperties: CSSProperties = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: fontColor,
        backgroundColor: backgroundColor,
        display: "inline-block",
        padding: "2px",
        margin: "5px",
        borderRadius: "5px",
    }

    return (
        <div
            style={cssStylingProperties}
        >
            Add Equation
        </div>
    )
}

export default AddEquationLabel;
