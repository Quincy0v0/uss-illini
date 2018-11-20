import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText, Table } from 'reactstrap';
import { Container, Row, Col, } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

export default class ComparisonTable extends React.Component {

  constructor(props) {
      super(props);
      this.options = {
        defaultSortName: 'rating',  // default sort column name
        defaultSortOrder: 'desc'  // default sort order
      };
      this.state = {
      };
  }
  render() {
    var data= this.props.data;
    var score = this.props.score;
    var set = new Set();
    var combineddata = [];
    for(var i = 0; i < data.length ; i++){
        if (data[i] && score[i] && !set.has(data[i]['nickname'])){
            set.add(data[i]['nickname']);
            combineddata.push({
                account : data[i]['nickname'],
                battles :  data[i]['battles'],
                winrate : Math.round((data[i]['wins'] / data[i]['battles'])*100)/100,
                rating : score[i],
                averagedamage: Math.round((data[i]['damage_dealt'] / data[i]['battles'])*100)/100,
                averagekills: Math.round((data[i]['frags'] / data[i]['battles'])*100)/100,
                averageplanekills: Math.round((data[i]['planes_killed'] / data[i]['battles'])*100)/100,
                averagexp: Math.round((data[i]['xp'] / data[i]['battles'])*100)/100,
                maxdamage: data[i]['max_damage_dealt'],
                maxkills:  data[i]['max_frags_battle'],
                maxplanekills: data[i]['max_planes_killed'],
                maxxp:  data[i]['max_xp'],
            });
        }
    }
    return (
      <BootstrapTable data={combineddata} height='504' scrollTop={ 'Bottom' } options={ this.options }>
          <TableHeaderColumn dataField='account' isKey >Account</TableHeaderColumn>
          <TableHeaderColumn dataField='battles' dataSort>Battles</TableHeaderColumn>
          <TableHeaderColumn dataField='winrate' dataSort>Win Rate</TableHeaderColumn>
          <TableHeaderColumn dataField='rating' dataSort>Rating</TableHeaderColumn>
          <TableHeaderColumn dataField='averagedamage' dataSort>Ave Damage</TableHeaderColumn>
          <TableHeaderColumn dataField='averagekills' dataSort>Ave Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='averageplanekills' dataSort>Ave Plane Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='averagexp' dataSort>Ave XP</TableHeaderColumn>
          <TableHeaderColumn dataField='maxdamage' dataSort>Max Damage</TableHeaderColumn>
          <TableHeaderColumn dataField='maxkills' dataSort>Max Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='maxplanekills' dataSort>Max Plane Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='maxxp' dataSort>Max XP</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
