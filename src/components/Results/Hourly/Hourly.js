export function Hourly() {
    const hourly = [
        2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
    ]

    const handleWheel = (e) => {
    const delta = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
    const target = e.currentTarget;
    target.scrollLeft -= delta * 80;
    }
    return(
        <div className="hourly-weather col-12">
            <div onWheel={(e) => handleWheel(e)} className="hourly-wrapper col-10">
                {
                    hourly.map((item, i) => {
                        return(
                            <div key={i}>{item}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
