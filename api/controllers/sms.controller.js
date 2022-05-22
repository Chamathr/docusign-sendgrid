const CONSTANTS = require('../../env/sendgrid/apiKey')
const twilioAccountSid = CONSTANTS.TWILIO_ACCOUNT_SID;
const twilioAuthToken = CONSTANTS.TWILIO_AUTH_TOKEN;
const twilioNumber = CONSTANTS.TWILIO_PHONE_NUMBER;
const twilioServiceId = CONSTANTS.TWILIO_MESSAGE_SERVICE_ID;
const smsClient = require('twilio')(twilioAccountSid, twilioAuthToken);

const responses = require('../../constants/responses')

// const numbersList = ['+94726660070','+94702654310']
// const numbersList = ['+94726660070']
const numbersList = ['+94702654310']

/*send sms via sendgrid-twilio*/
const sendSms = async (req, res, next) => {
    try {
        numbersList.map(async number => {
            await smsClient.messages
                .create({
                    body: 'This is a test message...',
                    from: twilioNumber,
                    to: number
                })
        })

        const results = ''
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

module.exports = { sendSms }