import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormText, Dropdown } from 'reactstrap';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from './dispersion.js';
import {
    Card, CardHeader, CardFooter, CardBody, CardTitle, CardText,
    Container,
    Row,
    Col,
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
import reference from './reference.png';
import map from  './map.png';
class Simulator extends Component {
    constructor(props) {
        super(props);
        this.shotChange = this.shotChange.bind(this);
        this.tierChange = this.tierChange.bind(this);
        this.nationChange = this.nationChange.bind(this);
        this.distanceChange = this.distanceChange.bind(this);
        this.xChange = this.xChange.bind(this);
        this.yChange = this.yChange.bind(this);
        this.thetaChange = this.thetaChange.bind(this);
        this.start = this.start.bind(this);
        this.state = {
            shots: 9,
            distance: 10,
            nation: "japan",
            tier: 10,
            is_locked: true,
            data : [],
            x : 0,
            y : 0,
            theta : 180,
            layout:{
              showlegend: false,
              height: 1000,
              width: 1200,
              font: {
                family: 'Lato',
                size: 16,
                color: 'rgb(100,150,200)'
              },
              plot_bgcolor: 'rgba(102, 204, 255,0)',
              images: [
                {
                  source: map,
                  xref: "x",
                  yref: "y",
                  x: -12000,
                  y: 24000*1080/1920/2,
                  sizex: 24000,
                  sizey: 24000*1080/1920,
                  sizing: "stretch",
                  opacity: 0.5,
                  layer: "below",
                },
                {
                  source: reference,
                  xref: "x",
                  yref: "y",
                  x: 0-263/2,
                  y: 263*411/1200/2,
                  sizex: 263,
                  sizey: 263*411/1200,
                  sizing: "stretch",
                  opacity: 1,
                  layer: "below",
                },

              ],
              plot_bgcolor:'rgba(9,30,50,1)',
              margin: {l: 20, b: 20, t: 20, r: 20},
              xaxis:{
                range: [-150,150],
                showgrid: false,
                zeroline: false,
              },
              yaxis:{
                range: [-150,150],
                showgrid: false,
                zeroline: false,
              },
            }
        };
    }
    start(shots,distance,nation,tier,is_locked,x,y,theta){
        var result = main(shots,distance,nation,tier,is_locked,x,y,theta);
        this.setState({
          data : result,
        });
    }
    shotChange(event) {
        this.setState({shots: parseInt(event.target.value)});
    }
    tierChange(event) {
        this.setState({tier: parseInt(event.target.value)});
    }
    nationChange(event) {
        this.setState({nation: event.target.value});
    }
    distanceChange(event) {
        this.setState({distance: parseFloat(event.target.value)});
    }
    xChange(event) {
        this.setState({x: parseFloat(event.target.value)});
    }
    yChange(event) {
        this.setState({y: parseFloat(event.target.value)});
    }
    thetaChange(event) {
        this.setState({theta: parseFloat(event.target.value)});
    }

    render() {
        return (
            <div>
<<<<<<< HEAD
                <div className="container">
                    <FormGroup>
                        <h2>Input # of Shots</h2>
                        <Input type="text" name="shots" id="shots" value={this.state.shots} onChange={this.shotChange} placeholder="# of shots fired"/>
                        <h2>Input Distance(km)</h2>
                        <Input type="text" name="distance" id="distance" value={this.state.distance} onChange={this.distanceChange} placeholder="distance(km)" />
                        <h2>Select Nation</h2>
                        <Input type="select" name="selectnation" id="selectnation" onChange={this.nationChange}>
                          <option>japan</option>
                          <option>usa</option>
                          <option>germany</option>
                          <option>uk</option>
                          <option>france</option>
                        </Input>
                        <h2>Select Tier</h2>
                        <Input type="select" name="selecttier" id="selecttier" onChange={this.tierChange}>
                          <option>10</option>
                          <option>9</option>
                          <option>8</option>
                          <option>7</option>
                          <option>6</option>
                          <option>5</option>
                          <option>4</option>
                          <option>3</option>
                        </Input>
                        <h2>Input Aim X</h2>
                        <Input type="text" name="x" id="x" value={this.state.x} onChange={this.xChange} placeholder="x"/>
                        <h2>Input Aim Y</h2>
                        <Input type="text" name="y" id="y" value={this.state.y} onChange={this.yChange} placeholder="y"/>
                        <h2>Input Aim theta</h2>
                        <Input type="text" name="theta" id="theta" value={this.state.theta} onChange={this.thetaChange} placeholder="theta"/>
                        <button className="btn-primary" onClick={() => {this.start(this.state.shots,this.state.distance,this.state.nation,this.state.tier,this.state.is_locked,this.state.x,this.state.y,this.state.theta)}}>Fire!</button><br/>
                        <button className="btn-primary" onClick={() => {window.location.reload()}}>NVM...dismissed!</button>
                    </FormGroup>
                    <Plot
                      data = {this.state.data}
                      layout = {this.state.layout}
                      //onClick ={(dat) => this.setState({x:dat.points['0']['x'],y:dat.points['0']['y']})}
                      //config = {{scrollZoom: true}}
                    />
                </div>
=======
                <Navbar color="dark" className="navbar-dark navbar-expand-sm" light expand="md">
                    <NavbarBrand href="/">USS illini</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/Quincy0v0/uss-illini">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            <p/>
                <Container fluid>
                        <Row form>
                        <Col>
                            <Card body outline color="secondary">
                                <CardTitle>
                                    Dispersion Simulator
                                </CardTitle>
                        <Form className="text-left">
                            <FormGroup>
                                <Label for="shots">Input # of Shots</Label>
                                <Input type="text" name="shots" id="shots" value={this.state.shots} onChange={this.shotChange} placeholder="# of shots fired"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="distance">Input Distance(km)</Label>
                                <Input type="text" name="distance" id="distance" value={this.state.distance} onChange={this.distanceChange} placeholder="distance(km)" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="selectnation">Select Nation</Label>
                                <Input type="select" name="selectnation" id="selectnation" onChange={this.nationChange}>
                                  <option>japan</option>
                                  <option>usa</option>
                                  <option>germany</option>
                                  <option>uk</option>
                                  <option>france</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="selecttier">Select Tier</Label>
                                <Input type="select" name="selecttier" id="selecttier" onChange={this.tierChange}>
                                  <option>10</option>
                                  <option>9</option>
                                  <option>8</option>
                                  <option>7</option>
                                  <option>6</option>
                                  <option>5</option>
                                  <option>4</option>
                                  <option>3</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="x">Input Aim X</Label>
                                <Input type="text" name="x" id="x" value={this.state.x} onChange={this.xChange} placeholder="x"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="y">Input Aim Y</Label>
                                <Input type="text" name="y" id="y" value={this.state.y} onChange={this.yChange} placeholder="y"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="theta">Input Aim theta</Label>
                                <Input type="text" name="theta" id="theta" value={this.state.theta} onChange={this.thetaChange} placeholder="theta"/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={() => {this.start(this.state.shots,this.state.distance,this.state.nation,this.state.tier,this.state.is_locked,this.state.x,this.state.y,this.state.theta)}}>Fire!</Button>
                            </FormGroup>
                        </Form>
                            </Card>
                        </Col>
                        <Col>
                            <Card body outline color="secondary">
                            <Plot
                              data = {this.state.data}
                              layout = {this.state.layout}
                              //onClick ={(dat) => this.setState({x:dat.points['0']['x'],y:dat.points['0']['y']})}
                              config = {{displayModeBar: false}}
                            />
                            </Card>
                        </Col>
                </Row>
                </Container>
>>>>>>> 6cdd754ea0b82f5dff3080368645814a0d06ad2e
            </div>
        );
    }
}
export default Simulator;
