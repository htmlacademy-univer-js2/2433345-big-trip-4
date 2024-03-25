import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import PointView from '../view/point-view';
import PointsListView from '../view/points-list-view';
import EditPointView from '../view/edit-point-view';
import { RenderPosition, render, replace } from '../framework/render';

export default class TripPresenter {
  #listPoints = new PointsListView();
  #containers;
  #pointsModel;
  #tripPoints;

  constructor({ containers, pointsModel }) {
    this.#containers = containers;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    render(new TripInfoView(), this.#containers.tripInfo, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#containers.filter);
    render(new SortView(), this.#containers.event);
    render(this.#listPoints, this.#containers.event);
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
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
