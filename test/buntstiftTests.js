'use strict';

var assert = require('assertthat'),
    chalk = require('chalk'),
    isAnsi = require('isansi'),
    record = require('record-stdstreams');

var buntstift = require('../lib/buntstift'),
    unicode = require('../lib/unicode');

suite('buntstift', function () {
  test('is an object.', function (done) {
    assert.that(buntstift, is.ofType('object'));
    done();
  });

  suite('blankLine', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.blankLine, is.ofType('function'));
      done();
    });

    test('writes a blank line to stdout.', function (done) {
      record(function (stop) {
        buntstift.blankLine();
        stop();
      }, function (stdoutText) {
        assert.that(stdoutText, is.equalTo('\n'));
        done();
      });
    });

    test('does nothing when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stop) {
        buntstift.blankLine();
        stop();
      }, function (stdoutText) {
        assert.that(stdoutText, is.equalTo(''));
        process.argv.pop();
        done();
      });
    });
  });

  suite('success', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.success, is.ofType('function'));
      done();
    });

    test('writes a message in green and bold to stdout.', function (done) {
      record(function (stop) {
        buntstift.success('foo');
        stop();
      }, function (stdoutText) {
        assert.that(isAnsi.green(stdoutText), is.true());
        assert.that(isAnsi.bold(stdoutText), is.true());
        done();
      });
    });

    test('writes a message with a check mark.', function (done) {
      record(function (stop) {
        buntstift.success('foo');
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo(unicode.checkMark + ' foo\n'));
        done();
      });
    });

    test('writes a stringified message if necessary.', function (done) {
      record(function (stop) {
        buntstift.success(23);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo(unicode.checkMark + ' 23\n'));
        done();
      });
    });

    test('supports template strings.', function (done) {
      record(function (stop) {
        buntstift.success('foo {{bar}}', { bar: 'baz' });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo(unicode.checkMark + ' foo baz\n'));
        done();
      });
    });

    test('replaces the check mark if a prefix is explicitly given.', function (done) {
      record(function (stop) {
        buntstift.success('foo', { prefix: '-' });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('- foo\n'));
        done();
      });
    });

    test('does nothing when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stop) {
        buntstift.success('foo');
        stop();
      }, function (stdoutText) {
        assert.that(stdoutText, is.equalTo(''));
        process.argv.pop();
        done();
      });
    });
  });

  suite('fail', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.fail, is.ofType('function'));
      done();
    });

    test('writes a message in red and bold to stderr.', function (done) {
      record(function (stop) {
        buntstift.fail('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(isAnsi.red(stderrText), is.true());
        assert.that(isAnsi.bold(stderrText), is.true());
        done();
      });
    });

    test('writes a message with a cross.', function (done) {
      record(function (stop) {
        buntstift.fail('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.crossMark + ' foo\n'));
        done();
      });
    });

    test('writes a stringified message if necessary.', function (done) {
      record(function (stop) {
        buntstift.fail(23);
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.crossMark + ' 23\n'));
        done();
      });
    });

    test('supports template strings.', function (done) {
      record(function (stop) {
        buntstift.fail('foo {{bar}}', { bar: 'baz' });
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.crossMark + ' foo baz\n'));
        done();
      });
    });

    test('replaces the check mark if a prefix is explicitly given.', function (done) {
      record(function (stop) {
        buntstift.fail('foo', { prefix: '-' });
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo('- foo\n'));
        done();
      });
    });

    test('still works when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stop) {
        buntstift.fail('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.crossMark + ' foo\n'));
        process.argv.pop();
        done();
      });
    });
  });

  suite('warn', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.warn, is.ofType('function'));
      done();
    });

    test('writes a message in yellow and bold to stderr.', function (done) {
      record(function (stop) {
        buntstift.warn('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(isAnsi.yellow(stderrText), is.true());
        assert.that(isAnsi.bold(stderrText), is.true());
        done();
      });
    });

    test('writes a message with an exclamation mark.', function (done) {
      record(function (stop) {
        buntstift.warn('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.rightPointingPointer + ' foo\n'));
        done();
      });
    });

    test('writes a stringified message if necessary.', function (done) {
      record(function (stop) {
        buntstift.warn(23);
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.rightPointingPointer + ' 23\n'));
        done();
      });
    });

    test('supports template strings.', function (done) {
      record(function (stop) {
        buntstift.warn('foo {{bar}}', { bar: 'baz' });
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.rightPointingPointer + ' foo baz\n'));
        done();
      });
    });

    test('replaces the check mark if a prefix is explicitly given.', function (done) {
      record(function (stop) {
        buntstift.warn('foo', { prefix: '-' });
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo('- foo\n'));
        done();
      });
    });

    test('still works when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stop) {
        buntstift.warn('foo');
        stop();
      }, function (stdoutText, stderrText) {
        assert.that(chalk.stripColor(stderrText), is.equalTo(unicode.rightPointingPointer + ' foo\n'));
        process.argv.pop();
        done();
      });
    });
  });

  suite('info', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.info, is.ofType('function'));
      done();
    });

    test('writes a message in white to stdout.', function (done) {
      record(function (stop) {
        buntstift.info('foo');
        stop();
      }, function (stdoutText) {
        assert.that(isAnsi.white(stdoutText), is.true());
        done();
      });
    });

    test('writes a message with indentation.', function (done) {
      record(function (stop) {
        buntstift.info('foo');
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo\n'));
        done();
      });
    });

    test('writes a stringified message if necessary.', function (done) {
      record(function (stop) {
        buntstift.info(23);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  23\n'));
        done();
      });
    });

    test('supports template strings.', function (done) {
      record(function (stop) {
        buntstift.info('foo {{bar}}', { bar: 'baz' });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo baz\n'));
        done();
      });
    });

    test('replaces the check mark if a prefix is explicitly given.', function (done) {
      record(function (stop) {
        buntstift.info('foo', { prefix: '-' });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('- foo\n'));
        done();
      });
    });

    test('does nothing when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stop) {
        buntstift.info('foo');
        stop();
      }, function (stdoutText) {
        assert.that(stdoutText, is.equalTo(''));
        process.argv.pop();
        done();
      });
    });
  });

  suite('verbose', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.verbose, is.ofType('function'));
      done();
    });

    suite('with --verbose set.', function () {
      setup(function () {
        process.argv.push('--verbose');
      });

      teardown(function () {
        process.argv.pop();
      });

      test('writes a message in gray to stdout.', function (done) {
        record(function (stop) {
          buntstift.verbose('foo');
          stop();
        }, function (stdoutText) {
          assert.that(isAnsi.gray(stdoutText), is.true());
          done();
        });
      });

      test('writes a message with indentation.', function (done) {
        record(function (stop) {
          buntstift.verbose('foo');
          stop();
        }, function (stdoutText) {
          assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo\n'));
          done();
        });
      });

      test('writes a stringified message if necessary.', function (done) {
        record(function (stop) {
          buntstift.verbose(23);
          stop();
        }, function (stdoutText) {
          assert.that(chalk.stripColor(stdoutText), is.equalTo('  23\n'));
          done();
        });
      });

      test('supports template strings.', function (done) {
        record(function (stop) {
          buntstift.verbose('foo {{bar}}', { bar: 'baz' });
          stop();
        }, function (stdoutText) {
          assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo baz\n'));
          done();
        });
      });

      test('replaces the check mark if a prefix is explicitly given.', function (done) {
        record(function (stop) {
          buntstift.verbose('foo', { prefix: '-' });
          stop();
        }, function (stdoutText) {
          assert.that(chalk.stripColor(stdoutText), is.equalTo('- foo\n'));
          done();
        });
      });

      test('does nothing when --quiet is set.', function (done) {
        process.argv.push('--quiet');
        record(function (stop) {
          buntstift.verbose('foo');
          stop();
        }, function (stdoutText) {
          assert.that(stdoutText, is.equalTo(''));
          process.argv.pop();
          done();
        });
      });
    });

    suite('without --verbose set.', function () {
      test('does not write a message to stdout.', function (done) {
        record(function (stop) {
          buntstift.verbose('foo');
          stop();
        }, function (stdoutText) {
          assert.that(stdoutText, is.equalTo(''));
          done();
        });
      });
    });
  });

  suite('list', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.list, is.ofType('function'));
      done();
    });

    test('writes a message with a leading dash.', function (done) {
      record(function (stop) {
        buntstift.list('foo');
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo(unicode.multiplicationDot + ' foo\n'));
        done();
      });
    });

    test('writes an indented message.', function (done) {
      record(function (stop) {
        buntstift.list('foo', { indent: 1 });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  ' + unicode.multiplicationDot + ' foo\n'));
        done();
      });
    });

    test('writes an indented message.', function (done) {
      record(function (stop) {
        buntstift.list('foo', { indent: 2 });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('    ' + unicode.multiplicationDot + ' foo\n'));
        done();
      });
    });

    test('correctly indents even for multiple prefix characters.', function (done) {
      record(function (stop) {
        buntstift.list('foo', { prefix: '--', indent: 1 });
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('   -- foo\n'));
        done();
      });
    });
  });

  suite('table', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.table, is.ofType('function'));
      done();
    });

    test('throws an error if now rows are given.', function (done) {
      assert.that(function () {
        buntstift.table();
      }, is.throwing('Rows are missing.'));
      done();
    });

    test('writes a single row.', function (done) {
      record(function (stop) {
        buntstift.table([
          [ 'foo', 'bar', 'baz' ]
        ]);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo  bar  baz\n'));
        done();
      });
    });

    test('writes multiple rows.', function (done) {
      record(function (stop) {
        buntstift.table([
          [ 'foo', 'bar', 'baz' ],
          [ 'bar', 'baz', 'foo' ]
        ]);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  foo  bar  baz\n  bar  baz  foo\n'));
        done();
      });
    });

    test('pads cells.', function (done) {
      record(function (stop) {
        buntstift.table([
          [ 'fooA', 'bar', 'baz' ],
          [ 'bar', 'baz', 'fooB' ]
        ]);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo('  fooA  bar  baz \n  bar   baz  fooB\n'));
        done();
      });
    });

    test('inserts a separator line.', function (done) {
      record(function (stop) {
        buntstift.table([
          [ 'A', 'B', 'C' ],
          [],
          [ 'fooA', 'bar', 'baz' ],
          [ 'bar', 'baz', 'fooB' ]
        ]);
        stop();
      }, function (stdoutText) {
        assert.that(chalk.stripColor(stdoutText), is.equalTo([
          '  A     B    C   \n',
          '  \u2500\u2500\u2500\u2500  \u2500\u2500\u2500  \u2500\u2500\u2500\u2500\n',
          '  fooA  bar  baz \n',
          '  bar   baz  fooB\n'
        ].join('')));
        done();
      });
    });
  });

  suite('waitFor', function () {
    test('is a function.', function (done) {
      assert.that(buntstift.waitFor, is.ofType('function'));
      done();
    });

    test('throws an error if worker is missing.', function (done) {
      assert.that(function () {
        buntstift.waitFor();
      }, is.throwing('Worker is missing.'));
      done();
    });

    test('shows a waiting indicator on stderr.', function (done) {
      record(function (stopRecording) {
        buntstift.waitFor(function (stopWaiting) {
          setTimeout(function () {
            stopWaiting();
            stopRecording();
          }, 0.2 * 1000);
        });
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo(''));
        assert.that(stderrText, is.not.equalTo(''));
        done();
      });
    });

    test('shows nothing when --quiet is set.', function (done) {
      process.argv.push('--quiet');
      record(function (stopRecording) {
        buntstift.waitFor(function (stopWaiting) {
          setTimeout(function () {
            stopWaiting();
            stopRecording();
          }, 0.2 * 1000);
        });
      }, function (stdoutText, stderrText) {
        assert.that(stdoutText, is.equalTo(''));
        assert.that(stderrText, is.equalTo(''));
        process.argv.pop();
        done();
      });
    });
  });
});