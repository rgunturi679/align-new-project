exports.handler = (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.dial().conference(
    {
      statusCallback: `https://charcoal-mongoose-4808.twil.io/call-logging`,
      statusCallbackEvent: 'join end',
      endConferenceOnExit: true,
    },
    event.taskSid,
  );

  return callback(null, twiml);
};
