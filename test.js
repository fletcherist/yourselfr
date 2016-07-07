function getDataAsync () {
  var data = {
    name: 'SOME DATA',
    apple: 'Script'
  };

  return new Promise (function (reject) {
    setTimeout(function () {
      return reject(data);
    }, 3000);
  });
}

var data = getDataAsync();
console.log(data);
