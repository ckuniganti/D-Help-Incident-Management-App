function createIncidentFromReqBody(req) {
  const incidentData = req.body.incident;
  const incident = {
    incidentID: incidentData.incidentID,
    requestedBy: incidentData.requestedBy,
    requestedFor: incidentData.requestedFor,
    effectiveDate: incidentData.effectiveDate,
    environmentType: incidentData.environmentType,
    application: incidentData.application,
    description: incidentData.description,
    createdTime: incidentData.createdTime,
    updatedBy: incidentData.updatedBy,
    updatedTime: incidentData.updatedTime,
    status: incidentData.status,
    environment: incidentData.environment,
    notes: incidentData.notes,
  };
  return incident;
}

exports.createIncidentFromReqBody = createIncidentFromReqBody;
