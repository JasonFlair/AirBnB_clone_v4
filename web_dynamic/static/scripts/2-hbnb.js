$(document).ready(function() {
  $.get('http://${location.hostname}:5001/api/v1/status/', function(data) {
  if (data.status === 'OK') {
    console.log('http://${location.hostname}:5001/api/v1/status/')
    console.log('omo mehnnn')
    $('div#api_status').addClass('available');
    console.log('reached whats wrong')
  } else {
    $('div#api_status').removeClass('available');
  }
  });
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