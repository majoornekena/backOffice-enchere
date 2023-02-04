import React, { Component } from "react";
import './Place.css';

export default class Place extends Component {
    constructor(params) {
        super(params);
        this.state = {
            letter : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            allocated : false
        }
    }
    componentDidMount = () => {
        let mes = 450 / parseInt(this.props.rang,10);
        let elements = document.getElementsByClassName("place");
        mes = parseInt(mes,10);
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.width = mes + "px";
            elements[i].style.height = mes + "px";
        }
        this.isAllocated();
    }

    getRang = () => {
        return parseInt(this.props.x,10) % parseInt(this.props.rang,10);
    }

    getLignes = () => {
        return parseInt( parseInt(this.props.x,10) / parseInt(this.props.rang,10),10)+parseInt(this.props.debut,10);
    }

    isAllocated = () => {
        // alert(this.props.places)
        for (let i = 0; i < this.props.places.length; i++) {

            if (this.props.places[i].rang === this.getRang() && this.props.places[i].siege === this.getLignes()) {
                this.setState({
                    allocated : true
                });
            }
        }
    }

    clickMe = () => {
        let meth = 'POST';
        if (this.state.allocated) {
            meth = 'DELETE';
        }
        this.props.click(this.getRang(),this.getLignes(),meth);
    }

    render() {
        return (
            <React.Fragment>
                <div className={"place notAlloc "+ (this.state.allocated ? 'bg-orange' : '')} onClick={this.clickMe}>
                    <h3 className="text-dark text-center">{this.state.letter[this.getRang()] } {this.getLignes()}</h3>
                </div>
            </React.Fragment>
        );
    }
}