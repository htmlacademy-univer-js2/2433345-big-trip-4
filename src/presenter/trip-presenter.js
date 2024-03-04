import TripInfoView from "../view/trip-info-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import PointView from "../view/point-view";
import PointsListView from "../view/points-list-view";
import EditPointView from "../view/edit-point-view";
import { RenderPosition, render } from "../render";

export default class TripPresenter {
  listPoints = new PointsListView()
  
  constructor({ containers, pointsModel }) {
    this.containers = containers,
    this.pointsModel = pointsModel
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(new TripInfoView(), this.containers.tripInfo, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.containers.filter);
    render(new SortView(), this.containers.event);
    render(this.listPoints, this.containers.event);
    render(new EditPointView({ point: this.tripPoints[0] }), this.listPoints.getElement());

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new PointView({ point: this.tripPoints[i] }), this.listPoints.getElement());
    }
  }
}

