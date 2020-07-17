import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

import data from "./data/bike-stations.json";
import { process } from "@progress/kendo-data-query";
import { Grid, GridColumn, GridColumnMenuCheckboxFilter } from "@progress/kendo-react-grid";

const createDataState = () => {
  return {
    
  }
}

function App() {
  const [bikeStations, setBikeStations] = React.useState(data.stations);
  const [skip, setSkip] = React.useState(0);
  const [take, setTake] = React.useState(20);
  const [result, setResult] = React.useState();
  const [dataState, setDataState] = React.useState();

  const onPageChange = (event) => {
    setSkip(event.page.skip);
    setTake(event.page.take);
  }

  const onDataStateChange = (event) => {
    this.setResult()
  }

  const CustomFilterMenu = (props) => {
    return (
      <GridColumnMenuCheckboxFilter
        {...props}
        data={bikeStations}
        expanded={true} />
    )
  }

  return (
    <>
      <Grid
        data={bikeStations.slice(skip, take + skip)}
        pageable={true}
        dataState={dataState}
        result={result}
        onPageChange={onPageChange}
        onDataStateChange={onDataStateChange}
        total={bikeStations.length}>
        <GridColumn field="station_id" title="ID" />
        <GridColumn field="num_bikes_available" title="Bikes Available" />
        <GridColumn field="num_bikes_disabled" title="Bikes Disabled" />
        <GridColumn field="num_docks_available" title="Docks Available" />
        <GridColumn field="is_charging_station" title="Charging Station" columnMenu={CustomFilterMenu} />
        <GridColumn field="zone" title="Zone" />
      </Grid>
    </>
  );
}

export default App;
