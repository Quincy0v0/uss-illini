import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

class InfoIndex extends Component {
    constructor(props) {
        super(props);
        this.load_ships = this.load_ships.bind(this);
        this.toggle = this.toggle.bind(this);
        this.ModalToggle = this.ModalToggle.bind(this);
        this.state = {
            modal: false,
            isOpen: false,
            datastr: "",
            data: [],
            names: []
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

    componentDidMount() {
        this.load_ships(4187894992)
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
            .then(res => this.setState({ data: res[0] }))
            .then(console.log(this.state.data))
    }

    insert_ships(ship_id) {
        fetch('/users/insert', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ship_id: ship_id }),
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
                                <NavLink onClick={() => {this.ModalToggle()}}>AddShips</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
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
                        <Label for="newship">Enter a ship id below to add a new ship to the database!</Label>
                        <Input type="text" name="newship" placeholder="Enter ship id here"></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.ModalToggle}>Confirm</Button>{' '}
                        <Button color="secondary" onClick={this.ModalToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="container">
                    <FormGroup>
                        <Label for="exampleSearch">Search</Label>
                        <Input type="search" name="search" id="exampleSearch" placeholder="Enter a shipID here" />
                        <button className="btn-primary" onClick={() => {this.load_ships(4182652880)}}>load ships</button>
                    </FormGroup>
                    <div>
                        <h1> {this.state.data["name"]} </h1>
                        <h2> Tier:  {this.state.data["tier"]} </h2>
                        <h2> Type:  {this.state.data["type"]} </h2>
                        <h2> Nation:  {this.state.data["nation"]} </h2>
                        <h2> Price: {this.state.data["price_credit"]} </h2>
                        <img src={this.state.data["images_large"]}></img>
                    </div>
                </div>
            </div>
        );
    }
}
export default InfoIndex;