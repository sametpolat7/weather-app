import { Footer } from "./Footer/Footer";
import { Current } from "./Current/Current";
import { Hourly } from "./Hourly/Hourly";

function Results() {
    return (
        <>
            <Hourly />
            <Current />
            <Footer />
        </>
    )
}

export default Results;