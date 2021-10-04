import { sortPoint } from "../../src/views/Home.vue";
import { data } from "../../helpers/data";
test("Point  Sort", () => {
  sortPoint(data);
  expect(data).toBeSortedBy("points", {
    descending: true,
  });
});
