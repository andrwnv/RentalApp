import React from 'react';

import './Experience.css';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.fullName = `${localStorage.getItem('firstName')}`;
    }

    render() {
        return (
            <div>
                <h2 className = "User">{this.fullName}, что ты хочешь найти?</h2>
            </div>
        );
    }
}
