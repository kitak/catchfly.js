describe('catchfly', function() {
  describe('error handling', function() {
    var originalImage = Image;
    var mockImage = null;

    beforeEach(function() {
      catchfly.endpoint = 'http://example.com';
      catchfly.enable();

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
      catchfly.disable();
      Image = originalImage;
    });
  });

  describe('sendException', function() {
    var originalImage = Image;
    var mockImage = null;

    beforeEach(function() {
      catchfly.endpoint = 'http://example.com';
      catchfly.enable();

      mockImage = {};
      Image = function() {
        return mockImage;
      };
    });

    it('should send message', function() {
      var message = 'my message';
      catchfly.sendException(new Error(message));
      expect(mockImage.src).toMatch(encodeURIComponent(message));
    });

    afterEach(function() {
      mockImage = null;
      catchfly.disable();
      Image = originalImage;
    });
  });
});
