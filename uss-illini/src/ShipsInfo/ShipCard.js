import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import StatsBar from './StatsBar.js'
import AutoSuggest from './AutoSuggest.js'

class ShipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Row>
                <Col sm="6">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <h1> {this.props.data["name"]} </h1>
                            </CardTitle>
                            <CardSubtitle>
                                Tier  {this.props.data["tier"]} {this.props.data["nation"]} {this.props.data["type"]}
                            </CardSubtitle>
                        </CardBody>
                        <img src={this.props.data["images_large"]}/>
                        <CardBody>
                            <CardText> {this.props.data["description"]} </CardText>
                        </CardBody>
                    </Card>
                </Col>
                    <Col>
                        <CardColumns>
                            <Col>
                                <Card>
                                    <CardHeader>Ship Statistics</CardHeader>
                                    <CardBody>
                                        <StatsBar data={this.props.data}/>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </CardColumns>
                    </Col>
                </Row>
            </div>
        );
    };
};

export default ShipCard;