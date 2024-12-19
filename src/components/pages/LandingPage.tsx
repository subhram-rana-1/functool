import React, {CSSProperties} from "react";
import AddEquationSection from "../AddEquationSection";
import {alignmentCenter, displayStyleFlex, flexDirectionColumn} from "../../constants/displayStyles";

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = (
    {}: LandingPageProps
) => {
    const cssStylingProperties: CSSProperties = {
        display: displayStyleFlex,
        flexDirection: flexDirectionColumn,
        justifyContent: alignmentCenter,
        alignItems: alignmentCenter,
        height: '90vh',
    }

    return (
        <div
            style={cssStylingProperties}
        >
            <AddEquationSection/>
        </div>
    )
}

export default LandingPage;
