const RepoInfo=({repo, key})=>{
    let license;
    switch(repo.licenseInfo?.spdxId){
        case undefined: 
                     license=(                          
                                <span
                                className={
                                    "px-1 py-0 mr-1 d-inline-block btn btn-sm btn-danger"
                                }
                                style={{fontSize:"0.6em"}}>NO LICENSE</span>
                            );
                            break;
        case "NOASSERTION":
                    license=(                          
                        <span
                        className={
                            "px-1 py-0 mr-1 d-inline-block btn btn-sm btn-warning"
                        }
                        style={{fontSize:"0.6em"}}>{repo.licenseInfo.spdxId}</span>
                    );
                    break;
        default:
            license=(
                <span className={
                            "px-1 py-0 mr-1 d-inline-block btn btn-sm btn-outline-success"
                        }
                        style={{fontSize:"0.6em"}}>{repo.licenseInfo.spdxId}</span>
                    );
                    break;                    

    };
    console.log("repooo ", repo);
            return (
                <li className="list-group-item" key={key}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                                {repo.name}
                            </a>
                            <p className="small">{repo.description}</p>
                        </div>
                        <div className="ms-3 text-nowrap">
                            {license}
                            <span
                            className={
                                "px-1 py-0 ms-1 d-inline-block btn btn-sm"+(
                                    repo.viewerSubscription==="SUBSCRIBED"?' btn-success':' btn-outline-secondary'
                                )
                            }
                            style={{fontSize:"0.6em"}}>{repo.viewerSubscription}</span>
                        </div>
                    </div>
                  
                </li>
            )
}

export default RepoInfo;