const express = require("express");

const {
  getIncidentNumber,
  getAllUsersData,
  getUserData,
  getUserIncident,
  updateIncident,
  addIncident,
} = require("../data/user");

const { createIncidentFromReqBody } = require("../util/IncidentHelper");

const router = express.Router();

router.get("/getIncidentNumber", async (req, res, next) => {
  try {
    const incidentNumber = await getIncidentNumber();
    res.json({ incidentNumber: incidentNumber });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allUsersData = await getAllUsersData();
    // console.log("specific use data", allUsersData);
    res.json({ users: allUsersData });
  } catch (error) {
    next(error);
  }
});

router.post("/user", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const userData = await getUserData(userName);
    // console.log("specific use data", userData);
    res.json({ user: userData });
  } catch (error) {
    next(error);
  }
});

router.post("/user/incident", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const incidentID = req.body.incidentID;
    const incident = await getUserIncident(userName, incidentID);
    //console.log("^^^^^^^^^^^", incident);
    res.json({ incident: incident });
  } catch (error) {
    next(error);
  }
});

router.post("/user/incident/update", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    console.log(req.body);
    const incident = createIncidentFromReqBody(req);
    const userData = await updateIncident(userName, incident);
    res.json({ userData: userData });
  } catch (error) {
    next(error);
  }
});

router.post("/user/incident/add", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    console.log("BeforeMapping", req.body.incident);
    const incident = createIncidentFromReqBody(req);
    console.log("AfterMapping", incident);
    const userData = await addIncident(userName, incident);
    res.json({ userData: userData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
