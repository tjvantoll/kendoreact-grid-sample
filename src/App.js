import React from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

import { bikeStations } from "./data/bike-stations";

const BooleanCell = (props) => {
  return (
    <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
  )
}

export default function App() {

  const [dataState, setDataState] = React.useState({ skip: 0, take: 10 })
  const [result, setResult] = React.useState(process(bikeStations, dataState));

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(bikeStations, event.dataState));
  }

  return (
    <Grid
      data={result}
      filterable={true}
      onDataStateChange={onDataStateChange}
      pageable={true}
      total={bikeStations.length}
      {...dataState}
    >
      <GridColumn field="station_id" title="ID" />
      <GridColumn field="num_bikes_available" title="Bikes Available" />
      <GridColumn field="num_bikes_disabled" title="Bikes Disabled" />
      <GridColumn field="num_docks_available" title="Docks Available" />
      <GridColumn field="is_charging_station" title="Charging Station" cell={BooleanCell} />
      <GridColumn field="zone" title="Zone" />
    </Grid>
  );
}
