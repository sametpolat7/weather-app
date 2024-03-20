import { Cards } from "./Cards/Cards";
import { Current } from "./Current/Current";
import { Hourly } from "./Hourly/Hourly";

function Results() {
    return (
        <>
            <Hourly />
            <Current />
            <Cards />
        </>
    )
}

export default Results;