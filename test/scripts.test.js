var test = require('tape');
var exec = require('child_process').exec;

test('details', function (t) {
  var details = exec('./bin/details com.viber.voip', function (error, stdout, stderr) {
    t.notOk(error, 'should exit cleanly');
    t.ok(stdout.length > 0, 'should produce some output');
    t.doesNotThrow(JSON.parse.bind(null, stdout), 'parses json');
    t.end();
  });
});

test('bulkDetails', function (t) {
  var details = exec('./bin/bulkDetails com.viber.voip air.WatchESPN', function (error, stdout, stderr) {
    t.notOk(error, 'should exit cleanly');
    t.ok(stdout.length > 0, 'should produce some output');
    t.doesNotThrow(JSON.parse.bind(null, stdout), 'parses json');
    t.end();
  });
});

test('download', function (t) {
  var details = exec('./bin/download com.insitusec.isthisreallife > /dev/null', function (error, stdout, stderr) {
    t.notOk(error, 'should exit cleanly');
    t.notOk(stderr, 'should not produce stderr');
    t.end();
  });
});

