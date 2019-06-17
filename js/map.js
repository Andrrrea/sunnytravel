var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.487457, lng: 8.466040},
        zoom: 6
    });

    console.log(location.search);

    $.ajax({
        url: "http://localhost:8080/api/test2/largeCities",
        success: function (locationData) {
            var marker;
            for (var i = 0; i < locationData.length; i++) {
                console.log(locationData[i]);

                var lat = locationData[i].lat;
                var lng = locationData[i].lng;
                var city = locationData[i].city;

                var geodata = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                };
                var contentString = '<div id="content">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<h1 id="firstHeading" class="firstHeading"></h1>' +
                    '<div id="bodyContent">' +
                    '<p>' + city + '</p>' +
                    '<img src="http://openweathermap.org/img/w/10d.png"></img>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker = new google.maps.Marker({
                    position: geodata,
                    map: map,
                    title: city,
                })

                infowindow.open(map, marker);
                google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
                    return function () {
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                    };
                })(marker, contentString, infowindow));
            }
        }
    });
}