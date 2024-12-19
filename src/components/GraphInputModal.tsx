import CancelIcon from "./CancelIcon";
import InputBox from "./InputBox";

interface GraphInputModalProps {}

const GraphInputModal: React.FC<GraphInputModalProps> = (
    {}: GraphInputModalProps
) => {
    return (
        <div>
            <div><CancelIcon /></div>
            <div><InputBox /></div>
        </div>
    )
}

export default GraphInputModal;
