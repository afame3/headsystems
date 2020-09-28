

function modCommunityMembersMapInitializeMap()
{



    map = new L.Map('map_canvas',{attributionControl:false});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: zoom,
        id: 'mapbox.streets',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var retry = 1
    points = [];
	markers = L.markerClusterGroup({ chunkedLoading: true});
    joms.jQuery(address).each(function (index) {
        modCommunityMembersMapCodeAddress(address[index].address, address[index].userdetails, retry);
    });


}

function modCommunityMembersMapCodeAddress(address, userdetails, retry) {
    bounds = new L.LatLngBounds();
    var contentString = [
        "<div class=\'joms-avatar--stream\' style=\'position:absolute;top:0;left:0;bottom:0;width:32px\'>",
        "<img src=\'", userdetails.avatar, "\' width=\'24\' height=\'24\' alt=\'\' style=\'position:absolute;top:50%;transform:translateY(-50%)\'>",
        "</div>",
        "<div style=\'margin-left:40px;overflow:hidden\'>",
        "<a href=\'", userdetails.link, "\'><b>", userdetails.username, "</b></a><br/>",
        "<span>", address, "</span>",
        "</div>"
    ].join("");
    var API = "https://nominatim.openstreetmap.org/search?q=" + address + "&format=json&addressdetails=0";



    joms.jQuery.getJSON(API, {
        format: "json"
    })
            .done(function (data) {

                if (data.length) {


                    var marker_point = data[0];
                    var marker = L.marker([marker_point.lat, marker_point.lon]).bindPopup(contentString);
					
					markers.addLayer(marker);
                    points.push([marker_point.lat, marker_point.lon]);

					  map.fitBounds(points);
                    map.addLayer(markers);

                } else {
                    retry = retry - 1;
                    modCommunityMembersMapCodeAddress(address, userdetails, retry);
                }
            });




}



function modCommunityMembersMapLoadScript() {


    modCommunityMembersMapLoadOMS();
}
