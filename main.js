const Remarkable = require('remarkable');
const fs = require('fs');
const { build } = require('./compileUtils');

const {
  parseSlug,
  parseDate,
  parseTitle,
  getFilePathsInDir,
  getFileNameFromPath,
  sortPosts
} = require('./utils');

const postsPath = './posts';

function readAndParseContent(postPath) {
  const markdown = fs.readFileSync(postPath).toString();
  const mdConverter = new Remarkable();
  return mdConverter.render(markdown);
}

function parsePost(postPath) {
  return {
    title: parseTitle(getFileNameFromPath(postPath)),
    slug: parseSlug(getFileNameFromPath(postPath)),
    date: parseDate(getFileNameFromPath(postPath)),
    content: readAndParseContent(postPath)
  };
}

const parsedPosts = sortPosts(getFilePathsInDir(postsPath).map(postPath => parsePost(postPath)));
const outputPath = './output';
// blog page
build({ posts: parsedPosts }, './blog.handlebars', `${outputPath}/blog.html`);
for (const post of parsedPosts) {
  build(post, './post.handlebars', `${outputPath}/${post.slug}.html`);
}
