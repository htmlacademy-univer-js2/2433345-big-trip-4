import TripPresenter from "./presenter/trip-presenter";
import PointsModel from "./model/points-model";

const tripInfoContainer = document.querySelector(".trip-main");
const filterContainer = document.querySelector(".trip-controls__filters");
const eventContainer = document.querySelector(".trip-events");

const containers = {
  tripInfo: tripInfoContainer,
  filter: filterContainer,
  event: eventContainer,
};

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({ containers, pointsModel });

tripPresenter.init();