import { Button } from '@wordpress/components';
import { PluginMoreMenuItem, PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { brush, rotateRight } from '@wordpress/icons';
import { registerPlugin } from '@wordpress/plugins';
const {
    element: {
        useState,
    },
} = wp;

const slotFillIcon = brush;

const Renderer = () => {

	const [loading, setLoading] = useState(false);

	const { revalidate_url='', revalidation_secret='' } = site_revalidation_data;

	const revalidateFrontend = async () => {
		setLoading(true);

		if ( revalidate_url.length === 0 ) {
			wp.data.dispatch('core/notices').createNotice(
				'error',
				__( 'Frontend revalidation URL empty. Please fill out the "Revalidate link" with some valid URL.', 'souptik2001' ),
				{
					id: 'frontend-revalidated-gutenberg-notice',
					isDismissible: true,
				}
			);
		} else {
			let wholeRevalidateUrl = revalidate_url + revalidation_secret + "&endpoint=";
			wholeRevalidateUrl += ( post_data.post_type === "post" ) ? "/blog/" : "/";
			wholeRevalidateUrl += post_data.post_name;

			try {

				let revalidationResponse = await fetch( wholeRevalidateUrl );

				let serverResponse = await revalidationResponse.json();

				if ( serverResponse.revalidated === true ) {

					wp.data.dispatch('core/notices').createNotice(
						'success',
						__( 'Successfully revalidated frontend', 'souptik2001' ),
						{
							id: 'frontend-revalidated-gutenberg-notice',
							isDismissible: true,
						}
					);

				} else {

					console.log( "======== FRONTEND REVALIDATION FAILED ========" );
					console.log( revalidationResponse );
					console.log( "================" );

					wp.data.dispatch('core/notices').createNotice(
						'error',
						__( 'Frontend revalidation failed from server side. Please check console for response received from server side.', 'souptik2001' ),
						{
							id: 'frontend-revalidated-gutenberg-notice',
							isDismissible: true,
						}
					);

				}

			}  catch (err) {

				console.log( "======== FRONTEND REVALIDATION FAILED ========" );
				console.log( err );
				console.log( "================" );

				wp.data.dispatch('core/notices').createNotice(
					'error',
					__( 'Error revalidating. Please check console for more information.', 'souptik2001' ),
					{
						id: 'frontend-revalidated-gutenberg-notice',
						isDismissible: true,
					}
				);

			}
		}

		setLoading(false);
	};

	return(
		<Fragment>
			<PluginSidebarMoreMenuItem target="souptik2001-sidebar" icon={ slotFillIcon }>
				Souptik2001
			</PluginSidebarMoreMenuItem>
			<PluginSidebar name="souptik2001-sidebar" icon={ slotFillIcon } title="Souptik2001 settings">
				<Button
				variant='primary'
				onClick={ revalidateFrontend }
				isBusy={ loading }
				disabled={ loading }
				>
					Revalidate Frontend
				</Button>
			</PluginSidebar>
			<PluginMoreMenuItem
				icon={ rotateRight }
				onClick={ revalidateFrontend }
				disabled={ loading }
				isBusy={ loading }
			>
				Revalidate Frontend
			</PluginMoreMenuItem>
		</Fragment>
	);

}

registerPlugin(
	'souptik2001-slot-fills',
	{
		render: Renderer,
		icon: slotFillIcon
	}
);
