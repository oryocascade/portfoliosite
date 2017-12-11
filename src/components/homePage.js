"use strict";

var React = require('react');

var Home = React.createClass({
    render: function () {
        return (
            <header className="masthead text-center text-white d-flex">
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <h1 className="header-title">
                                <strong>|C&nbsp;&nbsp;&nbsp;&nbsp; C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</strong>
                            </h1>
                            <hr />
                        </div>
                        <div className="col-lg-8 mx-auto">
                            {/*<p className="text-faded mb-5">Placeholder for catch phrase</p>*/}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Home;