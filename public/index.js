const workspace = Blockly.inject(
    'blocklyDiv',
    {
        toolbox: document.getElementById('toolbox'),
        maxBlocks: 24,
        grid: {
            spacing: 18,
            length: 3,
            colour: '#ccc',
            snap: true,
        },
        trashcan: true,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
        },
    },
);
function showCode() {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    const pre = document.getElementById('jsCode');
    var html = Blockly.JavaScript.workspaceToCode(workspace);
    console.log('HTML:' + html)
    debugger
    pre.innerHTML = Blockly.JavaScript.workspaceToCode(workspace);
}
function runCode() {
    let maxSteps = 10000;
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    function initialize(interpreter, scope) {
        function alertWrapper(text) {
            const msg = text ? text.toString() : '';
            return interpreter.createPrimitive(window.alert(msg));
        }
        interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(alertWrapper));
    }
    const jsInterpreter = new Interpreter(code, initialize);
    while (jsInterpreter.step() && maxSteps) {
        maxSteps -= 1;
    }
    if (!maxSteps) {
        throw EvalError('Infinite loop.');
    }
    jsInterpreter.run();
}

document.getElementById('showCode').addEventListener('click', showCode, false);
document.getElementById('runCode').addEventListener('click', runCode, false);
