import AbstractView from '../framework/view/abstract-view';

function createEmptyListView() {
  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
}

export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListView();
  }
}
