import React, { Component } from "react";

export default class AvionTitle extends Component {
    getTextColor = () => {
        let ans = 'info';
        console.log('color',this.props.color);
        if (this.props.color !== null && this.props.color !== undefined) {
            ans = this.props.color;
        }
        return ans;
    }

    componentDidMount = () => {
        this.getTextColor();
    }

    render() {
        return (
             <React.Fragment>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="align-self-center">
                                <div className={"page-title text-truncate text-"+this.getTextColor()+" font-weight-medium mb-1"}>
                                    {
                                        this.props.h === '1' ? (<h1>{this.props.title}</h1>) :
                                        this.props.h === '2' ? (<h2>{this.props.title}</h2>) :
                                        this.props.h === '3' ? (<h3>{this.props.title}</h3>) :
                                        this.props.h === '4' ? (<h4>{this.props.title}</h4>) :
                                        (<h1>{this.props.title}</h1>)
                                    }
                                    {
                                        this.props.children
                                    }
                                </div>
                        </div>
                    </div>
                </div>
             </React.Fragment>
        );
    }
}