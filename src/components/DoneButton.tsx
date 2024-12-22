import Button from "./Button";
import {colorDarkGray2, colorWhite} from "../constants/colors";
import {fontWeight150} from "../constants/fontWeights";

interface DoneButtonProps {}

const DoneButton: React.FC<DoneButtonProps> = (
    {}: DoneButtonProps
) => {
    return (
        <Button
            label={'Done'}
            fontWeight={fontWeight150}
            fontColor={colorWhite}
            padding = {'2px 40px 2px 40px'}
            backgroundColor={colorDarkGray2}
        />
    )
}

export default DoneButton;
