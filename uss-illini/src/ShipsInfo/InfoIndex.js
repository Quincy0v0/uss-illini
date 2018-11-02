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
        this.AddModalToggle = this.AddModalToggle.bind(this);
        this.DeleteModalToggle = this.DeleteModalToggle.bind(this);
        this.UpdateModalToggle = this.UpdateModalToggle.bind(this);
        this.UpdateValModalToggle = this.UpdateValModalToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            AddModal: false,
            DeleteModal: false,
            UpdateModal: false,
            UpdateValModal: false,
            isOpen: false,
            data: [],
            newShipId: "",
            DeleteShipId: "",
            UpdateShipId: "",
            UpdateValShipId: "",
            UpdateValShipName: "",
            loadShipName: "",
            shipList: {},
        };
    }

    AddModalToggle() {
        this.setState({
            AddModal: !this.state.AddModal
        });
    }

    DeleteModalToggle() {
        this.setState({
            DeleteModal: !this.state.DeleteModal
        });
    }

    UpdateModalToggle() {
        this.setState({
            UpdateModal: !this.state.UpdateModal
        });
    }

    UpdateValModalToggle() {
        this.setState({
            UpdateValModal: !this.state.UpdateValModal
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
                    alert("No such ship named "+ship_name+" has been found!");
                }
            })
    }

    delete_ships(ship_id) {
        fetch('/users/delete', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
        });
        alert("successfully deleted a new ship");
        this.DeleteModalToggle();
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
        this.AddModalToggle();
    }

    update_ships(ship_id) {
        fetch('/users/update', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
        });
        alert("successfully updated a new ship");
        this.UpdateModalToggle();
    }

    update_val_ships(colname,colval) {
        var ship_name = colname[0].toUpperCase() + colname.substring(1);
        var ship_id = this.state.shipList[ship_name];
        colname = ship_name;
        console.log(ship_id, colname, colval,);
        fetch('/users/update_val', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id, colname: colname, colval: colval }),
        });
        alert("successfully updated a new ship");
        this.UpdateValModalToggle();
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
                                    <DropdownItem onClick={() => {this.AddModalToggle()}}>
                                        Add a new ship
                                    </DropdownItem>
                                    <DropdownItem onClick={() => {this.DeleteModalToggle()}}>
                                        Delete a ship
                                    </DropdownItem>
                                    <DropdownItem onClick={() => {this.UpdateModalToggle()}}>
                                        Update a ship
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => {this.UpdateValModalToggle()}}>
                                        Update a ship manually
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Modal isOpen={this.state.AddModal} toggle={this.AddModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.AddModalToggle}>Add a new ship to database</ModalHeader>
                    <ModalBody>
                        <Label for="newShipId">Enter a ship id below to add a new ship to the database!</Label>
                        <Input type="text" name="newShipId" value={this.state.newShipId} placeholder="Enter ship id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insert_ships(this.state.newShipId)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.AddModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.DeleteModal} toggle={this.DeleteModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.DeleteModalToggle}>Delete a ship from database</ModalHeader>
                    <ModalBody>
                        <Label for="DeleteShipId">Enter a ship id below to delete the corresponding ship!</Label>
                        <Input type="text" name="DeleteShipId" value={this.state.DeleteShipId} placeholder="Enter ship id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" onClick={() => this.delete_ships(this.state.DeleteShipId)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.DeleteModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.UpdateModal} toggle={this.UpdateModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.UpdateModalToggle}>Update the info of an existing ship</ModalHeader>
                    <ModalBody>
                        <Label for="UpdateShipId">Enter a ship id below to update the corresponding ship info!</Label>
                        <Input type="text" name="UpdateShipId" value={this.state.UpdateShipId} placeholder="Enter ship id here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" onClick={() => this.update_ships(this.state.UpdateShipId)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.UpdateModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.UpdateValModal} toggle={this.UpdateValModalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.UpdateValModalToggle}>Update the name of an existing ship Manually</ModalHeader>
                    <ModalBody>
                        <Label for="UpdateValShipId">Enter the name of the ship you want to update</Label>
                        <Input type="text" name="UpdateValShipId" value={this.state.UpdateValShipId} placeholder="Enter old ship Name here" onChange={this.handleChange}/>
                        <Label for="UpdateValShipName">Enter a new name for the ship below!</Label>
                        <Input type="text" name="UpdateValShipName" value={this.state.UpdateValShipName} placeholder="Enter new ship NAME here" onChange={this.handleChange}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.update_val_ships(this.state.UpdateValShipId, this.state.UpdateValShipName)}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.UpdateValModalToggle}>Cancel</Button>
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