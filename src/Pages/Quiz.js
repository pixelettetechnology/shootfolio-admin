import React, { useEffect, useState } from "react";
import Menu from "../Components/Menu";
import Sidebar from "../Components/Sidebar";
import { BiFootball } from "react-icons/bi";
import "../Assets/Css/Addquestion.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllQuiz, clearErrors } from "./../storeRedux/actions";
import { Puff } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiPaginationItem-root": {
      color: "white",
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      },
      "& .Mui-selected": {
        backgroundColor: "black",
        color: "white",
      },
    },
  },
});

const Quiz = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    quiz,
    totalPages,
    errors: error,
    sessionExpireError,
    loading,
  } = useSelector((state) => state.quizReducer);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (sessionExpireError !== "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 1000);
    }
  }, [error, sessionExpireError]);
  useEffect(() => {
    dispatch(GetAllQuiz(page));
  }, [page]);
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
            style={{ marginTop: "30px", marginBottom:"30px" }}
          >
            <Row className="setpaddinginnerpage">
              <Col md={4}>
                <div className="makebreadinrow">
                  <span className="breadgreenfootball">
                    <BiFootball />
                  </span>
                  <p className="sootfoliobreadclub">Quiz</p>
                </div>
              </Col>
              <Col md={5}></Col>
              <Col md={3} className="makebuttonalignend">
                <Link to="/addquestion">
                  <Button className="addnewshhotfolioclubbutton">
                    {" "}
                    + Add Question
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              {loading ? (
                <Puff
                  height="60"
                  width="60"
                  radius="6"
                  color="white"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              ) : quiz.length > 0 ? (
                quiz.map((data, ind) => {
                  return (
                    <Col md={6} key={ind}>
                      <div className="radio-input">
                        <div className="info">
                          <span className="question">
                            {data?.question && data.question}?
                          </span>
                        </div>
                        <input
                          type="radio"
                          id="value-1"
                          name="value-radio"
                          value="value-1"
                        />
                        <label for="value-1">
                          {data?.options[0] && data.options[0]}
                        </label>
                        <input
                          type="radio"
                          id="value-2"
                          name="value-radio"
                          value="value-2"
                        />
                        <label for="value-2">
                          {data?.options[1] && data.options[1]}
                        </label>
                        <input
                          type="radio"
                          id="value-3"
                          name="value-radio"
                          value="value-3"
                        />
                        <label for="value-3">
                          {data?.options[2] && data.options[2]}
                        </label>
                        <input
                          type="radio"
                          id="value-4"
                          name="value-radio"
                          value="value-4"
                        />
                        <label for="value-4">
                          {data?.options[3] && data.options[3]}
                        </label>
                        <span class="result success">Congratulations!</span>
                        <span class="result error">Wrong answer</span>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <h1>No record found</h1>
              )}
            </Row>
            {loading
          ? ""
          : quiz.length > 0 && (
              <Pagination
                classes={{ root: classes.root }}
                variant="outlined"
                count={totalPages}
                page={page}
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
                showFirstButton
                showLastButton
                onChange={(e, value) => setPage(value)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Quiz;
