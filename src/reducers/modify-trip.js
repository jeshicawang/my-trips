/* eslint-disable no-case-declarations */

const { assign, updateItemInArray, newEmptyDestination } = require('./utilities.js')
const { MODIFY_TRIP } = require('../constants/views.js');
const { VIEW_CHANGED, TRIP_MODIFIED, TRIP_FORM_LOADED, AUTOCOMPLETE_CREATED, INPUT_UPDATED, DESTINATION_INPUT_UPDATED, DESTINATION_ADDED, DESTINATION_REMOVED, REMOVE_BUTTON_TOGGLED } = require('../constants/action-types.js');

const initialState = {
  id: null,
  title: null,
  description: null,
  removeButtons: [],
  destinations: [],
  notes: null,
  autocompletes: []
};

const modifyTrip = (state = initialState, action) => {
  if (action.view && action.view !== MODIFY_TRIP) return state;
  switch (action.type) {
    case VIEW_CHANGED:
    case TRIP_MODIFIED:
      return assign(state, initialState);
    case TRIP_FORM_LOADED:
      const { id, title, description, notes, destinations } = action.tripInfo;
      return assign(state, {
        id,
        title,
        description,
        removeButtons: Array(destinations.length).fill(false),
        destinations: [...destinations],
        notes
      })
    case AUTOCOMPLETE_CREATED:
      return assign(state, {
        autocompletes: [...state.autocompletes, action.autocomplete]
      })
    case INPUT_UPDATED:
      return assign(state, {
        [action.key]: action.value
      })
    case DESTINATION_INPUT_UPDATED:
      return assign(state, {
        destinations: updateItemInArray(state.destinations, action.index, (destination) => assign(destination, action.value))
      })
    case DESTINATION_ADDED:
      return assign(state, {
        destinations: [...state.destinations, newEmptyDestination()],
        removeButtons: Array(state.removeButtons.length + 1).fill(false)
      })
    case DESTINATION_REMOVED:
      return assign(state, {
        removeButtons: [...state.removeButtons.slice(0, action.index), ...state.removeButtons.slice(action.index + 1)],
        destinations: [...state.destinations.slice(0, action.index), ...state.destinations.slice(action.index + 1)],
        autocompletes: [...state.autocompletes.slice(0, action.index), ...state.autocompletes.slice(action.index + 1)]
      })
    case REMOVE_BUTTON_TOGGLED:
      return assign(state, {
        removeButtons: updateItemInArray(state.removeButtons, action.index, () => action.bool)
      })
    default:
      return state;
  }
}

module.exports = modifyTrip;
