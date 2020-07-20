import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { orderBy } from "@progress/kendo-data-query";
import "./App.css";

import data from "./data/bike-stations.json";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

const BooleanCell = (props) => {
  return (
    <td>{props.dataItem.is_charging_station ? "✅" : "❌"}</td>
  );
}

function App() {
  const bikeStations = data.stations;

  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(20);
  const [sortConfig, setSortConfig] = React.useState([
    { field: "station_id", dir: "asc" }
  ]);

  const getStations = () => {
    const sortedStations = orderBy(bikeStations, sortConfig);
    return sortedStations.slice(skip, take + skip);
  }

  const onPageChange = (event) => {
    setSkip(event.page.skip);
    setTake(event.page.take);
  }

  const onSortChange = (event) => {
    setSortConfig(event.sort)
  }

  return (
    <>
      <Grid
        data={getStations()}
        pageable={true}
        sortable
        sort={sortConfig}
        skip={skip}
        take={take}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        total={bikeStations.length}>
        <GridColumn field="station_id" title="ID" />
        <GridColumn field="num_bikes_available" title="Bikes Available" />
        <GridColumn field="num_bikes_disabled" title="Bikes Disabled" />
        <GridColumn field="num_docks_available" title="Docks Available" />
        <GridColumn field="is_charging_station" title="Charging Station" cell={BooleanCell} />
        <GridColumn field="zone" title="Zone" />
      </Grid>
    </>
  );
}

export default App;
