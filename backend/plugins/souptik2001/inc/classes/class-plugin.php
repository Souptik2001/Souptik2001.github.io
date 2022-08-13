<?php
/**
 * Plugin manifest class.
 *
 * @package souptik2001
 */

namespace Souptik2001\Features\Inc;

use \Souptik2001\Features\Inc\Traits\Singleton;
/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->hooks();
	}

	/**
	 * Adds hooks.
	 *
	 * @return void
	 */
	public function hooks() {

	}

	/**
	 * Runs after activating the plugin.
	 */
	public function waldos_platform_activate() {

		flush_rewrite_rules();

	}

	/**
	 * Runs after deactivating the plugin.
	 */
	public function waldos_platform_deactivate() {

		flush_rewrite_rules();

	}

}
