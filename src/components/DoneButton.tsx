import {borderRadius_50_percent} from "../constants/borderRadius";
import Button from "./Button";
import {colorDarkGray, colorTransparent, colorWhite} from "../constants/colors";
import {fontSize20px} from "../constants/fontSizes";
import {fontWeight150} from "../constants/fontWeights";

interface DoneButtonProps {}

const DoneButton: React.FC<DoneButtonProps> = (
    {}: DoneButtonProps
) => {
    return (
        <Button
            label={'Done'}
            fontColor={colorWhite}
            padding = {'2px 40px 2px 40px'}
            backgroundColor={colorDarkGray}
        />
    )
}

export default DoneButton;
