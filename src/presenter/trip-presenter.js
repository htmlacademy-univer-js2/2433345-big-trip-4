import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import PointsListView from '../view/points-list-view';
import EditPointView from '../view/edit-point-view';
import EmptyListView from '../view/empty-list-view';
import { RenderPosition, render, replace } from '../framework/render';

export default class TripPresenter {
  #listPoints = new PointsListView();
  #containers = null;
  #pointsModel = null;
  #tripPoints = null;

  constructor({ containers, pointsModel }) {
    this.#containers = containers;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    render(new FilterView(this.#tripPoints.length), this.#containers.filter);

    if (this.#tripPoints.length > 0) {
      render(new TripInfoView(this.#tripPoints), this.#containers.tripInfo, RenderPosition.AFTERBEGIN);
      render(new SortView(), this.#containers.event);
      render(this.#listPoints, this.#containers.event);
      this.#tripPoints.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyListView(), this.#containers.event);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      onEditClick,
    });

    const editPointComponent = new EditPointView({
      point,
      onEditPointReset,
      onEditPointSubmit,
    });

    const escKeydown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        replace(pointComponent, editPointComponent);
        document.removeEventListener('keydown', escKeydown);
      }
    };

    function onEditClick() {
      replace(editPointComponent, pointComponent);
      document.addEventListener('keydown', escKeydown);
    }

    function onEditPointSubmit() {
      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', escKeydown);
    }

    function onEditPointReset() {
      replace(pointComponent, editPointComponent);
      document.removeEventListener('keydown', escKeydown);
    }

    render(pointComponent, this.#listPoints.element);
  }
}
