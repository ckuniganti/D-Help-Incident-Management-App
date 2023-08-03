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
    const incidentReq = createIncidentFromReqBody(req);
    const incident = await updateIncident(userName, incidentReq);
    res.json({
      message: incident.incidentID + " Successfully updated",
      Incident: incident,
    });
  } catch (error) {
    console.log("********************", error);
    next(error);
    return res.status(422).json({
      error: "Error occured while updating Incident",
      message: "Error occured while updating Incident!",
    });
  }
});

router.post("/user/incident/add", async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const incidentReq = createIncidentFromReqBody(req);
    const incident = await addIncident(userName, incidentReq);
    res.json({
      message:
        "New Incident Successfully Created, Incident Number :" +
        incident.incidentID,
      Incident: incident,
    });
  } catch (error) {
    next(error);
    return res.status(422).json({
      error: "Error occured while inserting new Incident",
      message: "Error occured while inserting new Incident!",
    });
  }
});

module.exports = router;
