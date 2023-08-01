const fs = require("node:fs/promises");

function fileCBFunction(err, data) {
  if (err) {
    console.log("Error exists while reading the data from the file", err);
  } else {
    console.log("successfully retrieved that data from the file", data);
  }
}
async function getAllUsersData() {
  const allUsersData = await fs.readFile(
    "userDetails.json",
    "utf8",
    fileCBFunction
  );
  return JSON.parse(allUsersData);
}

async function getUserData(userName) {
  const allUsersData = await getAllUsersData();
  let userData = null;
  if (
    allUsersData !== null &&
    allUsersData.users !== null &&
    allUsersData.users.length > 0
  ) {
    userData = allUsersData.users.filter(
      (userData) => userData.userName === userName
    );
  }
  return userData[0];
}

async function getUserIncident(userName, incidentID) {
  const userData = await getUserData(userName);
  const incidents = userData.incidents;
  let incidentResult = null;
  if (userData !== null && incidents !== null && incidents.length > 0) {
    incidentResult = incidents.find(
      (incident) => incident.incidentID === incidentID
    );
  }
  return incidentResult;
}

function getMatchingIncident(incID) {
  return incidents[incID].incidentID === incidentID;
}

async function updateIncident(userName, data) {
  const allUsersData = await getAllUsersData();

  const userData = await getUserData(userName);
  const incidents = userData.incidents;
  if (userData !== null && incidents !== null && incidents.length > 0) {
    const incidentIndex = incidents.findIndex(
      (inc) => inc.incidentID === data.incidentID
    );
    if (incidentIndex < 0) {
      throw new NotFoundError("Could not find incident for id " + id);
    }
    userData.incidents[incidentIndex] = { ...data };
    allUsersData.users.findIndex((user) => user.userName === userName);
    const userIndex = incidents.findIndex(
      (inc) => inc.incidentID === data.incidentID
    );
    if (userIndex < 0) {
      throw new NotFoundError("Could not find user for userName " + userName);
    }
    allUsersData.users[userIndex] = userData;
    await fs.writeFile("userDetails.json", JSON.stringify(allUsersData));
  }
  return userData;
}

async function addIncident(userName, data) {
  const allUsersData = await getAllUsersData();
  const userData = await getUserData(userName);
  const incidents = userData.incidents;
  if (userData !== null && incidents !== null) {
    userData.incidents.push(data);
    const userIndex = allUsersData.users.findIndex(
      (user) => user.userName === userName
    );
    allUsersData.users[userIndex] = userData;
    await fs.writeFile("userDetails.json", JSON.stringify(allUsersData));
  }
  //console.log("*****************", allUsersData);
  return userData;
}

exports.getAllUsersData = getAllUsersData;
exports.getUserData = getUserData;
exports.getUserIncident = getUserIncident;
exports.updateIncident = updateIncident;
exports.addIncident = addIncident;
