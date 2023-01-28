$(document).ready(function() {
    const url = 'http://' + location.hostname + ':5001/api/v1/status';
    $.get(url, function(response) {
        if (response.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    })
});

$(document).ready(function() {
  let checkedAmenities = {};

  $('input:checkbox').change(function() {
    let amenityId = $(this).data('id');
    let amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    let amenitiesString = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesString);
  });
});
$(document).ready(function() {
    const url = 'http://' + location.hostname + ':5001/api/v1/places_search';

    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(response) {
            let places = response.places;
            for (let i = 0; i < places.length; i++) {
                let place = places[i];
                let placeTag = `<article>
                                    <div class="title_box">
                                        <h2>${place.name}</h2>
                                        <div class="price_by_night">${place.price_by_night}</div>
                                    </div>
                                    <div class="information">
                                        <div class="max_guest">${place.max_guest} Guests</div>
                                        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                        <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                                    </div>
                                    <div class="user">
                                        <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
                                    </div>
                                    <div class="description">
                                        ${place.description}
                                    </div>
                                </article>`;
                $('section.places').append(placeTag);
            }
        }
    });
});
