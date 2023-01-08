import { gql } from '@apollo/client';
import client from "../../src/apollo/Client";

export default async function handler(req, res) {

  try {

    const resp = await client.mutate({
      mutation: gql`
        mutation newsletterSubscribe {
          newsletterSubscribe(
            input: {email: "${req?.query?.email}", name: "${req?.query?.name}"}
          ) {
            clientMutationId
            message
            success
            debug_message
          }
        }
      `
    });

    res.status(200).json({
      success: true,
      resp
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}
