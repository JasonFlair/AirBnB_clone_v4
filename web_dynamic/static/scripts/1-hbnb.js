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
    updateAmenitiesHeader();
  });

  function updateAmenitiesHeader() {
    let amenitiesString = Object.values(checkedAmenities).join(', ');
    $('h4#amenities_checked').text(amenitiesString);
  }
});