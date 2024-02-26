import TripInfoView from "../view/trip-info-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import PointView from "../view/point-view";
import PointsListView from "../view/points-list-view";
import EditPointView from "../view/edit-point-view";
import { RenderPosition, render } from "../render";

export default class TripPresenter {
  constructor(containers) {
    this.containers = containers, 
    this.listPoints = new PointsListView()
  }

  init() {
    render(new TripInfoView(), this.containers.tripInfo, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.containers.filter);
    render(new SortView(), this.containers.event);
    render(this.listPoints, this.containers.event);
    render(new EditPointView(), this.listPoints.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listPoints.getElement());
    }
  }
}

