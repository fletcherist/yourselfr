export function ending (iNumber, aEndings) {
  var sEnding, i;
  iNumber = iNumber % 100
  if (iNumber >= 11 && iNumber <= 19) {
    sEnding = aEndings[2]
  } else {
    i = iNumber % 10;
    switch (i) {
      case (1): sEnding = aEndings[0]; break
      case (2):
      case (3):
      case (4): sEnding = aEndings[1]; break
      default: sEnding = aEndings[2]
    }
  }
  return sEnding
}

export function isValidPhoto (photo) {
  return photo && photo === 'http://yourselfr.com/upload/avatar/null'
  ? 'http://i.forbesimg.com/media/lists/companies/facebook_416x416.jpg'
  : photo;
}

export function isNotEmptyString (str) {
  if (!str) return false;
  if (/\S/.test(str)) {
    // string is not empty and not just whitespace
    return true;
  } else {
    return false;
  }
}

export function isEmpty (obj) {
  var hasOwnProperty = Object.prototype.hasOwnProperty;
		// null and undefined are "empty"
  if (obj == null) return true;
		// Assume if it has a length property with a non-zero value
		// that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}
