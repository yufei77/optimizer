Vue.component('result-page', {
    template: '<div>\
        <div id="aggGrid"></div>\
        <div id="jsGrid"></div>\
    </div>',
    data: function(){
        return {
            js_data: null,
            js_data_agg: null,
        }
    },
    methods: {
        load_result_data: function(){
            var myVar = this;
            $.ajax({
                type: "POST",
                url: "/api/load_result_data/",
            }).done(function(result){
                myVar.js_data = result;
                $("#jsGrid").jsGrid("loadData", result);
            });
        },
        load_result_agg: function(){
            var myVar = this;
            $.ajax({
                type: "POST",
                url: "/api/load_result_agg/",
            }).done(function(result){
                myVar.js_data_agg = result;
                $("#aggGrid").jsGrid("loadData", result);
            });
        },
    },
    mounted: function(){
        $("#jsGrid").jsGrid({
            width: "85%",
            height: "600px",

            filtering: false,
            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            autoload: true,

            pageSize: 10,
            pageButtonCount: 5,

            deleteConfirm: "Do you really want to delete client?",

            controller: {
                loadData: function(data){
                    return data;
                },
            },
            fields: [
                { name: "Name (BBG)", type: "text",},
                { name: "ISIN", type: "text",},
                { name: "Weight", type: "text"},
                { name: "New weight", type: "text",},
                { name: "Buy weight", type: "text",},
                // { type: "control" }
            ]
        });
        $("#aggGrid").jsGrid({
            width: "80%",
            height: "250px",

            filtering: false,
            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            autoload: true,

            pageSize: 10,
            pageButtonCount: 5,

            deleteConfirm: "Do you really want to delete client?",

            controller: {
                loadData: function(data){
                    return data;
                },
            },
            fields: [
                { name: "Column", type: "text",},
                { name: "Old Portfolio", type: "text",},
                { name: "New Portfolio", type: "text",},
            ]
        });
    },
    activated: function(){
        this.load_result_data();
        this.load_result_agg();
    },
})