<?php
/**
 * Abstract class to register settings.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc\Settings;

use \Souptik2001\Features\Inc\Traits\Singleton;

/**
 * Base class to register settings.
 */
abstract class Base {

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
		add_action( 'admin_menu', [ $this, 'options_page' ] );
		add_action( 'admin_init', [ $this, 'settings_init' ] );

	}

	/**
	 * Custom option and settings
	 */
	abstract public function settings_init();

	/**
	 * Add the top level menu page.
	 */
	public function options_page() {

		if( empty( static::SETTINGS_SLUG ) || empty( static::SETTINGS_PAGE_TITLE ) || empty( static::SETTINGS_MENU_TITLE ) ) {
			return;
		}

		add_menu_page(
			static::SETTINGS_PAGE_TITLE,
			static::SETTINGS_MENU_TITLE,
			'manage_options',
			static::SETTINGS_SLUG,
			[ $this, 'options_page_html' ]
		);
	}


	/**
	 * Top level menu callback function
	 */
	abstract public function options_page_html();


}