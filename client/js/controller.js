// Generated by CoffeeScript 1.7.1
(function() {
  var clientId, touchMoveEvent, touchStartEvent, touchStopEvent;

  clientId = Math.random().toString().split('.')[1];

  touchStartEvent = 'touchstart';

  touchMoveEvent = 'touchstart touchmove';

  touchStopEvent = 'touchend';

  touchMoveEvent = 'mousedown';

  touchStartEvent = 'mousedown';

  touchStopEvent = 'mouseup';

  $(function() {
    var $left, emit, socket;
    emit = function(e, eventName, params) {
      if (params == null) {
        params = {};
      }
      params.clientId = clientId;
      socket.emit(eventName, params);
      return e != null ? typeof e.preventDefault === "function" ? e.preventDefault() : void 0 : void 0;
    };
    socket = io.connect(window.location.origin);
    socket.on('connect', function() {
      emit(null, 'connected');
      return console.log('connected');
    });
    socket.on('colorAssigned', function(data) {
      $('.color').css('background-color', data.color);
      return console.log('colorAssigned', data);
    });
    socket.on('scoreUpdated', function(data) {
      $('.color').html(data.score);
      return console.log('scoreUpdated', data);
    });
    $('.right-control').on('touchstart', function(e) {
      console.log('fire!');
      return emit(e, 'fire');
    });
    $left = $('.left-control');
    $left.on(touchStopEvent, function(e) {
      return emit(e, 'stop');
    });
    return $left.on(touchMoveEvent, function(e) {
      var angle, touch, x, y, _ref;
      touch = (_ref = event.touches) != null ? _ref[0] : void 0;
      y = e.offsetY || touch.pageY;
      x = e.offsetX || touch.pageX;
      angle = Math.atan2(0.5 * $left.height() - y, x - 0.5 * $left.width());
      return emit(e, 'move', {
        direction: angle * 180 / Math.PI
      });
    });
  });

}).call(this);

//# sourceMappingURL=controller.map
