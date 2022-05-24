const authFunctions = require('../../services/docusign/authentication')
const envelopFunctions = require('../../services/docusign/envelop')
const CONSTANTS = require('../../services/docusign/config')

/*docusign account constant variable*/
const docusignDetails = {
  // ccEmail: CONSTANTS.DOCUSIGN_CC_EMAIL,
  // ccName: CONSTANTS.DOCUSIGN_CC_NAME,

  clientId: CONSTANTS.DOCUSIGN_CLIENT_ID,
  userId: CONSTANTS.DOCUSIGN_USER_ID,
  instanceUri: CONSTANTS.DOCUSIGN_INSTANCE_URI,
  scope: CONSTANTS.DOCUSIGN_SCOPE,

  basePath: CONSTANTS.DOCUSIGN_BASE_PATH,
  accountId: CONSTANTS.DOCUSIGN_ACCOUNT_ID,
  envelopStatus: 'sent'
}

/*send document*/
const sendDocument = async (req, res, next) => {
  docusignDetails.templateCategory = await req.body.templateCategory;
  docusignDetails.signerDetails = await req.body.signerDetails;

  try {
    const accessToken = await authFunctions.requestJWTUserToken(docusignDetails);
    const results = await envelopFunctions.sendEnvelope(docusignDetails, accessToken)
    const responseBody = {
      status: 200,
      message: 'success',
      results: results
    }
    res.send(responseBody)

  } catch (error) {
    const errorBody = {
      status: 500,
      message: 'fail',
      results: error
    }
    res.status(500).send(errorBody)
  }
}

/*get document status using api passing envelop id*/
const getDocument = async (req, res, next) => {
  docusignDetails.signerEmail = await req.params.email
  docusignDetails.envelopeId = '4a6f629a-95bf-48ba-87d1-52e9fd7cf5bf'
  try {
    const accessToken = await authFunctions.requestJWTUserToken(docusignDetails);
    const results = await envelopFunctions.getEnvelope(docusignDetails, accessToken)
    const responseBody = {
      status: 200,
      message: 'success',
      results: results
    }
    res.send(responseBody)
  }
  catch (error) {
    const errorBody = {
      status: 500,
      message: 'fail',
      results: error
    }
    res.status(500).send(errorBody)
  }
}

/*fetch document details after complete via webhook*/
const getDocumentStatus = async (req, res, next) => {
  try {
    const data = await req.body
    console.log(data);
    res.status(200).end()
  }
  catch (error) {
    const errorBody = {
      status: 500,
      message: 'fail',
      results: error
    }
    res.status(500).send(errorBody)
  }
}

/*fetch recipient details after webhook*/
const getRecipientStatus = async (req, res, next) => {
  docusignDetails.signerEmail = await req.params.email
  docusignDetails.envelopeId = 'b934074b-e3eb-4d1c-87bd-54210237dcee'
  try {
    const accessToken = await authFunctions.requestJWTUserToken(docusignDetails);
    const results = await envelopFunctions.getRecipientData(docusignDetails, accessToken)
    const responseBody = {
      status: 200,
      message: 'success',
      results: results
    }
    res.send(responseBody)
  }
  catch (error) {
    const errorBody = {
      status: 500,
      message: 'fail',
      results: error
    }
    res.status(500).send(errorBody)
  }
}

const downloadDocument = async (req, res, next) => {

  docusignDetails.envelopeId = '38496f5f-4ddd-4d67-bd21-3856910e4902'
  try {
    const accessToken = await authFunctions.requestJWTUserToken(docusignDetails);
    const results = await envelopFunctions.downloadEnvelop(docusignDetails, accessToken)
    const responseBody = {
      status: 200,
      message: 'success',
      results: results
    }
    res.send(responseBody)
  }
  catch (error) {
    const errorBody = {
      status: 500,
      message: 'fail',
      results: error
    }
    res.status(500).send(errorBody)
  }
}

module.exports = { sendDocument, getDocument, getDocumentStatus, downloadDocument, getRecipientStatus }