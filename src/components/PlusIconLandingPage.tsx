import {borderRadius_35_percent} from "../constants/borderRadius";
import Button from "./Button";
import {fontSize120px} from "../constants/fontSizes";
import {Simulate} from "react-dom/test-utils";

interface PlusIconLandingPageProps {
    padding?: string;
}

const PlusIconLandingPage: React.FC<PlusIconLandingPageProps> = (
    {
        padding,
    }: PlusIconLandingPageProps
) => {
    return (
        <Button
            label={'+'}
            fontSize={fontSize120px}
            padding = {padding}
            borderRadius = {borderRadius_35_percent}
        />
    )
}

export default PlusIconLandingPage;
