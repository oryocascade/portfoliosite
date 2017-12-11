$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');
var Resume = require('./components/home/resume');
var Projects = require('./components/projects/projectList');

(function (win) {
    var App = React.createClass({
        render: function () {
            var Child;

            switch (this.props.route) {
                case 'about': Child = About; break;
                case 'projects' : Child = Projects; break;
                default: Child = Home;
            }

            return (
                <div>
                    <Header/>
                    <Child/>
                </div>
            );
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route} />, document.getElementById('page-top'));
    }

    win.addEventListener('hashchange', render);
    render();
})(window);