const handleBars = require('handlebars');
const pretty = require('pretty');
const fs = require('fs');

handleBars.registerHelper('capitalize', function (str) {
  return str.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
});

handleBars.registerHelper('stringifyDate', function (date) {
  return date
    .toString()
    .split(' ')
    .slice(1, 4)
    .join(' ');
});

function build(context, templatePath, outputPath) {
  const compiled = handleBars.compile(fs.readFileSync(templatePath).toString())(context);
  fs.writeFileSync(outputPath, pretty(compiled));
  return compiled;
}

module.exports = {
  build
};
