import { useState } from "react";
import IncDecButtonGroup from "./IncDecButtonGroup";
import styled from "styled-components";
import StyledPillButton from "./StyledPillButton";
import HorizontalGroup from "./HorizontalGroup";
import CartSection from "./CartSection";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
  ToggleButton,
} from "react-bootstrap";
import { BsCashCoin, BsCreditCard2Back, BsPhone } from "react-icons/bs";

const StyledChoiceRadioButton = styled.div`
  width: 100%;
  & input,
  & label {
    width: 100%;
    border: none;
    font-weight: normal;
    font-size: 18px;
  }

  .btn-check:checked + .btn {
    background-color: var(--color-green-600);
    color: var(--color-green-50);
  }
`;

function ChoiceRadioButton({ title, delivery, setDelivery, value }) {
  return (
    <StyledChoiceRadioButton>
      <input
        type="radio"
        className="btn-check"
        name="options-base"
        id={value}
        autoComplete="off"
        value={value}
        checked={delivery === value}
        onChange={() => setDelivery(value)}
      />
      <label className="btn rounded-pill" htmlFor={value}>
        {title}
      </label>
    </StyledChoiceRadioButton>
  );
}

function TwoChoiceRadio({ delivery, setDelivery }) {
  return (
    <>
      <ChoiceRadioButton
        title="Delivery"
        delivery={delivery}
        setDelivery={setDelivery}
        value="delivery"
      />
      <ChoiceRadioButton
        title="Self Pickup"
        delivery={delivery}
        setDelivery={setDelivery}
        value="selfpickup"
      />
    </>
  );
}

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  .btn-check:checked + .btn {
    background-color: var(--color-green-600);
    color: var(--color-green-50);
  }
  :not(.btn-check:checked).btn-check:hover + .btn {
    color: var(--color-stone-950);
    background-color: var(--color-stone-100);
  }
`;

function ToggleRadioButton({ value, radioValue, setRadioValue, icon, title }) {
  return (
    <ToggleButton
      key={"1"}
      id={`radio-${value}`}
      type="radio"
      className="grey-btn"
      variant="grey-btn"
      name="radio"
      value={value}
      checked={radioValue === value}
      onChange={(e) => setRadioValue(e.currentTarget.value)}
    >
      <Stack>
        <div>{icon}</div>
        <div>{title}</div>
      </Stack>
    </ToggleButton>
  );
}

function OrderForm() {
  const [delivery, setDelivery] = useState("delivery");
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { title: "Cash", value: "cash", icon: <BsCashCoin /> },
    { title: "Terminal", value: "terminal", icon: <BsCreditCard2Back /> },
    { title: "Online", value: "online", icon: <BsPhone /> },
  ];

  return (
    <div>
      <h4 className="text-center">Delivery and payment</h4>
      <form className="text-start my-3">
        <div
          className="mb-3 d-flex justify-content-center rounded-pill bg-light-subtle"
          style={{ minWidth: "100%" }}
        >
          <TwoChoiceRadio delivery={delivery} setDelivery={setDelivery} />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name*"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text fs-6">
            {"We'll never share your data with anyone else."}
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            defaultValue="+38"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          {delivery === "delivery" ? (
            <>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address*"
                  aria-label="Recipient's username"
                />
                <button className="btn btn-outline-success" type="button">
                  Use Location
                </button>
              </div>
            </>
          ) : (
            <select className="form-select" aria-label="Default select example">
              <option value="Address1">Address1</option>
              <option value="Address2">Address2</option>
              <option value="Address3">Address3</option>
            </select>
          )}
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Order comment"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
        </div>
        <div className="d-flex align-items-center">
          {/* <CiForkAndKnife /> */}
          <h4 className="mx-3 my-0">Cultery</h4>
          <IncDecButtonGroup />
        </div>
        <div className="d-flex flex-column my-3 p-3 text-center bg-white">
          <h4 className="">Choose payment kind</h4>
          <RadioContainer>
            {radios.map((button) => (
              <ToggleRadioButton
                key={button.value}
                value={button.value}
                radioValue={radioValue}
                setRadioValue={setRadioValue}
                icon={button.icon}
                title={button.title}
              />
            ))}
          </RadioContainer>
        </div>
        <Stack direction="vertical" gap={1}>
          <div className="d-flex justify-content-between ">
            <div className="d-flex flex-column align-items-start">
              <h4>Delivery: </h4>
              <h6>free from 299$</h6>
            </div>
            <div className="d-flex align-items-end">23$</div>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount: </span>
            <span>0</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total bill</span>
            <span>0</span>
          </div>
          <StyledPillButton className="green-btn" type="submit" width="100%">
            Make an order
          </StyledPillButton>
        </Stack>
      </form>
    </div>
  );
}
export default OrderForm;
