import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import StatsBar from './StatsBar.js';
import parseJson from './parseJson.js';

class ShipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hull : {
                anti_aircraft_barrels: "N/A",
                artillery_barrels: "N/A",
                atba_barrels: "N/A",
                health: "N/A",
                range: {
                    max: "N/A",
                    min: "N/A",
                }
            },
            artillery : {
                distance: "N/A",
                gun_rate: "N/A",
                max_dispersion: "N/A",
                rotation_time: "N/A",
                shells: {
                    AP : {
                        bullet_mass: "N/A",
                        bullet_speed: "N/A",
                        burn_probability: "N/A",
                        damage: "N/A",
                        name: "N/A",
                        type: "AP",
                    },
                    HE : {
                        bullet_mass: "N/A",
                        bullet_speed: "N/A",
                        burn_probability: "N/A",
                        damage: "N/A",
                        name: "N/A",
                        type: "HE",
                    }
                },
                shot_delay: "N/A",
            },
            torpedoes: {
                torpedo_name: "N/A",
                torpedo_speed: "N/A",
                visibility_dist: "N/A",
                distance: "N/A",
                max_damage: "N/A",
                reload_time: "N/A",
                rotation_time: "N/A",
            },
            maneuverability : {},
            concealment : {},
            atbas : {

            },
            AA : {
                defense: "N/A",
                slots: []
            },
            fighters: {
                count_in_squadron: {
                    max: "N/A",
                    min: "N/A",
                },
                avg_damage: "N/A",
                cruise_speed: "N/A",
                max_ammo: "N/A",
                max_health: "N/A",
                name: "N/A",
                plane_level: "N/A",
                prepare_time: "N/A",
            },
            dive_bomber: {
                count_in_squadron: {
                    max: "N/A",
                    min: "N/A",
                },
                accuracy: {
                    max: "N/A",
                    min: "N/A",
                },
                bomb_burn_probability: "N/A",
                bomb_bullet_mass: "N/A",
                cruise_speed: "N/A",
                max_damage: "N/A",
                gunner_damage: "N/A",
                max_health: "N/A",
                name: "N/A",
                plane_level: "N/A",
                prepare_time: "N/A",
                bomb_name: "N/A",
            },
            torpedo_bomber: {
                count_in_squadron: {
                    max: "N/A",
                    min: "N/A",
                },
                cruise_speed: "N/A",
                max_damage: "N/A",
                max_health: "N/A",
                name: "N/A",
                gunner_damage: "N/A",
                plane_level: "N/A",
                prepare_time: "N/A",
                torpedo_distance: "N/A",
                torpedo_max_speed: "N/A",
                torpedo_name: "N/A",
            },
            flight_control: {
                bomber_squadrons: "N/A",
                fighter_squadrons: "N/A",
                torpedo_squadrons: "N/A",
            },
            range : {min: 0, max: 1},
            type: '',
            price_credit: '',
            price_gold: '',
        };
    }

    hull_card(){
        if (this.state.artillery != undefined){
            return (
                <Card>
                    <CardHeader>Main Artillery</CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Firing range :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.distance} km</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Dispersion :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.max_dispersion} m</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Rotation:</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.rotation_time} s / 180° </CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Reload :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.shot_delay} s</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }

    shell_card(){
        if (this.state.artillery != undefined) {
            return (
                <Card>
                    <CardHeader>Main Guns Shells</CardHeader>
                    <CardBody>
                        <CardSubtitle>{this.state.artillery.shells.HE.name}</CardSubtitle>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Mass :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.artillery.shells.HE.bullet_mass} kg</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.artillery.shells.HE.bullet_speed} m/s</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">damage :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.shells.HE.damage}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">burn chance :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.shells.HE.burn_probability} %</CardText>
                            </div>
                        </div>
                        <p/>
                        <CardSubtitle>{this.state.artillery.shells.AP.name}</CardSubtitle>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Mass :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.artillery.shells.AP.bullet_mass} kg</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.artillery.shells.AP.bullet_speed} m/s</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">damage :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.artillery.shells.AP.damage}</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
        }
    }

    price(){
        if (this.state.price_credit != undefined){
            return(
                <div className="row">
                    <div className="col-6">
                        <CardText className="text-left">Price (credit):</CardText>
                    </div>
                    <div className="col-6">
                        <CardText className="text-left">{this.props.data["price_credit"]}</CardText>
                    </div>
                </div>
            );
        }
        else if (this.state.price_gold != undefined){
            return(
                <div className="row">
                    <div className="col-6">
                        <CardText className="text-left">Price (gold):</CardText>
                    </div>
                    <div className="col-6">
                        <CardText className="text-left">{this.props.data["price_gold"]}</CardText>
                    </div>
                </div>
            )
        }
    }

    AA_card(){
        if (this.state.AA != undefined && this.state.AA.slots != undefined) {
            let guns = this.state.AA.slots.map((gun, idx) => {
                return (
                    <div>
                        <CardSubtitle>{gun.name}</CardSubtitle>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Range :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{gun.distance} km</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Avg Damgage :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{gun.avg_damage}</CardText>
                            </div>
                        </div>
                    </div>
                )
                }
            );
            return (
                <Card>
                    <CardHeader>Main Guns Shells</CardHeader>
                    <CardBody>
                        {guns}
                    </CardBody>
                </Card>
            )
        }
    }

    flight_control_card(){
        if (this.state.flight_control != undefined){
            return (
                <Card>
                    <CardHeader>Default Flight Control</CardHeader>
                    <CardBody>
                        <div className="row">
                            <div className="col-9">
                                <CardText className="text-left">Bomber Squadrons :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.flight_control.bomber_squadrons}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9">
                                <CardText className="text-left">Fighter Squadrons :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.flight_control.fighter_squadrons}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9">
                                <CardText className="text-left">Torpedo Squadrons :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.flight_control.torpedo_squadrons}</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }

    fighters_card(){
        if (this.state.fighters != undefined){
            return (
                <Card>
                    <CardHeader>Fighters</CardHeader>
                    <CardBody>
                        <CardSubtitle>{this.state.fighters.name}, Tier {this.state.fighters.plane_level}</CardSubtitle>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Avg Damage :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.fighters.avg_damage}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Cruise Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.fighters.cruise_speed} kts</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Ammo :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.fighters.max_ammo}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Health :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.fighters.max_health}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Prepare Time :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.fighters.prepare_time} s</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }

    bombers_card(){
        if (this.state.dive_bomber != undefined){
            return (
                <Card>
                    <CardHeader>Dive Bombers</CardHeader>
                    <CardBody>
                        <CardSubtitle>{this.state.dive_bomber.name}, Tier {this.state.dive_bomber.plane_level}</CardSubtitle>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Bomb Damage :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.dive_bomber.max_damage}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Burn Chance :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.dive_bomber.bomb_burn_probability*100} %</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Bomb Mass :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.dive_bomber.bomb_bullet_mass} lbs</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Cruise Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.dive_bomber.cruise_speed} kts</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Health :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.dive_bomber.max_health}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Prepare Time :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.dive_bomber.prepare_time} s</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }

    torp_bombers_card(){
        if (this.state.torpedo_bomber != undefined){
            return (
                <Card>
                    <CardHeader>Torpedo Bombers</CardHeader>
                    <CardBody>
                        <CardSubtitle>{this.state.torpedo_bomber.name}, Tier {this.state.torpedo_bomber.plane_level}</CardSubtitle>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Torpedo Dmg :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.torpedo_bomber.max_damage}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Torpedo Range :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.torpedo_bomber.torpedo_distance}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Torpedo Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.torpedo_bomber.torpedo_max_speed}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Cruise Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedo_bomber.cruise_speed} kts</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Health :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedo_bomber.max_health}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <CardText className="text-left">Prepare Time :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedo_bomber.prepare_time} s</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            )
        }
    }

    torp_card(){
        if (this.state.torpedoes != undefined) {
            return (
                <Card>
                    <CardHeader>Torpedoes</CardHeader>
                    <CardBody>
                        <CardSubtitle>{this.state.torpedoes.torpedo_name}</CardSubtitle>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Range :</CardText>
                            </div>
                            <div className="col">
                                <CardText
                                    className="text-left">{this.state.torpedoes.distance} km</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Damage :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedoes.max_damage}</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Speed :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedoes.torpedo_speed} kts</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Reload :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedoes.reload_time} s</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Rotation :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedoes.rotation_time} s</CardText>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CardText className="text-left">Visibility :</CardText>
                            </div>
                            <div className="col">
                                <CardText className="text-left">{this.state.torpedoes.visibility_dist} km</CardText>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
        }
    }

    UNSAFE_componentWillReceiveProps(){
        var data = this.props.data;
        this.setState({ type : data.type});
        if (data != undefined && data.length != 0){
            this.setState({artillery : parseJson(data.default_profile_artillery)});
            this.setState({AA : parseJson(data.default_profile_anti_aircraft)});
            this.setState({hull : parseJson(data.default_profile_hull)});
            this.setState({maneuverability : parseJson(data.default_profile_mobility)});
            this.setState({concealment : parseJson(data.default_profile_concealment)});
            this.setState({torpedoes : parseJson(data.default_profile_torpedoes)});
            this.setState({fighters : parseJson(data.default_profile_fighters)});
            this.setState({dive_bomber : parseJson(data.default_profile_dive_bomber)});
            this.setState({torpedo_bomber : parseJson(data.default_profile_torpedo_bomber)});
            this.setState({flight_control : parseJson(data.default_profile_flight_control)});
            this.setState({price_credit : data.price_credit});
            this.setState({price_gold : data.price_gold});
        }
        console.log(this.state.dive_bomber);
        console.log(this.state.fighters);
        console.log(this.state.torpedo_bomber);
        console.log(this.state.torpedoes);
        console.log(this.state.flight_control);
        console.log(data);
    }

    render() {
        var maneuverability = this.state.maneuverability;
        var concealment = this.state.concealment;
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

                                        {this.price()}

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
                                                <CardText className="text-left">{this.state.hull.health}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">AA mounts :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.state.hull.anti_aircraft_barrels}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Secondaries :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.state.hull.atba_barrels}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Planes :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.state.hull.planes_amount}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Armor :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.state.hull.range.min} - {this.state.hull.range.max} mm</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                                {this.hull_card()}
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
                                    </CardBody>
                                </Card>
                                {this.shell_card()}
                                {this.torp_card()}
                                {this.flight_control_card()}
                                {this.fighters_card()}
                                {this.bombers_card()}
                                {this.torp_bombers_card()}
                            </Col>
                        </CardColumns>
                    </Col>
                </Row>
            </div>
        );
    };
};

export default ShipCard;