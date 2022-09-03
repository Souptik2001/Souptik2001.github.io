import { gql } from '@apollo/client';
import client from "../../src/apollo/Client";

export default async function handler(req, res) {

  try {

    let whereQuery = formWhereQuery(req);

    const blogs = await client.query({
      query: gql`
        query fetchPosts {
          posts(first: 10, after: "${req?.query?.nextCursor}", ${whereQuery}) {
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

  return "where: { " +  where + " }";

}