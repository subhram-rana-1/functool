import {CSSProperties} from "react";
import {frontFamilySystemUI} from "../constants/fontFamilies";
import {colorGray2, colorGrayBG, colorTransparent, colorWhite} from "../constants/colors";
import {
    alignmentCenter,
    displayStyleFlex,
} from "../constants/displayStyles";
import {margin5px} from "../constants/margins";
import {fontWeight1} from "../constants/fontWeights";
import {fontSize120px, fontSize30px} from "../constants/fontSizes";
import '../assets/css/button.css';
import {cursorPointer} from "../constants/Cursors";
import {borderRadius_10px, borderRadius_35_percent, borderRadius_50_percent} from "../constants/borderRadius";

interface ButtonProps {
    label: string;
    fontSize?: string;
    fontColor?: string;
    fontFamily?: string;
    backgroundColor?: string;
    display?: string;
    padding?: string;
    margin?: string;
    fontWeight?: number;
    borderRadius?: string;
    width?: string;
}

const Button: React.FC<ButtonProps> = (
    {
        label,
        fontSize = fontSize30px,
        fontColor = colorGray2,
        fontFamily = frontFamilySystemUI,
        backgroundColor = colorGrayBG,
        display = displayStyleFlex,
        padding = '0px 5px 0px 5px',
        margin = margin5px,
        fontWeight = fontWeight1,
        borderRadius = borderRadius_10px,
    }: ButtonProps
) => {
    const cssStylingProperties: CSSProperties = {
        cursor: cursorPointer,
        border: 'none',
        justifyContent: alignmentCenter,
        alignItems: alignmentCenter,
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: fontColor,
        backgroundColor: backgroundColor,
        display: display,
        padding: padding,
        margin: margin,
        fontWeight: fontWeight,
        borderRadius: borderRadius,
    }

    return (
        <button
            style={cssStylingProperties}
            className='button'
        >
            {label}
        </button>
    )
}

export default Button;
