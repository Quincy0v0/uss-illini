import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Dropdown } from 'reactstrap';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Graphs extends Component {
    constructor(props) {
        super(props);
        this.radar = this.radar.bind(this);
        this.account_idChange = this.account_idChange.bind(this);
        this.state = {
          account_id : '1011528019',
          layout : {
            polar: {
              radialaxis: {
                visible: true,
                range: [-3, 3]
              }
            },
            showlegend: false
          },
          data : [{
            type: 'scatterpolar',
            r: [1, 1, 1, 1, 1],
            theta: ['Kills','Survival','Wins','Damage','Objective'],
            fill: 'toself'
          }],
          options : {
          	scrollZoom: false,
          	showLink: false,
          	modeBarButtonsToRemove: ['toImage', 'zoom2d', 'pan', 'pan2d', 'autoScale2d'],
          	modeBarButtonsToAdd: ['lasso2d'],
          	displayLogo: false,
          	displayModeBar: false,
          },
          defaultPlotlyConfiguration : {
            modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'],
            displaylogo: false,
            showTips: true
          },
        };
    }

    radar(account_id,ship_id){
        fetch('/users/radar', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({account_id: account_id, ship_id: ship_id }),
        })
        .then(res => res.json())
        .then(res => {
            if (res[0]){
                var result = [res[0]['Kills'],res[0]['Survival'],res[0]['Wins'],res[0]['Damage'],res[0]['Objective']];
                var newData = this.state.data;
                newData[0]['r'] = result;
                this.setState({
                  data : newData,
                });
            }
            else{
                alert("No such player/ship found!");
            }
        })
    }
    account_idChange(event){
        this.setState({account_id: event.target.value});
    }
    render() {
        return (
            <div>
                <div className="container">
                    <FormGroup>
                    <Input type="text" name="account_id" id="account_id" value={this.state.account_id} onChange={this.account_idChange} placeholder="account_id"/>
                    </FormGroup>
                    <Button onClick={() => {this.radar(this.account_id,this.ship_id)}}>
                        Update
                    </Button>
                    <Plot
                      data = {this.state.data}
                      layout = {this.state.layout}
                      options = {this.state.option}
                      defaultPlotlyConfiguration = {this.state.defaultPlotlyConfiguration}
                    />
                </div>
            </div>
        );
    }
}
export default Graphs;
