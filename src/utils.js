'use strict';

module.exports = {

  errorHandler: function* (next) {
    try {
      // catch all downstream errors
      yield next;
    } catch (err) {
      // do something with the error
    }
  }

}
