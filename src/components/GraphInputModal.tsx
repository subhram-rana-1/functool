import CancelIcon from "./CancelIcon";
import InputBox from "./InputBox";
import Button from "./Button";
import DoneButton from "./DoneButton";
import HelpButton from "./HelpButton";
import DoubleRangeSlider from "./DoubleRangeSlider";
import ColorSelector from "./ColorSelector";

interface GraphInputModalProps {}

const GraphInputModal: React.FC<GraphInputModalProps> = (
    {}: GraphInputModalProps
) => {
    return (
        <div>
            <div><CancelIcon /></div>
            <div><InputBox /></div>
            <div><Button label={'Subscribe channel'} /></div>
            <div><DoneButton /></div>
            <div><HelpButton /></div>
            <div><DoubleRangeSlider /></div>
            <div><ColorSelector /></div>
        </div>
    )
}

export default GraphInputModal;
