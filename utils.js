const slug = require('slug');
const fs = require('fs');
const path = require('path');

function getFilePathsInDir(dirPath) {
  return fs.readdirSync(dirPath).map(fname => path.join(dirPath, fname));
}

function getFileNameFromPath(filePath) {
  return path.basename(filePath);
}

function parseDate(fname) {
  return new Date(fname
    .split('_')
    .slice(0, 3)
    .join(' '));
}

function parseTitle(fname) {
  const title = fname
    .split('_')
    .slice(3)
    .join(' ');
  return title.substr(0, title.lastIndexOf('.')) || title;
}

function parseSlug(fname) {
  return slug(parseTitle(fname).toLowerCase());
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date === b.date) {
      return 0;
    }

    if (a.date > b.date) {
      return -1;
    }
    return null;
  });
}

module.exports = {
  parseDate,
  parseTitle,
  parseSlug,
  getFilePathsInDir,
  getFileNameFromPath,
  sortPosts
};
