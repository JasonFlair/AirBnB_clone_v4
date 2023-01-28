$(document).ready(function() {
    const url = 'http://' + location.hostname + ':5001/api/v1/status';
    $.get(url, function(response) {
        if (response.status === 'OK') {
            console.log('we re okay');
            $('div#api_status').addClass('available');
        } else {
            console.log('why did we get here');
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
