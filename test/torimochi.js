describe('torimochi', function() {
  describe('error handling', function() {
    var originalImage = Image;
    var mockImage = null;

    beforeEach(function() {
      torimochi.endpoint = 'http://example.com';
      torimochi.start();

      mockImage = {};
      Image = function() {
        return mockImage;
      };
    });

    it('should send message when error occurred', function(done) {
      var message = 'my message';
      setTimeout(function() {
        throw new Error('my message');
      }, 0);
      setTimeout(function() {
        expect(mockImage.src).toMatch(encodeURIComponent(message));
        done();
      }, 0);
    });

    afterEach(function() {
      mockImage = null;
      torimochi.stop();
      Image = originalImage;
    });
  });
});
