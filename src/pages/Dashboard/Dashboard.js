import React, { Component } from "react";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { browserHistory } from "react-router";

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


const INITIAL_STATE = {

}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE

    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);