import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import { process } from "@progress/kendo-data-query";
import "./App.css";

import data from "./data/bike-stations.json";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

function App() {
  const bikeStations = data.stations;

  const [dataState, setDataState] = React.useState({ group: [{ field: "zone" }]})
  const [result, setResult] = React.useState(process(bikeStations, dataState));

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(bikeStations, event.dataState));
  }

  const onExpandChange = (event) => {
    event.dataItem[event.target.props.expandField] = event.value;
    setResult(Object.assign({}, result));
  }

  return (
    <>
      <Grid
        data={result}
        onDataStateChange={onDataStateChange}
        groupable={true}
        filterable={true}
        expandField="expanded"
        onExpandChange={onExpandChange}
        editField="inEdit"
        { ...dataState }
        >
        <GridColumn field="station_id" title="ID" filter="numeric" />
        <GridColumn field="num_bikes_available" title="Bikes Available" filter="numeric" />
        <GridColumn field="num_bikes_disabled" title="Bikes Disabled" />
        <GridColumn field="num_docks_available" title="Docks Available" />
        <GridColumn field="is_charging_station" filter="boolean" title="Charging Station" />
        <GridColumn field="zone" title="Zone" />
      </Grid>
    </>
  );
}

export default App;
