import {CSSProperties} from "react";
import {fontSize120px, fontSize20px} from "../constants/fontSizes";
import {colorDarkGray, colorGray2, colorGrayBG, colorTransparent} from "../constants/colors";
import {frontFamilyArial, frontFamilySystemUI} from "../constants/fontFamilies";
import {alignmentCenter, displayStyleFlex, displayStyleInlineBlock} from "../constants/displayStyles";
import {margin5px} from "../constants/margins";
import {fontWeight1, fontWeight100, fontWeight300} from "../constants/fontWeights";
import {borderRadius_35_percent} from "../constants/borderRadius";

interface CancelIconProps {
    fontSize?: string;
    fontColor?: string;
    label?: string
    fontFamily?: string;
    backgroundColor?: string;
    display?: string;
    padding?: string;
    margin?: string;
    fontWeight?: number;
    borderRadius?: string;
}

const CancelIcon: React.FC<CancelIconProps> = (
    {
        fontSize = fontSize20px,
        fontColor = colorDarkGray,
        fontFamily = frontFamilySystemUI,
        backgroundColor = colorTransparent,
        display = displayStyleInlineBlock,
        padding = '2px',
        margin = margin5px,
        fontWeight = fontWeight300,
        borderRadius = borderRadius_35_percent,
    }: CancelIconProps
) => {
    const cssStylingProperties: CSSProperties = {
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
        <div
            style={cssStylingProperties}
        >
            X
        </div>
    )
}

export default CancelIcon;
