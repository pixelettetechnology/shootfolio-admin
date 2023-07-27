import React, { useState, useEffect } from "react";
import Menu from "../Components/Menu";
import Sidebar from "../Components/Sidebar";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { BiFootball } from "react-icons/bi";
import "../Assets/Css/Addsubscriptionplan.css";
import Form from "react-bootstrap/Form";
import Settingpop from "../Components/Settingpop";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllGameLeague,
  GetSingleSubscriptionPlan,
  clearErrors,
  clearMessages,
} from "./../storeRedux/actions";
import { Puff } from "react-loader-spinner";
import { useFormik } from "formik";
import { addSubscriptionPlanSchema } from "./../Schemas";

const Editsubscriptionplan = () => {
  const [buttonPopupOne, setButtonPopupOne] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { gameLeague, errors: gameLeagueError } = useSelector(
    (state) => state.gameLeagueReducer
  );
  const {
    singleSubscriptionPlan,
    message,
    errors: error,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.subscriptionReducer);

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        name: singleSubscriptionPlan?.name && singleSubscriptionPlan.name,
        leagues:
          singleSubscriptionPlan?.leagues && singleSubscriptionPlan.leagues[0],
        amount: singleSubscriptionPlan?.amount && singleSubscriptionPlan.amount,
      },
      enableReinitialize: true,
      validationSchema: addSubscriptionPlanSchema,
      onSubmit: (values, action) => {
        values["leagues"] = [values.leagues];
        console.log("values is", values);
        // dispatch(dispatch(AddSubscriptionPlan(values)));
        // action.resetForm();
      },
    });

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (gameLeagueError.length > 0) {
      toast.error(gameLeagueError);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 1000);
    }
    if (message !== "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate(-1), 2000);
    }
  }, [error, gameLeagueError, sessionExpireError, message]);

  useEffect(() => {
    dispatch(GetAllGameLeague());
    dispatch(GetSingleSubscriptionPlan(id));
  }, []);
  return (
    <div>
      <Menu />
      <Container fluid className="sidebar">
        <Row className="h-100">
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={2}
            xl={2}
            style={{ backgroundColor: "#1B1B1B" }}
          >
            <Sidebar></Sidebar>
          </Col>
          <Col
            xs={9}
            sm={9}
            md={9}
            lg={10}
            xl={10}
            style={{ marginTop: "30px" }}
          >
            <Row className="setpaddinginnerpage">
              <Col md={4}>
                <div className="makebreadinrow">
                  <span className="breadgreenfootball">
                    <BiFootball />
                  </span>
                  <p className="sootfoliobreadclub">Edit Subscription Plans</p>
                </div>
              </Col>
              <Col md={5}></Col>
              <Col md={3}></Col>
            </Row>
            <Row className="setpaddinginnerpage mt-5 mb-5">
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formGroupText">
                    <Form.Label className="makelabelleft">Plan Name</Form.Label>
                    <Form.Control
                      className="makeinputborder"
                      type="text"
                      placeholder="Platinum Plan"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error custom-form-error">
                        {errors.name}
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    className="mb-4"
                    classNamem="makelabelandinputinline"
                  >
                    <Form.Label className="makelabelleft">
                      Select League
                    </Form.Label>
                    <Form.Select
                      className="makeinputborder"
                      aria-label="Default select example"
                      name="leagues"
                      value={values.leagues}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {gameLeague.length > 0 &&
                        gameLeague.map((item, ind) => {
                          return (
                            <option value={item.id && item.id} key={ind}>
                              {item.leagueTitle && item.leagueTitle}
                            </option>
                          );
                        })}
                    </Form.Select>
                    {errors.leagues && touched.leagues ? (
                      <p className="form-error custom-form-error">
                        {errors.leagues}
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formGroupText">
                    <Form.Label className="makelabelleft">Price</Form.Label>
                    <Form.Control
                      className="makeinputborder"
                      type="text"
                      placeholder="$300"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.amount && touched.amount ? (
                      <p className="form-error custom-form-error">
                        {errors.amount}
                      </p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <div className="makeplanbuttonend">
                    <Button className="planformsubmitbutton" type="submit">
                      {loading ? (
                        <Puff
                          height="20"
                          width="50"
                          radius="6"
                          color="white"
                          ariaLabel="loading"
                          wrapperStyle
                          wrapperClass
                        />
                      ) : (
                        "Update Publish Plan"
                      )}
                    </Button>
                  </div>
                </Form>
                <Settingpop
                  className="makeplanpopinline"
                  trigger={buttonPopupOne}
                  setTrigger={setButtonPopupOne}
                >
                  <p className="planppoptext">
                    Your Plan for Platinum subscription is created. Do you want
                    to live it on website
                  </p>
                  <Button className="planpopgolive">Go Live</Button>
                </Settingpop>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Editsubscriptionplan;
