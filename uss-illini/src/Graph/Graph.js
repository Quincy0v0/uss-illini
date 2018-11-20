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
import ComparisonTable from './ComparisonTable.js';
import './modal.css';
class Graphs extends Component {
    constructor(props) {
        super(props);
        this.radar = this.radar.bind(this);
        this.account_idChange = this.account_idChange.bind(this);
        this.load_player = this.load_player.bind(this);
        this.load_allShipPlayer = this.load_allShipPlayer.bind(this);
        this.list_all_accounts = this.list_all_accounts.bind(this);
        this.addToAccountList = this.addToAccountList.bind(this);
        this.removeFromAccountList = this.removeFromAccountList.bind(this);
        this.load_account_list_data = this.load_account_list_data.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
          show : false,
          account_list : [],
          account_list_data : [],
          account_list_score : [],
          all_account : {},
          account_data : [],
          account_id : '1009061145',
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
        this.list_all_accounts();
        this.radar(this.state.account_id);
        this.load_player(this.state.account_id);
        this.load_allShipPlayer(this.state.account_id);
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
        fetch('/users/playerShips', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_id: account_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res){
                    this.setState({allShipData: res});
                }
                else{
                    //alert("No such player found!");
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
                var dict = {};
                for (var key in this.state.data[0]) {
                    if(key == 'r'){
                        dict[key] = result;
                    }else{
                        dict[key] = this.state.data[0][key];
                    }
                }
                var newData = [dict];
                this.setState({
                  data : newData,
                });
            }
            else{
                //alert("No such player/ship found!");
            }
        })
    }

    list_all_accounts() {
        fetch('/users/listAllAccounts', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(res => res.json())
            .then(res => {
                if (res){
                    this.setState({all_account: res});
                }
                else{
                    //alert("No such player found!");
                }
            })
    }

    account_idChange(event){
        this.setState({account_id: this.state.all_account[event.target.value]});
    }

    addToAccountList(){
        var newaccount_list = [];
        var flag = false;
        for (var i = 0; i < this.state.account_list.length ; i++){
            if (this.state.account_list[i] == String(this.state.account_id)){
              flag = true;
            }
            newaccount_list.push(this.state.account_list[i]);
        }
        if (flag == false){
            newaccount_list.push(String(this.state.account_id));
            alert("Success");
        }else{
            alert("Error! Account Already Exists");
        }
        this.setState({account_list : newaccount_list});
    }

    removeFromAccountList(){
        var newaccount_list = [];
        var flag = false;
        for (var i = 0; i < this.state.account_list.length ; i++){
            if (this.state.account_list[i] != String(this.state.account_id)){
                newaccount_list.push(this.state.account_list[i]);
            }else{
                flag = true;
            }
        }
        if (flag == true){
            alert("Success");
        }else{
            alert("Fail! Account Doesn't Exist");
        }
        this.setState({account_list : newaccount_list});
    }

    toggle() {
      this.setState({ show: !this.state.show });
    }


    load_account_list_data(){
        this.setState({
           account_list_score : [],
           account_list_data : [],
        });
        for(var j = 0 ; j < this.state.account_list.length ; j++){
          var account_id = this.state.account_list[j];
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
                  var score = Math.round(res[0]['Kills']*1000+res[0]['Survival']*1000+res[0]['Wins']*1000+res[0]['Damage']*1000+res[0]['Objective']*1000)/5+3000;
                  var newData = [];
                  for(var i = 0; i < this.state.account_list_score.length ; i++){
                      newData.push(this.state.account_list_score[i]);
                  }
                  newData.push(score);
                  this.setState({
                     account_list_score : newData,
                  });
              }
              else{
                  //alert("No such player/ship found!");
              }
          })
        }

        fetch('/users/players', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ account_ids: this.state.account_list }),
        })
            .then(res => res.json())
            .then(res => {
                if (res){
                    this.setState({
                       account_list_data : res,
                    });
                }
                else{
                    //alert("No such player found!");
                }
            })

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
                                    <Input type="text" name="account_id" id="account_id" value={this.state.all_account[this.state.account_id]} onChange={this.account_idChange} placeholder="nickname"/>
                                    <Button onClick={() => {this.radar(this.state.account_id),this.load_player(this.state.account_id),this.load_allShipPlayer(this.state.account_id)}}>
                                        Search
                                    </Button>
                                </InputGroup>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button onClick={() => {this.addToAccountList()}}>
                                    Add To Comparison
                                </Button>
                                <Button onClick={() => {this.removeFromAccountList()}}>
                                    Removed From Comparison
                                </Button>
                                <Button onClick={() => {this.toggle(),this.load_account_list_data()}}>
                                    Start Comparison
                                </Button>
                                <Button onClick={() => {this.setState({account_list : []}), alert("Success");}}>
                                    Reset Comparison
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <p/>
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
                    <PlayerTable data={this.state.allShipData}/>
                </Container>

                <Modal isOpen={this.state.show} toggle={this.toggle} className={this.props.className} className="Modal">
                  <ModalHeader toggle={this.toggle}>Player Comparison</ModalHeader>
                  <ModalBody>
                        <ComparisonTable data = {this.state.account_list_data} score = {this.state.account_list_score}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                  </ModalFooter>
                </Modal>
              </div>
        );
    }
}
export default Graphs;
