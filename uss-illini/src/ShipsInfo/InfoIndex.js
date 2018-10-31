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
        this.generate_html = this.generate_html.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            datastr: "",
            users: []
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        fetch('/users/ships')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    generate_html(ship_id) {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "ussillini_erikaze",
            password: "219749ajfcg",
            database: "ussillini_ussillini"
        });

        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var command = "SELECT * FROM ships WHERE ship_id = '" + ship_id + "';"
            con.query(command, function(err, result) {
                if (err) throw err;
                var data = result[0];
                var datastr = "";
                var price = 0;
                if (!(data["price_gold"] === null)) {
                    price = data["price_gold"];
                } else {
                    price = data["price_credit"];
                }
                var maincontainerstr = "<div class='main'>" +
                    "<h1>" + data["name"] + "</h1>" +
                    "<h2> Tier: " + data["tier"] + "</h2>" +
                    "<h2> Type: " + data["type"] + "</h2>" +
                    "<h2> Nation: " + data["nation"] + "</h2>" +
                    "<h2> Price: " + price + "</h2>" +
                    "</div>";
                var imagestr = "<div class='main'>" +
                    "<img src=" + data["images_large"] + "></img>" +
                    "</div>";
                datastr += maincontainerstr + imagestr;
                var webstr = "";
                this.setState({
                    datastr: datastr
                });
            });
        })
    }

    render() {
        //this.generate_html("4292818736")
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
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
                <div className="container">
                    <FormGroup>
                        <Label for="exampleSearch">Search</Label>
                        <Input type="search" name="search" id="exampleSearch" placeholder="shimakaze" />
                    </FormGroup>
                    <h1>Users</h1>
                    {this.state.users.map(user =>
                        <div key={user.id}>{user.username}</div>
                    )}
                </div>
            </div>
        );
    }
}
export default InfoIndex;