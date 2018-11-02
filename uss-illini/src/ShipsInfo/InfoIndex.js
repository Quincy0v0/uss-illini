import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon } from 'reactstrap';
import { Container } from 'reactstrap';
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
import ShipCard from './ShipCard.js';

class InfoIndex extends Component {
    constructor(props) {
        super(props);
        this.load_ships = this.load_ships.bind(this);
        this.load_ships_by_name = this.load_ships_by_name.bind(this);
        this.toggle = this.toggle.bind(this);
        this.ModalToggle = this.ModalToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            isOpen: false,
            data: [],
            newShipId: "",
            loadShipName: "",
            shipList: {},
        };
    }

    ModalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidMount() {
        this.load_ships(3761190896);

        fetch('/users/listAllShips', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ shipList: res })
            })
            .catch(error => {
                console.log(error);
            });
    }

    load_ships(ship_id) {
        fetch('/users/ships', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    this.setState({ data: res[0] });
                }
                else{
                    alert("No such ship found!");
                }
            })
    }

    load_ships_by_name(ship_name) {
        ship_name = ship_name[0].toUpperCase() + ship_name.substring(1);
        var ship_id = this.state.shipList[ship_name];
        console.log(this.state.shipList);
        console.log(ship_id);
        fetch('/users/ships', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
        })
            .then(res => res.json())
            .then(res => {
                if (res[0]){
                    this.setState({ data: res[0] });
                }
                else{
                    alert("No such ship named "+ship_name+" found!");
                }
            })
    }

    insert_ships(ship_id) {
        fetch('/users/insert', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
        });
        alert("successfully added a new ship");
        this.ModalToggle();
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
                                    <Input type="search" name="loadShipName" id="loadShipName" value={this.state.loadShipName} placeholder="Enter a ship name here" onChange={this.handleChange} onSubmit={() => {this.load_ships_by_name(this.state.loadShipName)}}/>
                                    <InputGroupAddon addonType="append">
                                        <Button  color="info" onClick={() => {this.load_ships_by_name(this.state.loadShipName)}}>search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => {this.ModalToggle()}}>
                                        Add a new ship
                                    </DropdownItem>
                                    <DropdownItem disabled>
                                        Delete a ship
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem disabled>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Modal isOpen={this.state.modal} toggle={this.ModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.ModalToggle}>Add a new ship to database</ModalHeader>
                    <ModalBody>
                        <Label for="newShipId">Enter a ship id below to add a new ship to the database!</Label>
                        <Input type="text" name="newShipId" value={this.state.newShipId} placeholder="Enter ship id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insert_ships(this.state.newShipId)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.ModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <p/>
                <Container fluid>
                    <ShipCard data={this.state.data}/>
                </Container>

            </div>
        );
    }
}
export default InfoIndex;