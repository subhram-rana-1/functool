import { CSSProperties } from "react"
import {margin10px, margin5px} from "../constants/margins";
import {
    alignmentCenter,
    displayStyleFlex,
} from "../constants/displayStyles";
import {padding2px} from "../constants/paddings";
import {colorGray, colorWhite} from "../constants/colors";
import {frontFamilySystemUI} from "../constants/fontFamilies";
import {fontWeight150} from "../constants/fontWeights";
import {labelAddEquation} from "../constants/labels";
import {fontSize30px} from "../constants/fontSizes";

interface AddEquationLabelProps {
    fontSize?: string;
    fontColor?: string;
    label?: string[]
    fontFamily?: string;
    backgroundColor?: string;
    display?: string;
    padding?: string;
    margin?: string;
    fontWeight?: number;
}

const AddEquationLabel: React.FC<AddEquationLabelProps> = (
    {
        fontSize = fontSize30px,
        fontColor = colorGray,
        label = labelAddEquation,
        fontFamily = frontFamilySystemUI,
        backgroundColor = colorWhite,
        display = displayStyleFlex,
        padding = padding2px,
        margin = margin5px,
        fontWeight = fontWeight150,
    }: AddEquationLabelProps) => {
    const cssStylingProperties: CSSProperties = {
        display: display,
        justifyContent: alignmentCenter,
        flexWrap: "wrap",
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: fontColor,
        backgroundColor: backgroundColor,
        padding: padding,
        margin: margin,
        fontWeight: fontWeight,
    }

    return (
        <div
            style={cssStylingProperties}
        >
            {label && label.map((text, index) => (
                <div style={{ marginRight: margin10px }} key={index}>{text}</div>
            ))}
        </div>
    )
}

export default AddEquationLabel;
