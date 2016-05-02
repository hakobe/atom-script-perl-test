# script-perl-test package

Runs Perl tests for the currently active file using [atom-script](https://github.com/rgbkrk/atom-script) as a backend.

## Commands

- `script-perl-test:run-test`
  - Runs `carton exec -- prove -v {FILE_ACTIVE}`
- `script-perl-test:run-test-method`
  - Runs `TEST_METHOD=<TEST METHOD NAME> carton exec -- prove -v {FILE_ACTIVE}`. `TEST METHOD NAME ` is automatically chosen from the cursor position. Go best with [Test::Class](https://metacpan.org/pod/Test::Class).
