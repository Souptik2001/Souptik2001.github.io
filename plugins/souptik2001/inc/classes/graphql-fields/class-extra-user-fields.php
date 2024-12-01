<?php
/**
 * Registers extra fields for user query graphql.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc\Graphql_Fields;

use \Souptik2001\Features\Inc\Traits\Singleton;

/**
 * Class Extra_User_Fields
 */
class Extra_User_Fields {

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
		add_action( 'graphql_register_types', [ $this, 'register_extra_user_fields' ] );

	}

	/**
	 * Registers required extra user fields.
	 */
	public function register_extra_user_fields() {

		register_graphql_object_type(
			'UserRoleSouptik2001',
			[
				'fields' => [
					'slug' => [ 'type' => 'String' ],
					'name' => [ 'type' => 'String' ],
				],
			]
		);

		register_graphql_field(
			'user',
			'role',
			[
				'type'        => 'UserRoleSouptik2001',
				'description' => __( 'Role of the user.', 'souptik2001' ),
				'resolve'     => [ $this, 'user_role_field_resolver' ],
			]
		);

		register_graphql_field(
			'user',
			'registered',
			[
				'type'        => 'String',
				'description' => __( 'The date and time on which the user was registered.', 'souptik2001' ),
				'resolve'     => [ $this, 'user_registered_field_resolver' ],
			]
		);

	}

	/**
	 * Returns user's registration date and time.
	 *
	 * @param object $user User object.
	 *
	 * @return string
	 */
	public function user_registered_field_resolver( $user ) {

		$user_id   = $user->userId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$user_meta = get_userdata( $user_id );

		return $user_meta->user_registered;

	}

	/**
	 * Returns user's role.
	 *
	 * @param object $user User object.
	 *
	 * @global $wp_roles
	 *
	 * @return string
	 */
	public function user_role_field_resolver( $user ) {

		global $wp_roles;

		$user_id    = $user->userId; // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$user_meta  = get_userdata( $user_id );
		$user_roles = $user_meta->roles;

		if ( empty( $user_roles ) ) {
			return [];
		}

		return [
			'slug' => $user_roles[0],
			'name' => $wp_roles->roles[ $user_roles[0] ]['name'],
		];

	}

}
