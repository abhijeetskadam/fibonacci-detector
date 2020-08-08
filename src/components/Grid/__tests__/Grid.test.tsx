import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Grid from "..";
import { COLORS } from "../grid.helper";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
  cleanup();
});

describe("<Grid />", () => {
  test("renders Grid component", () => {
    const { asFragment } = render(
      <Grid numberOfRows={50} numberOfColumns={50} sequenceLength={5} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("increments row and column of clicked cell", async () => {
    render(<Grid numberOfRows={50} numberOfColumns={50} sequenceLength={5} />);

    expect(screen.getByTestId(/^0_0$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^0_1$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^0_49$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^1_0$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^49_0$/)).toHaveTextContent("");

    userEvent.click(screen.getByTestId(/^0_0$/));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId(/^0_0$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^0_1$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^0_49$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^1_0$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^49_0$/)).toHaveTextContent("1");

    userEvent.click(screen.getByTestId(/^1_1$/));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId(/^0_0$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^0_1$/)).toHaveTextContent("2");
    expect(screen.getByTestId(/^0_49$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^1_0$/)).toHaveTextContent("2");
    expect(screen.getByTestId(/^49_0$/)).toHaveTextContent("1");
  });

  test("changes background color of row and column of clicked cell", async () => {
    render(<Grid numberOfRows={50} numberOfColumns={50} sequenceLength={5} />);

    expect(
      screen.getByTestId(/^0_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^0_1$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^0_49$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^1_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^49_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);

    userEvent.click(screen.getByTestId(/^0_0$/));

    expect(screen.getByTestId(/^0_0$/).style.backgroundColor).toBe(
      COLORS.onIncrement
    );
    expect(screen.getByTestId(/^0_1$/).style.backgroundColor).toBe(
      COLORS.onIncrement
    );
    expect(screen.getByTestId(/^0_49$/).style.backgroundColor).toBe(
      COLORS.onIncrement
    );
    expect(screen.getByTestId(/^1_0$/).style.backgroundColor).toBe(
      COLORS.onIncrement
    );
    expect(screen.getByTestId(/^49_0$/).style.backgroundColor).toBe(
      COLORS.onIncrement
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(
      screen.getByTestId(/^0_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^0_1$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^0_49$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^1_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
    expect(
      screen.getByTestId(/^49_0$/).style.backgroundColor.replace(/\s/g, "")
    ).toBe(COLORS.default);
  });

  test("detects and resets fibonacci sequence", async () => {
    render(<Grid numberOfRows={50} numberOfColumns={50} sequenceLength={5} />);

    userEvent.click(screen.getByTestId(/^0_0$/));
    userEvent.click(screen.getByTestId(/^1_1$/));
    userEvent.click(screen.getByTestId(/^2_2$/));
    userEvent.click(screen.getByTestId(/^2_2$/));
    userEvent.click(screen.getByTestId(/^3_3$/));
    userEvent.click(screen.getByTestId(/^3_3$/));
    userEvent.click(screen.getByTestId(/^3_3$/));
    userEvent.click(screen.getByTestId(/^4_4$/));
    userEvent.click(screen.getByTestId(/^4_4$/));
    userEvent.click(screen.getByTestId(/^4_4$/));
    userEvent.click(screen.getByTestId(/^4_4$/));

    expect(screen.getByTestId(/^0_0$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^1_1$/)).toHaveTextContent("1");
    expect(screen.getByTestId(/^2_2$/)).toHaveTextContent("2");
    expect(screen.getByTestId(/^3_3$/)).toHaveTextContent("3");
    expect(screen.getByTestId(/^4_4$/)).toHaveTextContent("4");

    userEvent.click(screen.getByTestId(/^4_4$/));

    expect(screen.getByTestId(/^0_0$/).style.backgroundColor).toBe(
      COLORS.onReset
    );
    expect(screen.getByTestId(/^1_1$/).style.backgroundColor).toBe(
      COLORS.onReset
    );
    expect(screen.getByTestId(/^2_2$/).style.backgroundColor).toBe(
      COLORS.onReset
    );
    expect(screen.getByTestId(/^3_3$/).style.backgroundColor).toBe(
      COLORS.onReset
    );
    expect(screen.getByTestId(/^4_4$/).style.backgroundColor).toBe(
      COLORS.onReset
    );

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId(/^0_0$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^1_1$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^2_2$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^3_3$/)).toHaveTextContent("");
    expect(screen.getByTestId(/^4_4$/)).toHaveTextContent("");
  });
});
