import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputFile, { InputFileProps } from "./InputFile";
import * as utils from "../../shared/utils/get-base64/get-base64";

const MOCK_LABEL = "Select File";

const renderComponent = (props: Partial<InputFileProps>) => {
  return render(<InputFile label={MOCK_LABEL} {...props} />);
};

describe("InputFile Component", () => {
  test("Should render label correctly", () => {
    renderComponent({});

    expect( screen.getByText(MOCK_LABEL) ).toBeInTheDocument();
  });

  test("Should render react error if passed", () => {
    const MOCK_ERROR = "Some error";
    renderComponent({ error: MOCK_ERROR });

    expect( screen.getByText(MOCK_ERROR) ).toBeInTheDocument();
  });

  test("Should accept only images", async () => {
    const spy = jest.spyOn(utils, "getBase64");
    const MOCK_ERROR = "image/png";
    const handleOnChange = jest.fn();
    const props = { accept: MOCK_ERROR, name: "Myfile", id: "Myfile", onChange: handleOnChange };

    const testImageFile = new File(["hello"], "hello.png", { type: "image/png" });

    renderComponent(props);
    

    const fileInput = screen.getByLabelText(MOCK_LABEL);
    await userEvent.upload(fileInput, testImageFile);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
