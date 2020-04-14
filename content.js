(function ($) {
    $.fn.updateTabContent = function (tabName, data) {
        $abc = $('#abc');

        let contents = {
            "Locations": function () {
                let content = '<div id="locations" class="locations">';
                content += '<div id="locations-select"><select id ="select-location">'
                var locations = [];

                $(data).find("location").each(function () {
                    locations.push($(this));
                    content += `<option value = "${$(this).find("type").text()}">Location:${$(this).find("type").text()}</option>`;
                });

                content += '</select></div>';
                content += '<div id="locations-details" class="locations-details"><table>';
                $(data).find("location").first().children().each(function () {
                    content += `<tr><td>${$(this).prop("tagName")}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`;
                });
                content += '</table></div>';
                content += '<div id="locations-map" class="locations-map" style="margin-left: 15%;height: 400px;width:50%;position:relative;left:3px;"></div>';
                content += '</div>';
                console.log(content);
                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
                (function () {
                    var index = $("#select-location").prop('selectedIndex');
                    var addr1 = $(locations[index]).find("address1").text() + " " + $(locations[index]).find("city").text() + " " + $(locations[index]).find("state").text() + " " + + $(locations[index]).find("zip").text();
                    console.log("address", addr1);
                    $("#locations-map").googleMap();
                    $("#locations-map").addMarker({
                        address: addr1,
                        url: 'http://www.tiloweb.com' // Link
                    })
                })();

                $("#select-location").change(function () {
                    var index = $(this).prop('selectedIndex');
                    $("#locations-details").empty();
                    $("#locations-map").empty();
                    $("#locations-details").append('<table>');
                    $(locations[index]).children().each(function () {
                        $("#locations-details").append(`<table><tr><td>${$(this).prop("tagName")}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr></table>`);
                    });
                    $("#locations-details").append('</table>');

                    (function () {
                        var index1 = $("#select-location").prop('selectedIndex');
                        var addr1 = $(locations[index]).find("address1").text() + " " + $(locations[index]).find("city").text() + " " + $(locations[index]).find("state").text() + " " + + $(locations[index]).find("zip").text();
                        console.log("address", addr1);
                        $("#locations-map").googleMap();
                        $("#locations-map").addMarker({
                            address: addr1,
                            url: 'http://www.tiloweb.com' // Link
                        })
                    })();
                });
            },
            "General": function () {
                let content = '<div class = "GeneralDiv"><table>';
                $(data).find("data").children().each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`;
                });
                content += '</table></div>';
                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            },
            "Treatment": function () {
                let content = '<div class = "TreatmentDiv"><table>';
                $(data).find("type", data).each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`
                });
                content += '</table></div>';
                console.log(content);

                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            },
            "Equipment": function () {
                let content = '<div class = "EquipmentDiv"><table>';
                $(data).find("data").children().each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`
                });
                content += '</table></div>';
                console.log(content);

                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            },
            "Facilities": function () {
                let content = '<div class ="FacilitiesDiv"><table>';
                $(data).find("data").children().each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`
                });
                content += '</div>';
                console.log(content);

                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            },
            "Physicians": function () {
                let content = '<div class = "PhysiciansDiv"><table>';
                $(data).find("data").children().each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`
                });
                content += '</div>';
                console.log(content);
                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            }, "People": function () {
                let content = '<div>';

                
                 let sites =[];
                 console.log( "People Result" ,$(data).find("siteCount").eq(0).text());
                if($(data).find("siteCount").first().text() ==="0"){
                    content += "<h4>No site found</h4>";
                    
                }

                else{  console.log( "People Result1" ,$(data).find("personCount").eq(0).text());
                content += '<div class="People-select"><select id ="select-People">';
                $(data).find("site").each(function () {
                    let siteName = `${$(this).attr("address")}:${$(this).attr("siteType")} `;
                    sites.push($(this));
                    content += "<option value =" + siteName + ">" + siteName + "</option>";
                });

                content += '</select></div>';
                    if($(data).find("personCount").first().text() === "0"){
                     content += "<h4>No person found</h4>";
                    }
                    else{

               
                content += `<div class="people-details"><table><tr>${$(sites[0]).attr("siteId")}:${$(sites[0]).attr("address")}</tr>`;
                content += "<tr><td>name</td><td>role</td></tr>";
                $(data).find("person").first().children().each(function () {
                    content += `<tr><td>${$(this).find("fName").text()}</td><td>&nbsp;&nbsp</td><td>${$(this).find("role").text()}</td></tr>`;
                });
                content += '</table></div>';

                               
                content += '</div>';
            }
                console.log(content);
                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
                }
            },
                "Training": function () {
                let content = '<div class ="TrainingDiv"><table>';
                console.log("data2", data);
                $(data).find("data").children().each(function () {
                    content += `<tr><td>${this.tagName}</td><td>&nbsp;&nbsp</td><td>${$(this).text()}</td></tr>`
                });
                content += '</div>';
                $abc.tabModal('setTabContent', tabName, content);
                $abc.tabModal('markForReload', tabName);
            }
        };
        contents[tabName]();
        return this;
    }
})(jQuery);
