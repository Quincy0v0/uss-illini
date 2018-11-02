import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class StatsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var data = this.props.data;

        var concealment = 0;
        var mobility = 0;
        var armour = 0;
        var anti_aircraft = 0;
        var aircraft = 0;
        var artillery = 0;
        var torpedoes = 0;

        if (data != undefined && data.length != 0){
            var attk = JSON.parse(data["default_profile_weaponry"].split(":").join("':'").split(",").join("','").replace("{","{'").replace("}","'}").split("'").join('"'));
            var cons = JSON.parse(data["default_profile_concealment"].split(":").join("':'").split(",").join("','").replace("{","{'").replace("}","'}").split("'").join('"'));
            var mobi = JSON.parse(data["default_profile_mobility"].split(":").join("':'").split(",").join("','").replace("{","{'").replace("}","'}").split("'").join('"'));
            var arm = data["default_profile_armour"];
            var arma = "{total:0}";
            for(var i = 0; i < arm.length - 6; i ++){
                var now = arm[i]+arm[i+1]+arm[i+2]+arm[i+3]+arm[i+4]+arm[i+5]
                if (now == "total:"){
                    for (var j = i; j < arm.length;j++){
                        var next = arm[j];
                        if(next==","){
                            arma = '{' + arm.substring(i,j) + '}';
                            var armam = JSON.parse(arma.split(":").join("':'").split(",").join("','").replace("{","{'").replace("}","'}").split("'").join('"'));
                            break;
                        }
                    }
                }
            }

            concealment = parseInt(cons["total"]);
            mobility = parseInt(mobi["total"]);
            armour = parseInt(armam["total"]);
            anti_aircraft = parseInt(attk["anti_aircraft"]);
            aircraft = parseInt(attk["aircraft"]);
            artillery = parseInt(attk["artillery"]);
            torpedoes = parseInt(attk["torpedoes"]);

        }

        return (
            <div>
                <div className="row">
                    <div className="col-9 text-left">Survivability</div>
                    <div className="col-3 text-right" >{armour}</div>
                </div>
                <Progress value={armour}>{armour}</Progress>
                <div className="row">
                    <div className="col-9 text-left">Artillery</div>
                    <div className="col-3 text-right" >{artillery}</div>
                </div>
                <Progress value={artillery}/>
                <div className="row">
                    <div className="col-9 text-left">Torpedoes</div>
                    <div className="col-3 text-right" >{torpedoes}</div>
                </div>
                <Progress value={torpedoes}/>
                <div className="row">
                    <div className="col-9 text-left">AA Defense</div>
                    <div className="col-3 text-right" >{anti_aircraft}</div>
                </div>
                <Progress value={anti_aircraft}/>
                <div className="row">
                    <div className="col-9 text-left">Maneuverability</div>
                    <div className="col-3 text-right" >{mobility}</div>
                </div>
                <Progress value={mobility}/>
                <div className="row">
                    <div className="col-9 text-left">Concealment</div>
                    <div className="col-3 text-right" >{concealment}</div>
                </div>
                <Progress value={concealment}/>
            </div>
        );
    };
};

export default StatsBar;