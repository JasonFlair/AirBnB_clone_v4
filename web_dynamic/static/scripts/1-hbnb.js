$(document).ready(function() {
  let checkedAmenities = {};

  $('input:checkbox').change(function() {
    let amenityId = $(this).attr('data-id');
    let amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    let amenitiesString = Object.values(checkedAmenities).join(', ');
    $('.amenities h4').text(amenitiesString);
  });
});