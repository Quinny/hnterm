var hn       = require("../hn.js");
var config   = require("../config.json");
var listView = require("./list-view.js");

module.exports = listView({
    title: "Job Stories",
    viewName: "jobs",
    fetchData: function() {
        return hn.get("jobstories.json");
    },
    extras: [
        {
            on: config.keys.left,
            action: function (container) {
                container.changeView("stories", {});
            }
        }
    ]
});
