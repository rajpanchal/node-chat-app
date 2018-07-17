var expect = require("expect");

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect('message').toInclude({from, text});
  });
});

describe('generateLoactionMessage', () => {
  it('should generate current location', () => {
      var from = 'Me';
      var latitude = 1;
      var longitude = 12;
      var url = "https://www.google.com/maps?q=1,12";
      var message = generateLoactionMessage(from, latitude, longitude);

      expect(message.createdAt).toBeA('number');
      expect('message').toInclude({from, url});
  });
});
