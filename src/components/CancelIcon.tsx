import {borderRadius_50_percent} from "../constants/borderRadius";
import Button from "./Button";
import {colorGrayBG, colorTransparent} from "../constants/colors";
import {fontSize20px} from "../constants/fontSizes";
import {fontWeight150, fontWeight300} from "../constants/fontWeights";

interface CancelIconProps {}

const CancelIcon: React.FC<CancelIconProps> = (
    {}: CancelIconProps
) => {
    return (
        <Button
            label={'X'}
            fontWeight={fontWeight300}
            fontSize={fontSize20px}
            backgroundColor={colorGrayBG}
            borderRadius = {borderRadius_50_percent}
        />
    )
}

export default CancelIcon;
