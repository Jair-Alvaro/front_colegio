
function Content({children}){
    return(
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Panel</h1>
                    <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="index.html">Panel</a></li>
                            <li className="breadcrumb-item active">Admin</li>
                    </ol>
                    <div className="card mb-4">
                            <div className="card-body">
                                    {children}
                            </div>
                    </div>
                </div>
            </main>
    )
}

export default Content