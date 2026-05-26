import "@testing-library/jest-dom";
import { _resetContainer } from "../src/lib/container";
import { afterEach } from "vitest";

afterEach(() => {
  _resetContainer();
});
