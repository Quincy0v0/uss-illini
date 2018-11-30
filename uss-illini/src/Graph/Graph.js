import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Card,  CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
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
import PlayerPredict from './PlayerPredict.js';
import PlayerTable from './PlayerTable.js';
import ComparisonTable from './ComparisonTable.js';
import './modal.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
class Graphs extends Component {
    constructor(props) {
        super(props);
        this.radar = this.radar.bind(this);
        this.account_idChange = this.account_idChange.bind(this);
        this.load_player = this.load_player.bind(this);
        this.load_allShipPlayer = this.load_allShipPlayer.bind(this);
        this.list_all_accounts = this.list_all_accounts.bind(this);
        this.list_all_name = this.list_all_name.bind(this);
        this.addToAccountList = this.addToAccountList.bind(this);
        this.removeFromAccountList = this.removeFromAccountList.bind(this);
        this.load_account_list_data = this.load_account_list_data.bind(this);
        this.load_behavior = this.load_behavior.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggle_tab = this.toggle_tab.bind(this);
        this.add_clan = this.add_clan.bind(this);
        this.add_player = this.add_player.bind(this);
        this.ClanModalToggle = this.ClanModalToggle.bind(this);
        this.PlayerModalToggle = this.PlayerModalToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            activeTab: '1',
          behavior : [],
          behavior1 : [],
          behavior2 : [],
          behavior3 : [],
          behavior4 : [],
          behavior5 : [],
          behavior6 : [],
          show : false,
          all_name: ["ericsama","Quincy_0v0"],
          account_list : [],
          account_list_data : [],
          account_list_score : [],
          all_account : {},
          account_data : [],
          account_id : '1019218342',
          allShipData : [],
            addplayerid : "",
            addclanid: "",
            PlayerModal: false,
            ClanModal: false,
          layout : {
              autosize :true,
            polar: {
              radialaxis: {
                visible: true,
                range: [-1.5, 1.5]
              }
            },
              margin: {
                  l: 0,
                  r: 20,
                  b: 20,
                  t: 20,
                  pad: 20
              },
          },
          data : [{
            type: 'scatterpolar',
            r: [-1, -1, -1, -1, -1, -1],
            theta: ['Kills','Survival','Wins','Damage','Objective','Kills'],
            fill: 'toself'
          }],
        };
    }

    add_player(){
        console.log("addplayer", this.state.addplayerid)
        fetch('/users/insert_player', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: this.state.addplayerid }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    alert("Success!");
                }
                else{
                    alert("No such ship found!");
                }
            })

        fetch('/users/insert_account_clan', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: this.state.addplayerid }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    alert("Success!");
                }
                else{
                    alert("No such ship found!");
                }
            })

        fetch('/users/join_insert', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: this.state.addplayerid }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    alert("Success!");
                }
                else{
                    alert("No such ship found!");
                }
            })

        fetch('/users/insert_clan', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: this.state.addplayerid }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    alert("Success!");
                }
                else{
                    alert("No such ship found!");
                }
            })
    }

    add_clan(){
        fetch('/insert_account_clan', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: this.state.addclanid }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    alert("Success!");
                    //this.setState({ data: res[0] });
                }
                else{
                    alert("No such ship found!");
                }
            })
    }

    ClanModalToggle() {
        this.setState({
            ClanModal: !this.state.ClanModal
        });
    }

    PlayerModalToggle() {
        this.setState({
            PlayerModal: !this.state.PlayerModal
        });
    }



    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.list_all_accounts();
        this.list_all_name();
        this.radar(this.state.account_id);
        this.load_player(this.state.account_id);
        this.load_allShipPlayer(this.state.account_id);
        this.load_behavior(this.state.account_id);
    }

    toggle_tab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
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
                var result = [res[0]['Kills'],res[0]['Survival'],res[0]['Wins'],res[0]['Damage'],res[0]['Objective'],res[0]['Kills']];
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

    list_all_name() {
        fetch('/users/listAllName', {
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
                    this.setState({all_name: res});
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

    load_behavior(account_id){
      this.setState({behavior : [],behavior1 : [],behavior2 : [],behavior3 : [],behavior4 : [],behavior5 : [],behavior6 : []})
      /*
      var newbehavior = [];
      for (var i = 1; i <= 6 ; i++){
        fetch('/users/behavior' + String(i), {
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
                    newbehavior.push(res);
                }
                else{
                    //alert("No such player found!");
                }
            })
      }
      this.setState({behavior : newbehavior,})*/
      fetch('/users/behavior1', {
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
                  this.setState({behavior1 : res});
              }
              else{
                  //alert("No such player found!");
              }
          })
      fetch('/users/behavior2', {
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
                      this.setState({behavior2 : res});
                  }
                  else{
                      //alert("No such player found!");
                  }
              })
      fetch('/users/behavior3', {
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
                  this.setState({behavior3 : res});
              }
              else{
                  //alert("No such player found!");
              }
          })
      fetch('/users/behavior4', {
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
                      this.setState({behavior4 : res});
                  }
                  else{
                      //alert("No such player found!");
                  }
              })
    fetch('/users/behavior5', {
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
                this.setState({behavior5 : res});
            }
            else{
                //alert("No such player found!");
            }
        })
    fetch('/users/behavior6', {
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
                    this.setState({behavior6 : res});
                }
                else{
                    //alert("No such player found!");
                }
            })
          }
  //<Input type="text" name="account_id" id="account_id" value={this.state.all_account[this.state.account_id]} onChange={this.account_idChange} placeholder="nickname"/>
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
                                    <Typeahead
                                      labelKey="name"
                                      multiple={false}
                                      options={this.state.all_name}
                                      minLength={2}
                                      onChange = {(selected) => this.setState({account_id: this.state.all_account[selected]})}
                                      placeholder="Enter username"
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button  color="info" onClick={() => {this.radar(this.state.account_id),this.load_player(this.state.account_id),this.load_allShipPlayer(this.state.account_id),this.load_behavior(this.state.account_id)}}>
                                            Search
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Compare Players
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => {this.addToAccountList()}}>
                                        Add To Comparison
                                    </DropdownItem>
                                    <DropdownItem onClick={() => {this.removeFromAccountList()}}>
                                        Remove From Comparison
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => {this.toggle(),this.load_account_list_data()}}>
                                        Show Comparison Results
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => {this.PlayerModalToggle()}}>
                                        Add a new player
                                    </DropdownItem>
                                    <DropdownItem onClick={() => {this.ClanModalToggle()}}>
                                        Add a new clan
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle_tab('1'); }}
                        >
                            Player summery
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle_tab('2'); }}
                        >
                            Behavior Analysis
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle_tab('3'); }}
                        >
                            All Ship Stats
                        </NavLink>
                    </NavItem>
                </Nav>

                <Container fluid>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <p/>
                            <Row>
                                <Container fluid>
                                    <PlayerCard data={this.state.account_data} score={this.state.data[0]['r']} plot_data={this.state.data} layout={this.state.layout}/>
                                </Container>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <p/>
                            <Row>
                                <Container fluid>
                                    <PlayerPredict data={this.state.behavior} data1={this.state.behavior1} data2={this.state.behavior2} data3={this.state.behavior3} data4={this.state.behavior4} data5={this.state.behavior5} data6={this.state.behavior6}/>
                                </Container>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <p/>
                            <Row>
                                <Container fluid>
                                    <PlayerTable data={this.state.allShipData}/>
                                </Container>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Container>

                <Modal isOpen={this.state.PlayerModal} toggle={this.PlayerModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.PlayerModalToggle}>Add a new Player</ModalHeader>
                    <ModalBody>
                        <Label for="addplayerid">Enter a player id below!</Label>
                        <Input type="text" name="addplayerid" value={this.state.addplayerid} placeholder="Enter player id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={this.add_player}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.PlayerModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.ClanModal} toggle={this.ClanModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.ClanModalToggle}>Add a new Clan</ModalHeader>
                    <ModalBody>
                        <Label for="addclanid">Enter a clan id below!</Label>
                        <Input type="text" name="addclanid" value={this.state.addclanid} placeholder="Enter clan id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={this.add_clan}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.ClanModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.show} toggle={this.toggle} className={this.props.className} className="Modal">
                  <ModalHeader toggle={this.toggle}>Player Comparison</ModalHeader>
                  <ModalBody>
                        <ComparisonTable data = {this.state.account_list_data} score = {this.state.account_list_score} plot_data={this.state.data} layout={this.state.layout}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                      <Button color="warning" onClick={() => {this.setState({account_list : [], account_list_data : [], account_list_score : [],}); }}>Reset</Button>
                  </ModalFooter>
                </Modal>
              </div>
        );
    }
}
export default Graphs;
