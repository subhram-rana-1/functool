import {CSSProperties} from "react";
import {frontFamilySystemUI} from "../constants/fontFamilies";
import {colorGray2, colorGrayBG, colorWhite} from "../constants/colors";
import {
    alignmentCenter,
    displayStyleFlex,
} from "../constants/displayStyles";
import {padding2px} from "../constants/paddings";
import {margin5px} from "../constants/margins";
import {fontWeight1} from "../constants/fontWeights";
import {fontSize120px} from "../constants/fontSizes";
import {borderRadius_35_percent} from "../constants/borderRadius";

interface PlusIconProps {
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

const PlusIcon: React.FC<PlusIconProps> = (
    {
        fontSize = fontSize120px,
        fontColor = colorGray2,
        fontFamily = frontFamilySystemUI,
        backgroundColor = colorGrayBG,
        display = displayStyleFlex,
        padding = '0px 30px 10px 30px',
        margin = margin5px,
        fontWeight = fontWeight1,
        borderRadius = borderRadius_35_percent,
    }: PlusIconProps
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
            +
        </div>
    )
}

export default PlusIcon;
