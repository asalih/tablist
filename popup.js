var parsing = false;
$(function () {
    getAllTabs();
    $("#refresh").click(getAllTabs);
    $("#parse").click(parse);
});

function parse() {
    parsing = true;
    var tabs = $("#pars").val().split("\n");
    if (tabs != undefined) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.create({ url: tabs[i] });
        }   
    }

    $("#pars").val("");

    parsing = false;
}

function getAllTabs() {
    chrome.tabs.query({
        currentWindow: true
    },
        function (response) {
            var urls = "";
            for (var i = 0; i < response.length; i++) {
                var url = response[i].url;
                if (url != "chrome://newtab/"){
                    urls += response[i].url + "\n";
                }
            }

            $("#tabsList").val(urls);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    if(parsing){
        getAllTabs();
    }
});
