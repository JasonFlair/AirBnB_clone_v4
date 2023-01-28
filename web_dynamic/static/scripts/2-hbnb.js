$(document).ready(function() {
  const url = 'http://' + location.hostname + ':5001/api/v1/status/';
  console.log(url);
  $.get(url, function(data) {
  if (data.status === 'OK') {
    console.log('hm wait');
    $('div#api_status').addClass('available');
  } else {
    console.log('somethings wrong');
    $('div#api_status').removeClass('available');
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
});