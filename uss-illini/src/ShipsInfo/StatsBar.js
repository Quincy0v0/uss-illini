import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class StatsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div className="text-center">Survivability</div>
                <Progress/>
                <div className="text-center">Artillery</div>
                <Progress value="25"/>
                <div className="text-center">Torpedoes</div>
                <Progress value={50}/>
                <div className="text-center">AA Defense</div>
                <Progress value={75}/>
                <div className="text-center">Maneuverability</div>
                <Progress value="100"/>
                <div className="text-center">Concealment</div>
                <Progress value="100"/>
            </div>
        );
    };
};

export default StatsBar;