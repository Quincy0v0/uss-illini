import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
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

class InfoIndex extends Component {
    constructor(props) {
        super(props);
        this.getShipStr = this.getShipStr.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            datastr: "",
            data: [],
            names: []
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.getShipStr(4187894992)
    }

    getShipStr(ship_id) {
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
                                <NavLink href="/components/">Components</NavLink>
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
                <FormGroup>
                    <button className="btn-primary" onClick={() => {this.insert_ships(4187894992)}}>insert</button>
                </FormGroup>
                <div className="container">
                    <FormGroup>
                        <Label for="exampleSearch">Search</Label>
                        <Input type="search" name="search" id="exampleSearch" placeholder="shimakaze" />
                        <button className="btn-primary" onClick={() => {this.getShipStr(4187894992)}}>load ships</button>
                    </FormGroup>
                    <div>
                        <h1> {this.state.data["name"]} </h1>
                        <h2> Tier:  {this.state.data["tier"]} </h2>
                        <h2> Type:  {this.state.data["type"]} </h2>
                        <h2> Nation:  {this.state.data["nation"]} </h2>
                        <h2> Price: 2333 </h2>
                    </div>
                    <img src={this.state.data["images_large"]}></img>
                </div>
            </div>
        );
    }
}
export default InfoIndex;