import React, { Component } from "react";
import Place from "./Place";
import './Classes.css';

export class Classes extends Component {
    getPlaceNumber = () => {
        let rang = parseInt(this.props.rang,10);
        let siege = parseInt(this.props.classe.rfin,10)-parseInt(this.props.classe.rdebut,10) +1;
        return rang * siege;
    }    

    render() {
        return (
             <React.Fragment>
                <div className={"row mt-3 hclasses cls cls"+this.props.classe.type.value}>
                    {
                        Array(this.getPlaceNumber()).fill().map(
                            (_, index) => (
                                <Place key={index} rang={this.props.rang} x={index} debut={this.props.classe.rdebut} places={this.props.places} click={this.props.click} />
                            )
                        )
                    }
                </div>
             </React.Fragment>
        );
    }
}