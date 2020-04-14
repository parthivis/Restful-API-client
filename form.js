const url = "https://people.rit.edu/dmgics/754/23/proxy.php";

$(function () {
    getOrgTypes();
    getStates();

});

function getOrgTypes() {
    $.ajax({
        cache: false,
        url: url,
        data: { path: "/OrgTypes" },
        dataType: "xml",
        success: function (data, status) {
            let opts = "";
            if ($(data).find("error").length !== 0) {
                //do something gracefully
            }

            else {
                opts += "<option value =''> All Organization Types </option>";
                $("row", data).each(function () {

                    opts += "<option value ='" +
                        $("type", this).text() +
                        "'>" +
                        $("type", this).text() +
                        "</option>";
                });
                $("#Organization_Type").html(opts);
            }
        }
    })
}

function getStates() {
    $.ajax({
        cache: false,
        url: url,
        data: { path: "/States" },
        dataType: "xml",
        success: function (data, status) {

            let selectStates = "";
            if ($(data).find("error").length !== 0) {
                // do something gracefully
            }

            else {
                selectStates += "<option value =''> States </option>";
                $("row", data).each(function () {

                    selectStates += "<option value ='" +
                        $("State", this).text() +
                        "'>" +
                        $("State", this).text() +
                        "</option>";
                });
                $("#State_Type").html(selectStates);
            }
        }
    });
}

function getCities() {
    $.ajax({
        cache: false,
        url: url,
        data: { path: "/Cities?state=" + $("#State_Type option:selected").text() },
        dataType: "xml",
        success: function (data, status) {

            let selectCities = "";
            if ($(data).find("error").length !== 0) {
                // do something gracefully
            }

            else {
                selectCities += "<option value =''></option>";
                $("row", data).each(function () {
                    selectCities += "<option value ='" +
                        $("city", this).text() +
                        "'>" +
                        $("city", this).text() +
                        "</option>";
                });
                $("#city_type").html(selectCities);
            }
        }
    });
}

function pageLoad() {
    $("#resetForm").reset();
    return false;
}

function showResults() {
    $.ajax({
        url: url,
        data: {
            path: "/Organizations?" + $("#Form").serialize()
        },
        success: function (data) {
            let output = "";
            $("#tableOutput").html("");
            if ($("row", data).length === 0) {
                //do something

                $('.not-found').css('display', 'block'); // Display the Not Found message
            }
            else {
                $('.not-found').css('display', 'none');
                output = `<table id="results-table" class = "tablesorter tablesorter-blue">
						<thead>
						<tr>
						<th>Type</th>
						<th>Name</th>
						<th>City</th>
						<th>State</th>
						<th>County</th>
						<th>Zip</th>
						</tr>
						</thead>`;

                $("row", data).each(function () {
                    output += `<tr>
							<td>${$(this).find("type").text()}</td>
							<td><a href ="#" id="abc" onClick = "getOrgTabs(${$(this).find("OrganizationID").text()});">${$(this).find("Name").text()}</a></td>
							<td>${$("city", this).text()}</td>
							<td>${$("State", this).text()}</td>
							<td>${$("CountyName", this).text()}</td>
							<td>${$("zip", this).text()}</td>
							</tr>`;
                });

                output += "</table>";
                $("#tableOutput").html(output);

                $("#results-table").tablesorter({
                    headers: {
                        2: { sorter: true }
                    }
                });
            }
        }
    });
}

function getOrgTabs(orgId) {
    $.ajax({
        type: "GET",//HTTP method, could also be "POST"
        async: true,//request should be non-blocking
        cache: false,
        url: url,
        data: { path: "/Application/Tabs?orgId=" + orgId },
        dataType: "xml",
        success: function (data, status) {

            console.log(data);

            let tabsList = {};
            $("row", data).each(function () {
                let tabName = $(this).find("Tab").text();
                tabsList[tabName] = {};
                tabsList[tabName]["label"] = tabName;
                let api = "";
                if (tabName === "Treatment") {
                    api = "/Treatments";
                }
                else { api = "/" + orgId + "/" + tabName }
                tabsList[tabName]["showTab"] = function () {
                    setTimeout(function () {
                        $abc = $('#abc');
                        $.ajax({
                            type: "GET",//HTTP method, could also be "POST"
                            async: true,//request should be non-blocking
                            cache: false,
                            url: url,
                            data: { path: api },
                            dataType: "xml",
                            success: function (data, status) {
                                console.log(data);
                                //custom Plugin call 
                                $abc.updateTabContent(tabName, data);
                            } // just a delay for demonstrating the built-in throbber
                        });
                    }, 500);
                }

            });
            console.log(tabsList);

            $('#abc').tabModal({
                header: 'Emergency Service Directory',
                tabs: tabsList
            });

            $('#abc').tabModal('show');
            $('.abc').tabModal({
                dismissable: true,
                default_tab_content: 'use-throbber',
                header: '<h6>header html</h6>', // string or function ( 'this' is set to the widget's anchor element )
                tabs: {}
            });
        }
    });
}

