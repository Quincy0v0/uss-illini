import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
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
import PlayerCard from './PlayerCard.js';
import PlayerTable from './PlayerTable.js';
class Graphs extends Component {
    constructor(props) {
        super(props);
        this.radar = this.radar.bind(this);
        this.account_idChange = this.account_idChange.bind(this);
        this.load_player = this.load_player.bind(this);
        this.load_allShipPlayer = this.load_allShipPlayer.bind(this);
        this.load_player_ship = this.load_player_ship.bind(this);
        this.load_player_score = this.load_player_score.bind(this);
        this.state = {
          playerships:[],
          playerscore:[],
          account_data : [],
          account_id : '1002942466',
          allShipData : [],
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
            r: [-3, -3, -3, -3, -3],
            theta: ['Kills','Survival','Wins','Damage','Objective'],
            fill: 'toself'
          }],
        };
    }

    componentDidMount() {
        this.load_player(1024488643);
    }

    load_player(account_id) {
        fetch('/users/player', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_id: account_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    this.setState({ account_data: res[0] });
                }
                else{
                    alert("No such player found!");
                }
            })
    }

    load_allShipPlayer(account_id) {
        fetch('/users/playerShip', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_id: account_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    this.setState({ allShipData: res,playerships:[],playerscore:[],});
                }
                else{
                    alert("No such player found!");
                }
            })
            .then(res =>{
                for(var i = 0; i < this.state.allShipData.length ; i++){
                    this.load_player_ship(this.state.allShipData[i]['ship_id']);
                    this.load_player_score(this.state.allShipData[i]['account_id'],this.state.allShipData[i]['ship_id']);
                }
            })
    }

    radar(account_id){
        fetch('/users/radar', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({account_id: account_id}),
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

    load_player_ship(ship_id) {
        fetch('/users/playerShipInfo', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ship_id:ship_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    var newships = this.state.playerships;
                    newships.push(res[0]);
                    this.setState({playerships: newships});
                }
                else{
                    //alert("No such player found!");
                }
            })
    }

    load_player_score(account_id,ship_id) {
        fetch('/users/playerShipScore', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_id: account_id, ship_id:ship_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    var newscore = this.state.playerscore;
                    newscore.push(res[0]);
                    this.setState({ playerscore: newscore});
                }
                else{
                    //alert("No such player found!");
                }
            })
    }

    account_idChange(event){
        this.setState({account_id: event.target.value});
    }

    render() {
        return (
            <div>
                <Navbar color="dark" className="navbar-dark navbar-expand-sm" light expand="md">
                    <NavbarBrand href="/">USS illini</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <InputGroup>
                                    <Input type="text" name="account_id" id="account_id" value={this.state.account_id} onChange={this.account_idChange} placeholder="account_id"/>
                                    <Button onClick={() => {this.radar(this.state.account_id),this.load_player(this.state.account_id),this.load_allShipPlayer(this.state.account_id)}}>
                                        Search
                                    </Button>
                                </InputGroup>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container fluid>
                    <PlayerCard data={this.state.account_data} score={this.state.data[0]['r']}/>
                </Container>

                <div className="container">
                    <Plot
                      data = {this.state.data}
                      layout = {this.state.layout}
                    />
                </div>

                <Container fluid>
                    <PlayerTable data={this.state.allShipData} ships={this.state.playerships} score={this.state.playerscore}/>
                </Container>
            </div>
        );
    }
}
export default Graphs;
