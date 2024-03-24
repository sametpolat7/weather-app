import { SubResults } from './SubResults/SubResults'
import { Current } from "./Current/Current";
import { Hourly } from "./Hourly/Hourly";

function Results() {
    return (
        <>
            <Hourly />
            <Current />
            <SubResults />
        </>
    )
}

export default Results;