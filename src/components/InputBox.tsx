import {CSSProperties} from "react";
import {alignmentCenter, displayStyleFlex} from "../constants/displayStyles";
import {colorDarkGray, colorGray, colorGrayBG} from "../constants/colors";
import {frontFamilySystemUI} from "../constants/fontFamilies";

interface InputBoxProps {}

const InputBox: React.FC<InputBoxProps> = (
    {

    }: InputBoxProps
) => {
    const cssStyling_inputBoxWrapperContainer: CSSProperties = {
        display: displayStyleFlex,
        justifyContent: alignmentCenter,
        borderRadius: "20px",
        border: `1px solid ${colorGray}`,
        backgroundColor: colorGrayBG,
        height: '30px',
    }

    const cssStyling_inputBox: CSSProperties = {
        display: displayStyleFlex,
        justifyContent: alignmentCenter,
        borderRadius: "20px",
        border: "none",
        fontFamily: frontFamilySystemUI,
        color: colorDarkGray,
        // width: '200px',
    }

    return (
        <div
            style={cssStyling_inputBoxWrapperContainer}
        >
            <input style={cssStyling_inputBox}
                   type="text"
                   placeholder="Enter fine name"
                   value={"asf"}
            />
        </div>
    )
}

export default InputBox;
