import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardSubtitle,CardColumns,
    CardTitle, CardText } from 'reactstrap';
import Plot from 'react-plotly.js';
import { Container, Row, Col } from 'reactstrap';

class PlayerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var data = this.props.data;
        if (data != undefined && data.length != 0){
            //onsole.log(data)
        }
        return (
            <div>
                <Row>
                    <Col md="12">
                        <CardColumns>
                            <Col>
                                <Card>
                                    <CardHeader>Player Info</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Name :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["account_name"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Account ID :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["account_id"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Battles :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["battles"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Win Rate :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["wins"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Personal Rating :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.score[0]*1000+this.props.score[1]*1000+this.props.score[2]*1000+this.props.score[3]*1000+this.props.score[4]*1000)/5)+3000}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Survival Rate :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["survived_battles"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Kills / deaths :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{Math.round((this.props.data["frags"]/(this.props.data["battles"]-this.props.data["survived_battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Clan :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["name"]}</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                              </Col>
                              <Col>
                                <Card>
                                    <CardHeader>Player's Average</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Average Damage :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["damage_dealt"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Average Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["frags"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Average Plane Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["aircraft_frags"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Average Warships Spotted :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["ships_spotted"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Average Damage Upon Spotting :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round((this.props.data["damage_scouting"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Average Experience :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{Math.round((this.props.data["xp"]/(this.props.data["battles"]))*100)/100}</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Player's Max</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Damage :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["max_damage_dealt"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["max_frags_battle"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Plane Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["max_planes_killed"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Warships Spotted :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["max_ships_spotted"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Damage Upon Spotting :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["max_damage_scouting"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <CardText className="text-left">Max Experience :</CardText>
                                            </div>
                                            <div className="col">
                                                <CardText className="text-left">{this.props.data["max_xp"]} </CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Player's Weapon</CardHeader>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Main Battery Accuracy :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round(this.props.data["main_battery_hits"]/this.props.data["main_battery_shots"]*100)}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Main Battery Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["main_battery_max_frags_battle"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Secondary Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["second_battery_max_frags_battle"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Torpedo Accuracy :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{Math.round(this.props.data["torpedoes_hits"]/this.props.data["torpedoes_shots"]*100)}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Torpedo Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["torpedoes_max_frags_battle"]}</CardText>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Max Aircraft Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["aircraft_max_frags_battle"]}</CardText>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <CardText className="text-left">Ramming Kills :</CardText>
                                            </div>
                                            <div className="col-6">
                                                <CardText className="text-left">{this.props.data["ramming_frags"]}</CardText>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>Player's Statistics based on STD</CardHeader>
                                    <CardBody>
                                        <Plot
                                            data = {this.props.plot_data}
                                            layout = {this.props.layout}
                                            config = {{displayModeBar: false}}
                                            style={{ width: "100%", height: "400px" }}
                                        />
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

export default PlayerCard;
