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
            hull: {}
        };

    }

    render() {
        var data = this.props.data;
        var range = {min: 0, max: 1}
        var hull_dict = {};
        var artillery = {};
        var maneuverability = {};
        var concealment = {};
        var atbas = {};
        if (data != undefined && data.length != 0){
            hull_dict = parseJson(data.default_profile_hull);
            artillery = parseJson(data.default_profile_artillery);
            maneuverability =  parseJson(data.default_profile_mobility);
            concealment = parseJson(data.default_profile_concealment);
            //atbas = parseJson(data.default_profile_atbas); # bug here!
        }
        console.log(data)
        console.log(atbas)
        range = hull_dict.range;
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
                                    <CardHeader>Hull  Info</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Hit points :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{hull_dict.health}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">AA mounts :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{hull_dict.anti_aircraft_barrels}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Secondaries :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{hull_dict.atba_barrels}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Torpedoes :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{hull_dict.torpedoes_barrels}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Planes :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{hull_dict.planes_amount}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">hull id :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{hull_dict.hull_id}</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Artillery Info</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Firing range :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{artillery.distance} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Firing rate :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{artillery.gun_rate} / min</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Dispersion :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{artillery.max_dispersion} m</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Rotation:</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{artillery.rotation_time} s / 180° </CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Reload :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{artillery.shot_delay} s</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Slot :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{} m</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Maneuverability</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max speed :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{maneuverability.max_speed} kts</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Rudder shift :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{maneuverability.rudder_time} s</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Turn radius:</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{maneuverability.turning_radius} m</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Detection distance</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By ship :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_ship} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By plane :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_plane} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">After fire :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.total} km</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Secondary guns</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By ship :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_ship} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By plane :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_plane} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">After fire :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.total} km</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader>Torpedoes</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By ship :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_ship} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">By plane :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.detect_distance_by_plane} km</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">After fire :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{concealment.total} km</CardText>
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