import './custom.scss'; // or `.scss` if you chose scss
import {useEffect, useState, useCallback} from "react";
import github from "./db";
import githubQuery from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";
import NavButtons from "./NavButtons";

function App() {
  let [userName, setUserName]=useState("");
  let [repoList, setRepoList]=useState(null);
  let [pageCount, setPageCount]=useState(10);
  let [queryString, setQueryString]=useState("");
  let [totalCount, setTotalCount]=useState(null);

  let [startCursor, setStartCursor]=useState(null);
  let [endCursor, setEndCursor]=useState(null);
  let [hasNextPage, setHasNextPage]=useState(true);
  let [hasPrevPage, setHasPrevPage]=useState(false);
  let [paginationKeyword, setPaginationKeyword]=useState("first");
  let [paginationString, setPaginationString]=useState("");
  var myList;

  const fetchData=useCallback(()=>{
    const queryText=JSON.stringify(githubQuery(pageCount, queryString, paginationKeyword, paginationString));
    fetch(github.baseURL, {
      method:"POST",
      headers:github.headers,
      body:queryText
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("myyyy dataaaa",data);
      const viewer=data.data.viewer;
      const repos=data.data.search.edges;
      const total=data.data.search.repositoryCount;

      const start=data.data.search.pageInfo.startCursor;
      const end=data.data.search.pageInfo.endCursor;
      const next=data.data.search.pageInfo?.hasNextPage;
      const prev=data.data.search.pageInfo?.hasPrevPage;

      setUserName(viewer.name);
      
      setStartCursor(start);
      setEndCursor(end);
      setHasNextPage(next);
      setHasPrevPage(prev);
      console.log("repoooolisttt",repos);

      setRepoList(repos);
      setTotalCount(total);

    })
    .catch(err=>{
      console.log(err);
    })
  }, [pageCount, queryString]);

  useEffect(
    ()=>{
      fetchData()
    },[fetchData]   
  )
  if(repoList){
    myList=(
    <ul className="list-group list-group-flush">
    {
      repoList.map(
        (repo)=>(
          <RepoInfo key={repo.node.id.toString()} repo={repo.node}></RepoInfo>
          
      ))
    }      
  </ul>);

  }

 
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i>
        Repose
      </h1>
      <p>Hey there {userName}</p>  
      <SearchBox totalCount={totalCount} pageCount={pageCount} queryString={queryString} onTotalChange={(totCount)=>{setPageCount(totCount)}} onQueryChange={(myString)=>{setQueryString(myString)}}/>
      <NavButtons start={startCursor} end={endCursor} prev={hasPrevPage} next={hasNextPage} onPage={(myKeyword, myString)=>
                                                                                              {setPaginationKeyword(myKeyword); 
                                                                                              setPaginationString(myString)}}/>
        
      {myList}
    </div>
  );
}

export default App;
