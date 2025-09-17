exports.handler = (context, event, callback) => {
  const twiml = new Twilio.twiml.VoiceResponse();

  twiml.dial().conference(
    {
      endConferenceOnExit: true,
      statusCallback: `https://charcoal-mongoose-4808.twil.io/call-logging`,
    },
    event.conferenceName,
  );

  return callback(null, twiml);
};
