$(document).ready(function() {
  const apiUrl = 'http://' + location.hostname + ':5001/api/v1/';

  $.ajax({
    type: 'GET',
    url: apiUrl + 'status',
    success: function(response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

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

  $('button').click(function() {
    $.ajax({
      type: 'POST',
      url: apiUrl + 'places_search',
      contentType: 'application/json',
      data: JSON.stringify({amenities: Object.keys(checkedAmenities)}),
      success: function(response) {
        let places = response;
        $('section.places').empty();
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
});
