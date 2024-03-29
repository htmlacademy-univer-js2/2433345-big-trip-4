import { getRandomPoint } from '../mock/route-point';

const TASK_COUNT = 5;

export default class PointsModel {
  #points = Array.from({ length: TASK_COUNT }, getRandomPoint);

  get points() {
    return this.#points;
  }
}
