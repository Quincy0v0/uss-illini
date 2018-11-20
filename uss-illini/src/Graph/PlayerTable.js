import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText, Table } from 'reactstrap';
import { Container, Row, Col, } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const tierOption = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
};

const typeOption = {
  Destroyer: 'Destroyer',
  AirCarrier: 'AirCarrier',
  Battleship: 'Battleship',
  Cruiser: 'Cruiser',
};

const nationOption = {
  japan: 'japan',
  usa: 'usa',
  germany: 'germany',
  uk: 'uk',
  france: 'france',
  pan_asia : 'pan_asia',
  ussr : 'ussr',
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

function imageFormatter(cell, row){
  return "<img src='"+cell+"'"+' style="width:100%;" />' ;
}

export default class ScrollTable extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }
  render() {
    var data = this.props.data;
    var ships = this.props.ships;
    var score = this.props.score;
    var combineddata = [];
    var set = new Set();
    for(var i = 0; i < data.length ; i++){
      if (data[i] && ships[i] && score[i] && !set.has(ships[i]['name'])) {
          set.add(ships[i]['name']);
          combineddata.push({
              ship : ships[i]['name'],
              image: ships[i]['images_small'],
              tier : ships[i]['tier'],
              type : ships[i]['type'],
              nation : ships[i]['nation'],
              battles : data[i]['battles'],
              winrate : Math.round((data[i]['wins'] / data[i]['battles'])*100)/100,
              rating : Math.round((score[i]['Kills']*1000+score[i]['Survival']*1000+score[i]['Wins']*1000+score[i]['Damage']*1000+score[i]['Objective']*1000)/5)+3000,
              averagedamage : Math.round((data[i]['damage_dealt'] / data[i]['battles'])*100)/100,
              averagekills :  Math.round((data[i]['frags'] / data[i]['battles'])*100)/100,
              averageplanekills : Math.round((data[i]['planes_killed'] / data[i]['battles'])*100)/100,
              averagexp : Math.round((data[i]['xp'] / data[i]['battles'])*100)/100,
              maxdamage : data[i]['max_damage_dealt'],
              maxkills :  data[i]['max_frags_battle'],
              maxplanekills : data[i]['max_planes_killed'],
              maxxp : data[i]['max_xp'],
          });
      }
    }
    const options = {
        page: 1,  // which page you want to show as default
        sizePerPageList: [ {
          text: '5', value: 5
        }, {
          text: '10', value: 10
        }, {
          text: 'All', value: combineddata.length
        } ], // you can change the dropdown list for size per page
        sizePerPage: 15,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 10,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
        paginationPosition: 'top',  // default is bottom, top and both is all available
        hideSizePerPage: true //> You can hide the dropdown for sizePerPage
        // alwaysShowAllBtns: true // Always show next and previous button
        // withFirstAndLast: false > Hide the going to First and Last page button
    };
    return (
      <BootstrapTable data={combineddata} pagination={ true } options={ options }>
          <TableHeaderColumn dataField='ship' isKey filter={ { type: 'TextFilter', delay: 1000 } }>Ships</TableHeaderColumn>
          <TableHeaderColumn dataField='image' dataFormat={imageFormatter}></TableHeaderColumn>
          <TableHeaderColumn dataField='tier' filterFormatted dataFormat={ enumFormatter } formatExtraData={ tierOption }
          filter={ { type: 'SelectFilter', options: tierOption } }>Tier</TableHeaderColumn>
          <TableHeaderColumn dataField='type' filterFormatted dataFormat={ enumFormatter } formatExtraData={ typeOption }
          filter={ { type: 'SelectFilter', options: typeOption } }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='nation' filterFormatted dataFormat={ enumFormatter } formatExtraData={ nationOption }
          filter={ { type: 'SelectFilter', options: nationOption } }>Nation</TableHeaderColumn>
          <TableHeaderColumn dataField='battles'>Battles</TableHeaderColumn>
          <TableHeaderColumn dataField='winrate'>Win Rate</TableHeaderColumn>
          <TableHeaderColumn dataField='rating'>Rating</TableHeaderColumn>
          <TableHeaderColumn dataField='averagedamage'>Ave Damage</TableHeaderColumn>
          <TableHeaderColumn dataField='averagekills'>Ave Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='averageplanekills'>Ave Plane Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='averagexp'>Ave XP</TableHeaderColumn>
          <TableHeaderColumn dataField='maxdamage'>Max Damage</TableHeaderColumn>
          <TableHeaderColumn dataField='maxkills'>Max Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='maxplanekills'>Max Plane Kills</TableHeaderColumn>
          <TableHeaderColumn dataField='maxxp'>Max XP</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
