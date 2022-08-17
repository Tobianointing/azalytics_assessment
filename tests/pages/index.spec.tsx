import React from "react";
import { render } from "@testing-library/react";
import Home from "../../pages/index";
import { Assets } from "../../lib/interfaces/Assets";
import useAssets from "../../hooks/useAssets";

const mockedUseAssets = useAssets as jest.Mock<any>;

jest.mock("../../hooks/useAssets");

describe("<Home />", () => {
  beforeEach(() => {
    mockedUseAssets.mockImplementation(() => ({ isLoading: true }));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders without crashing", () => {
    render(<Home />);
  });

  it("Displays loading indicator", () => {
    const { queryByTestId } = render(<Home />);

    expect(queryByTestId("loader")).toBeTruthy();
  });

  it("Displays error message", () => {
    mockedUseAssets.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      error: { message: "We cannot process your request right now" },
    }));
    const { getByText, queryByTestId } = render(<Home />);

    expect(queryByTestId("loader")).toBeFalsy();
    getByText("We cannot process your request right now");
  });

  it("Displays data", () => {
    const mockedProductData: Assets[] = [
      {
        assetId: "31566704",
        URL: "https://www.centre.io/usdc",
        logo: "https://algorand-wallet-mainnet.s3.amazonaws.com/media/usd-coin-usdc-logo.svg",
        available: false,
        name: "USDC",
      },
      {
        assetId: "230946361",
        URL: "https://www.algogems.io/",
        logo: "https://algorand-wallet-mainnet.s3.amazonaws.com/media/usd-coin-usdc-logo.svg",
        available: true,
        name: "AlgoGems",
      },
    ];

    mockedUseAssets.mockImplementation(() => ({
      isLoading: false,
      data: mockedProductData,
    }));

    const { getByText, queryByTestId } = render(<Home />);

    //Making sure the loader is not displayed
    expect(queryByTestId("loader")).toBeFalsy();

    // Making sure the assets' name are displayed
    getByText(mockedProductData[0].name);
    getByText(mockedProductData[1].name);
  });
});
