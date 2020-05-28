declare var $: any;

export class Helpers {
	static setLoading(enable) {
		const body = $('body');
		if (enable) {
			$(body).LoadingOverlay('show', {
				background: 'rgba(255, 255, 255, 0.8)'
			});
		} else {
			$(body).LoadingOverlay('hide');
		}
	}

	static bodyClass(strClass) {
		$('body').attr('class', strClass);
	}
}
