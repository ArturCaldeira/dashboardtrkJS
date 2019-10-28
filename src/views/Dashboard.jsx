import React, { Component } from "react";
// import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Card } from "components/Card/Card.jsx";
import { isAuthenticated } from '../service/auth';
//import { StatsCard } from "components/StatsCard/StatsCard.jsx";
// import { Tasks } from "components/Tasks/Tasks.jsx";
/*import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import createPlotlyComponent from "react-plotly.js/factory";*/

import { legendPie, apiSimulationGPS /*, apiSimulationTemp */} from "variables/Variables.jsx";
import { DateTimePicker } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import Moment from 'moment'; import momentLocalizer from 'react-widgets-moment';
Moment.locale('en')
momentLocalizer()



var Plotly = require('plotly.js/lib/core');
Plotly.register([
  require('plotly.js/lib/heatmap'),
  require('plotly.js/lib/choropleth'),
  require('plotly.js/lib/scattergeo')
]);


// const Plot = createPlotlyComponent(Plotly);

let temperatureArray = [20];
let humidityArray = [50];
let date1;
let graphX = [];
let apiTemp;
let tempMaxVar;
let humidMaxVar;
let mesDTP;
let stringRequest = "2019-09-25 21:16:53";

const layoutMap = {
  autosize: false,
  width: 250,
  height: 250,
  margin: {
    l: 50,
    r: 0,
    b: 0,
    t: 0,
    pad: 0
  },
  geo: {
    projection: {
      type: 'orthographic',
      rotation: {
        lon: -54.00386,
        lat: -14.57529
      },
      scale: 2.5,
    },
    showocean: true,
    oceancolor: 'rgb(0, 255, 255)',
    showland: true,
    landcolor: 'rgb(230, 145, 56)',
    showlakes: true,
    lakecolor: 'rgb(0, 255, 255)',
    showcountries: true,
    lonaxis: {
      showgrid: true,
      gridcolor: 'rgb(102, 102, 102)'
    },
    lataxis: {
      showgrid: true,
      gridcolor: 'rgb(102, 102, 102)'
    }
  }
};

const layoutGraph = {
  margin: {
    t: 0,
  }
};

