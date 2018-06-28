Blockly.Blocks.text_shuffle = {
    /**
     * Block for shuffle characters.
     * @this Blockly.Block
     */
    init() {
        this.jsonInit({
            message0: '%1をシャッフルする',
            args0: [
                {
                    type: 'input_value',
                    name: 'TEXT',
                    check: 'String',
                },
            ],
            output: 'String',
            inputsInline: true,
            colour: 160,
            tooltip: '文字の順番をランダムでいれかえる',
        });
    },
};