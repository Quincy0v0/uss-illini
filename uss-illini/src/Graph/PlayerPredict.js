import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText } from 'reactstrap';
import Plot from 'react-plotly.js';
import { Container, Row, Col } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class PlayerPredict extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        /*
        var data = this.props.data;
        var flag = false;
        for (var i = 0 ; i < 6 ; i ++){
            if (data[i] == undefined || data[i].length == 0) {flag = true;}
        }
        if (data == undefined || data.length == 0 || flag == true){
            return (<div/>);
        }else{
        var nationdata = [];
        for(var i = 0; i < data[0].length; i++){
          nationdata.push({
              battles : data[0][i]['battles'],
              survival : data[3][i]['survival'],
              nation : data[0][i]['nation'],
            }
          )
        }
        var typedata = [];
        for(var i = 0; i < data[1].length; i++){
          typedata.push({
              battles : data[1][i]['battles'],
              survival : data[4][i]['survival'],
              type : data[1][i]['type'],
            }
          )
        }
        var linedata = [];
        for(var i = 0; i < data[2].length; i++){
          linedata.push({
              battles : data[2][i]['battles'],
              survival : data[5][i]['survival'],
              nation : data[2][i]['nation'],
              type : data[2][i]['type'],
            }
          )
        }*/
        var data1 = this.props.data1;
        var data2 = this.props.data2;
        var data3 = this.props.data3;
        var data4 = this.props.data4;
        var data5 = this.props.data5;
        var data6 = this.props.data6;
        if (data1 == undefined || data1.length == 0 || data2 == undefined || data2.length == 0 || data3 == undefined || data3.length == 0 || data4 == undefined || data4.length == 0 || data5 == undefined || data5.length == 0 || data6 == undefined || data6.length == 0){
            return (<div/>);
        }else{
        var nationdata = [];
        var battleGraphlayout = {
            title: '#Battle',
            height: 400,
            width: 500,
        };
        var nationLabel = [];
        var nationBattles = [];
        var nationSurvival = [];
        var survivalGraphlayout = {
            title: 'Survival Rate',
            height: 400,
            width: 500,
        };
        for(var i = 0; i < data1.length; i++){
          nationLabel.push(data1[i]['nation']);
          nationBattles.push(data1[i]['battles']);
          nationSurvival.push(data4[i]['survival']);
          nationdata.push({
              battles : data1[i]['battles'],
              survival : data4[i]['survival'],
              nation : data1[i]['nation'],
            }
          );
        }
        var nationBarData = [{
            y: nationSurvival,
            x: nationLabel,
            type: 'bar',
            name: '#Battles',
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }];
        var nationPieData = [{
            values: nationBattles,
            labels: nationLabel,
            type: 'pie',
            name: '#Battles',
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }];

        var typedata = [];
        var typeLabel = [];
        var typeBattles = [];
        var typeSurvival = [];
        for(var i = 0; i < data2.length; i++){
          typeLabel.push(data2[i]['type']);
          typeBattles.push(data2[i]['battles']);
          typeSurvival.push(data5[i]['survival']);
          typedata.push({
              battles : data2[i]['battles'],
              survival : data5[i]['survival'],
              type : data2[i]['type'],
            }
          );
        }
        var typeBarData = [{
            y: typeSurvival,
            x: typeLabel,
            type: 'bar',
            name: '#Battles',
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }];
        var typePieData = [{
            values: typeBattles,
            labels: typeLabel,
            type: 'pie',
            name: '#Battles',
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }];

        var linedata = [];
        var maxBattle = {
            battles : 0,
            survival : 0,
            nation : "",
            type : "",
        }
        for(var i = 0; i < data3.length; i++){
          if (data3[i]['battles'] > maxBattle['battles']){
            maxBattle = {
                battles : data3[i]['battles'],
                survival : data6[i]['survival'],
                nation : data3[i]['nation'],
                type : data3[i]['type'],
            }
          }
          linedata.push({
              battles : data3[i]['battles'],
              survival : data6[i]['survival'],
              nation : data3[i]['nation'],
              type : data3[i]['type'],
            }
          );
        }

        var roledata = [{
            role : '',
            line : maxBattle['nation'].toUpperCase() + "/" + maxBattle['type'].toUpperCase()
          }];
        if (maxBattle['type'] == 'Battleship'){
            if(maxBattle['survival'] <= 0.45){
                roledata[0]['role'] =  'Tanker';
            }else{
                roledata[0]['role'] = 'Kiter';
            }
        }else if (maxBattle['type'] == 'Cruiser'){
            if(maxBattle['survival'] <= 0.45){
                roledata[0]['role'] = 'DD Hunting';
            }else{
                roledata[0]['role'] = 'BB Hunting';
            }
        }else if (maxBattle['type'] == 'Destroyer'){
            if(maxBattle['survival'] <= 0.45){
                roledata[0]['role'] = 'Cap Contest';
            }else{
                roledata[0]['role'] = 'Torpedo Boat';
            }
        }else{
            roledata[0]['role'] = 'CV Mate';
        }
        return (
            <div>
                <Row>
                    <Col md="12">
                        <CardColumns>
                            <Col>
                                <Card>
                                    <CardHeader>By Nation</CardHeader>
                                    <CardBody>
                                    <BootstrapTable data={nationdata} height='500' scrollTop={ 'Bottom' }>
                                        <TableHeaderColumn dataField='battles' dataSort># Battles</TableHeaderColumn>
                                        <TableHeaderColumn dataField='survival' dataSort>Survival Rate</TableHeaderColumn>
                                        <TableHeaderColumn dataField='nation' isKey={true}>nation</TableHeaderColumn>
                                    </BootstrapTable>
                                    <Plot
                                        data = {nationPieData}
                                        layout = {battleGraphlayout}
                                        config = {{displayModeBar: false}}
                                        style={{ width: "100%", height: "400px" }}
                                    />
                                    <Plot
                                        data = {nationBarData}
                                        layout = {survivalGraphlayout}
                                        config = {{displayModeBar: false}}
                                        style={{ width: "100%", height: "400px" }}
                                    />
                                    </CardBody>
                                </Card>
                              </Col>
                              <Col>
                                  <Card>
                                      <CardHeader>By Type</CardHeader>
                                      <CardBody>
                                      <BootstrapTable data={typedata} height='500' scrollTop={ 'Bottom' }>
                                          <TableHeaderColumn dataField='battles' dataSort># Battles</TableHeaderColumn>
                                          <TableHeaderColumn dataField='survival' dataSort>Survival Rate</TableHeaderColumn>
                                          <TableHeaderColumn dataField='type' isKey={true}>Type</TableHeaderColumn>
                                      </BootstrapTable>
                                      <Plot
                                          data = {typePieData}
                                          layout = {battleGraphlayout}
                                          config = {{displayModeBar: false}}
                                          style={{ width: "100%", height: "400px" }}
                                      />
                                      <Plot
                                          data = {typeBarData}
                                          layout = {survivalGraphlayout}
                                          config = {{displayModeBar: false}}
                                          style={{ width: "100%", height: "400px" }}
                                      />
                                      </CardBody>
                                  </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <CardHeader>By Line</CardHeader>
                                        <CardBody>
                                        <BootstrapTable data={linedata} height='1150' scrollTop={ 'Bottom' }>
                                            <TableHeaderColumn dataField='battles' dataSort># Battles</TableHeaderColumn>
                                            <TableHeaderColumn dataField='survival' dataSort>Survival Rate</TableHeaderColumn>
                                            <TableHeaderColumn dataField='nation' >nation</TableHeaderColumn>
                                            <TableHeaderColumn dataField='type' isKey={true}>Type</TableHeaderColumn>
                                        </BootstrapTable>
                                        <BootstrapTable data={roledata} height='150' scrollTop={ 'Bottom' }>
                                            <TableHeaderColumn dataField='role' >Most Possible Role</TableHeaderColumn>
                                            <TableHeaderColumn dataField='line' isKey>Line</TableHeaderColumn>
                                        </BootstrapTable>
                                        </CardBody>
                                    </Card>
                                  </Col>
                        </CardColumns>
                    </Col>
                </Row>
            </div>
        );
    };
    }
};

export default PlayerPredict;
