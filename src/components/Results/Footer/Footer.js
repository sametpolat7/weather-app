import { Cards } from "./Cards/Cards";
import { Daily } from "./Daily/Daily";

export function Footer() {
    return(
        <div className="footer">
            <Cards />
            <Daily />
        </div>
    )
}
