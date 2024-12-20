import {borderRadius_50_percent} from "../constants/borderRadius";
import Button from "./Button";
import {colorTransparent} from "../constants/colors";
import {fontSize20px} from "../constants/fontSizes";
import {fontWeight150} from "../constants/fontWeights";

interface CancelIconProps {}

const CancelIcon: React.FC<CancelIconProps> = (
    {}: CancelIconProps
) => {
    return (
        <Button
            label={'X'}
            fontWeight={fontWeight150}
            fontSize={fontSize20px}
            backgroundColor={colorTransparent}
            borderRadius = {borderRadius_50_percent}
        />
    )
}

export default CancelIcon;
