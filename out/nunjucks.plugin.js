// Generated by CoffeeScript 1.9.1
(function() {
  var includeAll, path,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  path = require('path');

  includeAll = require('include-all');

  require('coffee-script/register');

  module.exports = function(BasePlugin) {
    var nunjucks;
    return nunjucks = (function(superClass) {
      extend(nunjucks, superClass);

      nunjucks.prototype.name = 'nunjucks';

      nunjucks.prototype.nunjucks = null;

      nunjucks.prototype.config = {
        tags: "tags",
        filters: "filters"
      };

      function nunjucks() {
        var NonWatchingLoader, custom, filter, i, j, len, len1, name, nunjucksLib, ref, ref1, tag;
        nunjucks.__super__.constructor.apply(this, arguments);
        nunjucksLib = require('nunjucks');
        NonWatchingLoader = new nunjucksLib.FileSystemLoader(this.docpad.config.layoutsPaths, false);
        this.engine = new nunjucksLib.Environment(NonWatchingLoader);
        this.config.tags = path.join(this.docpad.config.rootPath, this.config.tags);
        this.config.filters = path.join(this.docpad.config.rootPath, this.config.filters);
        custom = {
          tags: includeAll({
            dirname: this.config.tags,
            filter: /(.+)\.coffee$/,
            optional: true
          }),
          filters: includeAll({
            dirname: this.config.filters,
            filter: /(.+)\.coffee$/
          })
        };
        ref = custom.filters;
        for (filter = i = 0, len = ref.length; i < len; filter = ++i) {
          name = ref[filter];
          this.engine.addFilter(name, tag);
        }
        ref1 = custom.tags;
        for (tag = j = 0, len1 = ref1.length; j < len1; tag = ++j) {
          name = ref1[tag];
          this.engine.addFilter(name, tag);
        }
      }

      nunjucks.prototype.render = function(options, next) {
        var content, file, inExtension, outExtension, templateData;
        inExtension = options.inExtension, outExtension = options.outExtension, content = options.content, file = options.file, templateData = options.templateData;
        if (inExtension === 'nunjucks') {
          return this.engine.renderString(content, templateData, function(err, res) {
            options.content = res;
            return next();
          });
        }
      };

      return nunjucks;

    })(BasePlugin);
  };

}).call(this);