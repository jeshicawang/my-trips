
exports.up = function(knex, Promise) {
  const query = knex('destinations').insert({
      trip_id: 5,
      location: 'San Francisco',
      place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      start_date: '2017-01-04',
      end_date: '2017-01-07',
      photo_url: 'https://images.unsplash.com/photo-1414005987108-a6d06de8769f'
  });
  return query;
};

exports.down = function(knex, Promise) {
  const maxId = knex('destinations').max('id');
  const query = knex('destinations').where('id', maxId).del();
  return query;
};
