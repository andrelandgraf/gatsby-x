const axios = require('axios');
const path = require('path');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

// eslint-disable-next-line no-console
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const getItems = async () =>
  axios.get(`${process.env.API_URL}/items`).then(res => res.data);

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  try {
    const items = await getItems();
    items.forEach(item => {
      createNode({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        imageText: item.imageText,
        price: item.price,
        link: item.link,
        // req fields
        id: item._id,
        parent: null,
        children: [],
        internal: {
          type: 'Items',
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: {
      allItems: { items },
    },
  } = await graphql(`
    query {
      allItems {
        items: nodes {
          description
          id
          price
          title
          imageUrl
          imageText
          link
        }
      }
    }
  `);

  items.forEach(item => {
    createPage({
      path: item.link,
      component: path.resolve('./src/templates/item.jsx'),
      context: {
        id: item.id,
      },
    });
  });
};
