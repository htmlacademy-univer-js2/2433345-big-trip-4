import TripPresenter from "./presenter/trip-presenter";

const tripInfoContainer = document.querySelector(".trip-main");
const filterContainer = document.querySelector(".trip-controls__filters");
const eventContainer = document.querySelector(".trip-events");

const containers = {
    tripInfo: tripInfoContainer,
    filter: filterContainer,
    event: eventContainer,
};

const tripPresenter = new TripPresenter(containers);

tripPresenter.init();

