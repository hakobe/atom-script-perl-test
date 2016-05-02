'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,
  runtime: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'script-perl-test:run-test': () => this.runTest(),
      'script-perl-test:run-test-method': () => this.runTestMethod()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  consumeDefaultRuntime(runtime) {
    this.runtime = runtime;
  },

  activatePackage(packageName) {
    if (atom.packages.activatePackages[packageName]) {
      return;
    }
    pkg = atom.packages.loadPackage(packageName);
    pkg.activateNow();
  },

  _run(testMethod) {
    this.activatePackage('script');
    this.runtime.scriptOptions.workingDirectory = null;
    this.runtime.scriptOptions.cmd = 'carton';
    this.runtime.scriptOptions.cmdArgs = ['exec', '--', 'prove', '-v'];
    this.runtime.scriptOptions.env = null;
    this.runtime.scriptOptions.scriptArgs = [];
    if (testMethod) {
      this.runtime.scriptOptions.env = `TEST_METHOD=${testMethod}`;
    }
    this.runtime.execute();
  },

  runTest() {
    this._run(null);
  },

  runTestMethod() {
    const activeEditor = atom.workspace.getActiveTextEditor();
    var testMethod = null;
    activeEditor.backwardsScanInBufferRange(
      /sub\s+(\S+)\s*:\s*Test/,
      [ [0, 0], activeEditor.getCursorBufferPosition() ],
      (it) => {
        it.stop();
        testMethod = it.match[1];
      }
    );
    if (testMethod) {
      this._run(testMethod)
    }
  }

};
