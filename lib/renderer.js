'use strict';

const marked = require('marked');

module.exports = function(data, options) {
  const { marked: markedCfg } = this.config;
  const { path, text } = data;

  const renderer = new marked.Renderer();
  this.execFilterSync('marked:renderer', renderer, {context: this});

  const tokenizer = new marked.Tokenizer();
  this.execFilterSync('marked:tokenizer', tokenizer, {context: this});

  const source = { path };

  return marked(text, Object.assign({
    renderer,
    tokenizer
  }, markedCfg, options, { source }));
};
