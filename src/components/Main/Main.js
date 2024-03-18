import Header from "./Header/Header";
import Search from "./Search/Search";
import Recent from "./Recent/Recent";


function Main() {
    return(
        <div className="container">
            <Header />
            <Search />
            <Recent />
        </div>
    )
}

export default Main;