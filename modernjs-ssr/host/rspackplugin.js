class ModifyServerLoaderPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('ModifyServerLoaderPlugin', compilation => {
      this._handleRenderStartup(compiler, compilation);
    });
  }

  _handleRenderStartup(compiler, compilation) {
    compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(
      compilation,
    ).renderStartup.tap('ModifyServerLoaderPlugin', (source, _renderContext, upperContext) => {
      return new compiler.webpack.sources.ConcatSource(`
                console.log(11);
                ${source.source().toString()}
                `);
    });
  }
}
module.exports = ModifyServerLoaderPlugin;
