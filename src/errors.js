'use strict';

module.exports = {

  handler: function* (next) {
    try {
      // catch all downstream errors
      yield next;
    } catch (err) {
      // do something with the error
    }
  }

}
