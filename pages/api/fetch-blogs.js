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

    const blogs = await client.query({
      query: gql`
        query fetchPosts {
          posts(first: 10, ${extraQueries}) {
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

  return "where: { " +  where + " }";

}

function formAfterQuery(req) {

  let after = "";

  if ( req?.query?.nextCursor !== undefined && req?.query?.nextCursor.length > 0 ) {
    after = `after: "${req?.query?.nextCursor}"`;
  }

  return after;

}
