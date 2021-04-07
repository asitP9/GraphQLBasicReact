const NavButtons=({
    start, end, prev, next, onPage
})=>{
    return (
        <div className="d-flex justify-content-center my-2">
            {prev && (
                <button className="btn btn-sm mx-1 btn-primary bi bi-arrow-left" onClick={()=>onPage("last", '"before: "' + start + '""')}></button>
            )}
            {next && (
                <button className="btn btn-sm mx-1 btn-primary bi bi-arrow-right" onClick={()=>onPage("first", '"after: "' + end + '""')}></button>
            )}

        </div>
    )

}

export default NavButtons;