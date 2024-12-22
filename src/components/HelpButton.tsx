import Button from "./Button";
import {colorDarkGray2, colorWhite} from "../constants/colors";
import {fontWeight150} from "../constants/fontWeights";
import {fontSize20px, fontSize30px} from "../constants/fontSizes";
import {borderRadius_5px} from "../constants/borderRadius";

interface HelpButtonProps {}

const HelpButton: React.FC<HelpButtonProps> = (
    {}: HelpButtonProps
) => {
    return (
        <Button
            label={'Help'}
            fontSize={'15px'}
            fontWeight={fontWeight150}
            fontColor={colorWhite}
            padding = {'5px 10px 5px 10px'}
            backgroundColor={colorDarkGray2}
            borderRadius={borderRadius_5px}
        />
    )
}

export default HelpButton;
