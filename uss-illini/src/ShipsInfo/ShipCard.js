import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import StatsBar from './StatsBar.js'
import AutoSuggest from './AutoSuggest.js'
import parseJson from './parseJson.js'


class ShipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HitPoint : 0,
        };
    }

    render() {
        var data = this.props.data;
        if (data != undefined && data.length != 0){
            console.log(data)
            var hull = data.default_profile_hull;
            console.log(parseJson(hull))
        }
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
                    <Col sm="6">
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
                                    <CardHeader>Ship Info</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Tier :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["tier"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Nation :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["nation"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Type :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["type"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Price :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["price_credit"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Mod Slots :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["mod_slots"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Battle Tier :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["default_profile_battle_level_range_min"]} - {this.props.data["default_profile_battle_level_range_max"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">ship id :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["ship_id"]}</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Advanced Info</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Hit points :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{hull}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Nation :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["nation"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Type :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["type"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Price :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["price_credit"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Mod Slots :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["mod_slots"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Battle Tier :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["default_profile_battle_level_range_min"]} - {this.props.data["default_profile_battle_level_range_max"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">ship id :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["ship_id"]}</CardText>
                                            </div>
                                        </div>
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