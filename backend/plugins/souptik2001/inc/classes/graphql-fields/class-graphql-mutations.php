<?php
/**
 * Registers extra mutations for Graphql.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc\Graphql_Fields;

use \Souptik2001\Features\Inc\Traits\Singleton;

/**
 * Class Graphql_Mutations
 */
class Graphql_Mutations {

	use Singleton;

	/**
	 * Construct method.
	 */
	final protected function __construct() {

		$this->setup_hooks();

	}

	/**
	 * To register action/filters.
	 *
	 * @return void
	 */
	protected function setup_hooks() {

		/**
		 * Actions
		 */
		add_action( 'graphql_register_types', [ $this, 'register_extra_mutations' ] );

	}

	/**
	 * Registers extra mutations required.
	 */
	public function register_extra_mutations() {

		register_graphql_mutation(
			'newsletterSubscribe',
			[
				'inputFields'         => [
					'email' => [
						'type'        => 'String',
						'description' => __( 'Email of the subscriber.', 'souptik2001' ),
					],
					'name'  => [
						'type'        => 'String',
						'description' => __( 'Name of the subscriber.', 'souptik2001' ),
					],
				],
				'outputFields'        => [
					'success'       => [
						'type'        => 'Boolean',
						'description' => __( 'Returns boolean value indicating whether subscription was successful.', 'souptik2001' ),
					],
					'message'       => [
						'type'        => 'String',
						'description' => __( 'Output message from server.', 'souptik2001' ),
					],
					'debug_message' => [
						'type'        => 'String',
						'description' => __( 'Debug output message from server.', 'souptik2001' ),
					],
				],
				'mutateAndGetPayload' => function( $input, $context, $info ) {

					if ( empty( $input['email'] ) || empty( $input['name'] )  ) {
						return [
							'success'       => false,
							'message'       => __( 'Subscriber email or name missing.', 'souptik2001' ),
							'debug_message' => __( 'Required input fields email or name not supplied.', 'souptik2001' ),
						];
					}

					if ( ! class_exists( \MailPoet\API\API::class ) ) {

						return [
							'success'       => false,
							'message'       => __( 'Some internal server error occurred. Sorry for the inconvenience we are trying to fix it.', 'souptik2001' ),
							'debug_message' => __( 'MailPoet API class not found.', 'souptik2001' ),
						];

					}

					$response = [
						'success'       => true,
						'message'       => __( 'That\'s it!🚀 Please check your email for confirmation.' ),
						'debug_message' => '',
					];

					$mailpoet_api = \MailPoet\API\API::MP( 'v1' );

					$desired_list_id = null;

					$all_mailpoet_lists = $mailpoet_api->getLists();

					foreach ( $all_mailpoet_lists as $mailpoet_list ) {

						if ( 'Newsletter mailing list' === $mailpoet_list['name'] ) {
							$desired_list_id = $mailpoet_list['id'];
							break;
						}
					}

					if ( null === $desired_list_id ) {

						return [
							'success'       => false,
							'message'       => __( 'Some internal server error occurred. Sorry for the inconvenience we are trying to fix it.', 'souptik2001' ),
							'debug_message' => __( 'Wordpress Users list ID not found. Please check the lists section.', 'souptik2001' ),
						];

					}

					$subscriber_user = null;

					try {

						$subscriber_user = $mailpoet_api->addSubscriber(
							[
								'email' => $input['email'],
								'first_name' => $input['name']
							],
							[]
						);

					} catch ( \Exception $th ) {

						$error_message = $th->getMessage();
						$error_code    = $th->getCode();

						if ( ! in_array( $error_code, [ 12 ], true ) ) {

							return [
								'success'       => false,
								'message'       => __( 'Some internal server error occurred. Sorry for the inconvenience we are trying to fix it.', 'souptik2001' ),
								'debug_message' => $error_message,
							];

						}

						$subscriber_user = $mailpoet_api->getSubscriber( $input['email'] );
					}

					if ( null === $subscriber_user || ! isset( $subscriber_user['id'] ) ) {
						return [
							'success'       => false,
							'message'       => __( 'Some internal server error occurred. Sorry for the inconvenience we are trying to fix it.', 'souptik2001' ),
							'debug_message' => __( 'Subscriber user not found in database.', 'souptik2001' ),
						];
					}

					foreach ( $subscriber_user['subscriptions'] as $subscription ) {

						if ( $desired_list_id === $subscription['segment_id'] && 'subscribed' === $subscription['status'] && 'subscribed' === $subscriber_user['status'] ) {

							return [
								'success'       => false,
								'message'       => __( 'You are already subscribed to our newsletter.', 'souptik2001' ),
								'debug_message' => __( 'You are already subscribed to our newsletter.', 'souptik2001' ),
							];

						}
					}

					try {

						$mailpoet_api->subscribeToLists(
							$subscriber_user['id'],
							[
								$desired_list_id,
							]
						);

					} catch ( \Exception $th ) {

						$error_message = $th->getMessage();
						$error_code    = $th->getCode();

						return [
							'success'       => false,
							'message'       => __( 'Some internal server error occurred. Sorry for the inconvenience we are trying to fix it.', 'souptik2001' ),
							'debug_message' => $error_message,
						];
					}

					return $response;
				},
			]
		);

	}
}
