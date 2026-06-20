import { gql } from '@apollo/client';
import client from "../../src/apollo/Client";

export default async function handler(req, res) {

  try {

    let whereQuery = formWhereQuery(req);

    const afterQuery = formAfterQuery(req);

    let extraQueries = [];

    if (whereQuery.length > 0) {
      extraQueries.push(whereQuery);
    }

    if (afterQuery.length > 0) {
      extraQueries.push(afterQuery);
    }

    extraQueries = extraQueries.join(", ");

    const perPage = getPerPage(req);

    const blogs = await client.query({
      query: gql`
        query fetchPosts {
          posts(first: ${perPage}, ${extraQueries}) {
            edges {
              node {
                id
                date
                excerpt
                slug
                title
                author {
                  node {
                    name
                  }
                }
                categories {
                  edges {
                    node {
                    name
                    slug
                    }
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      `
    });

    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

function formWhereQuery(req) {

  let where = "";

  if( req?.query?.authorName !== undefined ) {
    if(where.length > 0) where += ", ";

    where += `authorName: "${req?.query?.authorName}"`;
  }

  if ( req?.query?.search !== undefined && req?.query?.search.length > 0 ) {
    if(where.length > 0) where += ", ";

    where += `search: "${req?.query?.search}"`;
  }

  if ( req?.query?.category !== undefined ) {
    if(where.length > 0) where += ", ";

    where += `categoryName: "${req?.query?.category}"`;
  }

  if ( req?.query?.categoryIn !== undefined && req?.query?.categoryIn.length > 0 ) {
    const categoryIn = formIntegerList(req.query.categoryIn);

    if (categoryIn.length > 0) {
      if(where.length > 0) where += ", ";

      where += `categoryIn: [${categoryIn}]`;
    }
  }

  if ( req?.query?.tag !== undefined && req?.query?.tag.length > 0 ) {
    if(where.length > 0) where += ", ";

    where += `tag: "${req?.query?.tag}"`;
  }

  if ( req?.query?.tagIn !== undefined && req?.query?.tagIn.length > 0 ) {
    const tagIn = formIntegerList(req.query.tagIn);

    if (tagIn.length > 0) {
      if(where.length > 0) where += ", ";

      where += `tagIn: [${tagIn}]`;
    }
  }

  if ( req?.query?.tagSlugIn !== undefined && req?.query?.tagSlugIn.length > 0 ) {
    const tagSlugIn = formStringList(req.query.tagSlugIn);

    if (tagSlugIn.length > 0) {
      if(where.length > 0) where += ", ";

      where += `tagSlugIn: [${tagSlugIn}]`;
    }
  }

  return "where: { " +  where + " }";

}

function formAfterQuery(req) {

  let after = "";

  if ( req?.query?.nextCursor !== undefined && req?.query?.nextCursor.length > 0 ) {
    after = `after: "${req?.query?.nextCursor}"`;
  }

  return after;

}

function getPerPage(req) {
  const perPage = Number.parseInt(req?.query?.perPage, 10);

  if (Number.isNaN(perPage)) {
    return 10;
  }

  return Math.max(1, Math.min(perPage, 24));
}

function formIntegerList(rawList) {
  return rawList
    .split(",")
    .map((rawValue) => Number.parseInt(rawValue, 10))
    .filter((value) => ! Number.isNaN(value))
    .join(", ");
}

function formStringList(rawList) {
  return rawList
    .split(",")
    .map((rawValue) => rawValue.trim().replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter((value) => value.length > 0)
    .map((value) => `"${value}"`)
    .join(", ");
}