const dataMap = [{
  type: 'scattergeo',
  lat: [-23.9618, -10.8877],
  lon: [-46.3322, -61.9474],
  mode: 'lines',
  line: {
    width: 2,
    color: 'danger'
  }
}];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureMax: 0,
      humidityMax: 0,
      temperatureMin: -100,
      humidityMin: -100,
      graphMount: 0,
      dtpValue: "2019-09-25 21:16:53"
    };
    this.changeTemp = this.changeTemp.bind(this);
    this.queryAPIGPS = this.queryAPIGPS.bind(this);
    this.queryAPITemp = this.queryAPITemp.bind(this);
    this.popularArray = this.popularArray.bind(this);
    this.arredondar = this.arredondar.bind(this);
    this.montarGraph = this.montarGraph.bind(this);
    this.montarMap = this.montarMap.bind(this);
    // this.onLoadFirst = this.onLoadFirst.bind(this);
  }
  //intervalTemp = 0;
  changeTemp = async e => {
    // r = Math.floor(Math.random() * 2) + 1;
    // if (r === 1) {
    //   if (temperatureVar < 40) {
    //     temperatureVar++;
    //     if (temperatureVar > this.state.temperatureMax) {
    //       this.setState({
    //         temperatureMax: temperatureVar
    //       });
    //     }
    //   }
    // }
    // else {
    //   if (temperatureVar > -10)
    //     temperatureVar--;
    // }
    // r = Math.floor(Math.random() * 2) + 1;
    // if (r === 1) {
    //   if (humidityVar > 40)
    //     humidityVar--;
    // } else {
    //   if (humidityVar < 80)
    //     humidityVar++;
    // }
    if (e !== undefined) {
      mesDTP = e.toString().slice(4, 7)
      switch (mesDTP) {
        case "Jan": mesDTP = "01";
          break;
        case "Feb": mesDTP = "02";
          break;
        case "Mar": mesDTP = "03";
          break;
        case "Apr": mesDTP = "04";
          break;
        case "May": mesDTP = "05";
          break;
        case "Jun": mesDTP = "06";
          break;
        case "Jul": mesDTP = "07";
          break;
        case "Aug": mesDTP = "08";
          break;
        case "Sep": mesDTP = "09";
          break;
        case "Oct": mesDTP = "10";
          break;
        case "Nov": mesDTP = "11";
          break;
        case "Dec": mesDTP = "12";
          break;
        default: console.log("Error when trying to get month from DTP.");
      }
      stringRequest = `${e.toString().slice(11, 15)}-${mesDTP}-${e.toString().slice(8, 10)} ${e.toString().slice(16, 24)}`
      console.log(stringRequest);
    }

    apiTemp = await axios.post("http://54.187.204.12:8080/trk_query", {
      "id_rasp": "1",
      "id_sensors": "2",
      "start_date": stringRequest,
      "end_date": "2019-09-25 21:44:00"
    });
    apiTemp = apiTemp.data;
    console.log("datatimepicker= ");
    console.log(apiTemp);
    this.popularArray(apiTemp);
    //  console.log(apiSimulationTemp[0].status1);

    // temperatureArray.push(temperatureVar);
    // humidityArray.push(humidityVar);
    // timeNow = new Date();
    // graphX = [`${timeNow.getHours()}h${timeNow.getMinutes()}m${timeNow.getSeconds()}s`];

    // Plotly.extendTraces('graph1', { y: [[temperatureVar], [humidityVar]], x: [[graphX], [graphX]] }, [0, 1]);
    // count++;

    // if (count > 1200) {
    //   Plotly.relayout('graph1', {
    //     xaxis: {
    //       range: [count - 1200, count]
    //     }
    //   })
    // };
    // console.log(r);
  }

  queryAPIGPS = /* async */ x => {
    return apiSimulationGPS;
  };

  arredondar = (valor, precisao) => {
    var multiplicador = Math.pow(10, precisao || 0);
    return Math.round(valor * multiplicador) / multiplicador;
  }

  popularArray = data => {
    temperatureArray = [];
    humidityArray = [];
    graphX = [];
    for (var i = 1; i <= (data.length - 1); i++) {
      if (data[i].status1 > (data[i - 1].status1 + 10) || data[i].status1 < (data[i - 1].status1 - 10)) {
        temperatureArray.push(data[i].status1);
      }
      else {
        temperatureArray.push(data[i - 1].status1);
      }
      if (data[i].status2 > (data[i - 1].status2 + 10) || data[i].status2 < (data[i - 1].status2 - 10)) {
        humidityArray.push(data[i].status2);
      }
      else {
        humidityArray.push(data[i - 1].status2);
      }
      //date1 = `${(data[i].time).slice(17, 25)} ${(data[i].time).slice(5, 11)}`
      date1 = `${(data[i].time).slice(17, 25)}`
      graphX.push(date1);
    }
    tempMaxVar = this.arredondar(Math.max(...temperatureArray), 1);
    humidMaxVar = this.arredondar(Math.max(...humidityArray), 1);

    this.setState({
      temperatureMax: tempMaxVar,
      humidityMax: humidMaxVar,
      temperatureMin: this.arredondar(Math.min(...temperatureArray), 1),
      humidityMin: this.arredondar(Math.min(...humidityArray), 1)
    });

    if (this.state.graphMount === 0) {
      this.montarMap();
      this.montarGraph();
      this.setState({
        graphMount: 1
      });
    }
    else {
      Plotly.deleteTraces("graph1", [0,1]);
      Plotly.addTraces("graph1",[{
        y: temperatureArray,
        x: graphX,
        name: "Temperature",
        type: "line",
        marker: { color: 'red' }
      }, {
        y: humidityArray,
        x: graphX,
        name: 'Humidity',
        type: "line",
        marker: { color: 'blue' }
      }]);
    }
  }

  montarMap = x => {
    Plotly.plot("graphmap", dataMap, layoutMap);
  }

  montarGraph = x => {
    Plotly.plot('graph1', [{
      y: temperatureArray,
      x: graphX,
      name: "Temperature",
      type: "line",
      marker: { color: 'red' }
    }, {
      y: humidityArray,
      x: graphX,
      name: 'Humidity',
      type: "line",
      marker: { color: 'blue' }
    }], layoutGraph)
  }
  queryAPITemp = async x => {
    let requestpost = "asdasd";
    console.log(requestpost)
    return requestpost.data;
  }

  componentDidMount() {
    this.changeTemp();
    // this.intervalTemp = setInterval(this.changeTemp, 1000)
    // this.changeTemp();
  }

  componentWillUnmount() {
    this.setState({
      graphMount: 0
    });
    //clearInterval(this.intervalTemp);
  }
  // onLoadFirst = e => {
  //   Plotly.plot('graph1', [{
  //     y: [20],
  //     name: "Temperature",
  //     type: "line",
  //     marker: { color: 'red' }
  //   }, {
  //     y: [50],
  //     name: 'Humidity',
  //     type: "line",
  //     marker: { color: 'blue' }
  //   }])
  // }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        {isAuthenticated() === false ? this.props.history.push('/') : false}
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
            <div className="card card-stats">
                <div className="content">
                  <Row>
                    <Col xs={5}>
                      <div className="icon-big text-center icon-warning">
                        <i className="pe-7s-graph1 text-info" />
                      </div>
                    </Col>
                    <Col xs={7}>
                      <div className="numbers">
                        <p>Max Humid.</p>
                        {this.state.humidityMax} <h6>g/Kg</h6>
                      </div>
                    </Col>
                  </Row>
                  <div className="footer">
                    <hr />
                    <div className="stats">
                      <i className="fa fa-clock-o" /> Update now
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
            <div className="card card-stats">
                <div className="content">
                  <Row>
                    <Col xs={5}>
                      <div className="icon-big text-center icon-warning">
                        <i className="pe-7s-graph1 text-info" />
                      </div>
                    </Col>
                    <Col xs={7}>
                      <div className="numbers">
                        <p>Min Humid.</p>
                        {this.state.humidityMin} <h6>g/Kg</h6>
                      </div>
                    </Col>
                  </Row>
                  <div className="footer">
                    <hr />
                    <div className="stats">
                      <i className="fa fa-clock-o" /> Update now
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="card card-stats">
                <div className="content">
                  <Row>
                    <Col xs={5}>
                      <div className="icon-big text-center icon-warning">
                        <i className="pe-7s-graph1 text-danger" />
                      </div>
                    </Col>
                    <Col xs={7}>
                      <div className="numbers">
                        <p>Max Temp.</p>
                        {this.state.temperatureMax} <h6>ºC</h6>
                      </div>
                    </Col>
                  </Row>
                  <div className="footer">
                    <hr />
                    <div className="stats">
                      <i className="fa fa-clock-o" /> Update now
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div className="card card-stats">
                <div className="content">
                  <Row>
                    <Col xs={5}>
                      <div className="icon-big text-center icon-warning">
                        <i className="pe-7s-graph1 text-danger" data-fa-transform="rotate-180" />
                      </div>
                    </Col>
                    <Col xs={7}>
                      <div className="numbers">
                        <p>Min. Temp.</p>
                        {this.state.temperatureMin} <h6>ºC</h6>
                      </div>
                    </Col>
                  </Row>
                  <div className="footer">
                    <hr />
                    <div className="stats">
                      <i className="fa fa-clock-o" /> Update now
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Temperature and Humidity"
                category={<DateTimePicker defaultValue={new Date("2019","08","25","21","16")} onChange={e => { this.changeTemp(e) }} />}
                stats="Updated now"
                content={
                  <div className="ct-chart">
                    {/* <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    /> */}
                    {/* <Plot 
                      id='plot1'
                      data={[
                        {
                          y: [temperatureVar],
                          type: 'line',
                          mode: 'lines+points',
                          marker: { color: 'red' },
                        },
                        {
                          y: [humidityVar],
                          type: 'line',
                          mode: 'lines+points',
                          marker: { color: 'orange' },
                        }
                      ]}
                      layout={ {width: 1000, height: 240, title: 'Temperature and Humidity'}}
                    /> */}
                    <div id="graph1" className="ct-chart"></div>
                  </div>
                }
              />
            </Col>
            {/* <button onClick={this.onLoadFirst}>LOAD</button> */}
            {/* <button onClick={this.changeTemp}>CHANGE</button> */}
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Route taken"
                category="Since last load"
                stats="TRK sent 7 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart"
                  >
                    <div id="graphmap"></div>
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
}

export default Dashboard;
