const githubQuery={
    query:`
    { 
      viewer {
        name
        repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
            description
            id
            url
          }
        }
      }
    }
        `
    }

export default githubQuery;