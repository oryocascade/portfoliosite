"use strict";

var React = require('react');

var ProjectList = React.createClass({
    getInitialState: function () {
        return {
            projectList: []
        };
    },

    componentWillMount: function () {
        this.setState({
            projectList: [
                {
                    icon: "icon icon-instagram wow animated fadeIn",
                    title: "instagram Contest Judge",
                    desc: "This web app written in React help marketers determine the winner(s) of contests run on instagram by using the instagram api filter and sort through posts and comments based on certian criteria. The users can then assign points to various attributes to help better determine who should win."
                },
                {
                    icon: "icon icon-database",
                    title: "IOC Audit Solution",
                    desc: "Audit solution using IOC to keep track of auditing actions in a database."
                },
                {
                    icon: "icon icon-database",
                    title: "lorem ipsum",
                    desc: "Audit solution using IOC to keep track of auditing actions in a database."
                },
                {
                    icon: "icon icon-database",
                    title: "dolor ipsum",
                    desc: "Audit solution using IOC to keep track of auditing actions in a database."
                }
            ]
        });
    },

    render: function () {
        var createProjectRow = function (project) {
            return (
                <div key={project.title} className="col-md-4 col-sm-6 text-center">
                    <div className="feature-left">
                        <div className={project.icon}></div>
                        <div className="feature-copy">
                            <h3 className="mb-3">{project.title}</h3>
                            <p className="mb-0">{project.desc}</p>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <section id="project-list">
                <div className="container">
                    <div className="services-padding">
                        <div className="row">
                            <div className="col-md-12 text-center title-padding">
                                <h1><strong>Projects</strong></h1>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-md-center">
                            {this.state.projectList.map(createProjectRow, this)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = ProjectList;