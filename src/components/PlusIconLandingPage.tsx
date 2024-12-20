import {borderRadius_35_percent} from "../constants/borderRadius";
import Button from "./Button";

interface PlusIconLandingPageProps {}

const PlusIconLandingPage: React.FC<PlusIconLandingPageProps> = (
    {}: PlusIconLandingPageProps
) => {
    return (
        <Button
            label={'+'}
            padding = {'0px 30px 10px 30px'}
            borderRadius = {borderRadius_35_percent}
        />
    )
}

export default PlusIconLandingPage;
