import React, { useState, useEffect } from "react";

const url = "https://api.spacex.land/graphql/";

function useGraphQlapi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.data.launchesPast);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return data;
}

const graphql = JSON.stringify({
  query: `{launchesPast(limit: 20) {
    mission_name
    id
    launch_year
    launch_success
  }
}`,
});
const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: graphql,
};


function App() {
  const data = useGraphQlapi();
  return (
    <div>
      <h1>React Fetch data from GraphQL API</h1>
      <p>URL:{url}</p>
      <p>
        原本API接收資料會收到所有資料,使用GraphQL可以由前端決定要接收那些資料
      </p>
      <ul>
        {data.map((r) => (
          <li key={r.id}>{r.mission_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
