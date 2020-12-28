export const FEAT_TIME          = true;
export const FEAT_CURSOR        = true;
export const FEAT_LEGEND        = true;

export const FEAT_POINTS        = true;

export const FEAT_PATHS         = true;
export const FEAT_PATHS_LINEAR  = true;
export const FEAT_PATHS_SPLINE  = true;
export const FEAT_PATHS_STEPPED = true;
export const FEAT_PATHS_BARS    = true;

export const FEAT_JOIN          = true;

const getenv_uplot_debug = () => (
	typeof window == 'object'
		? !!window.UPLOT_DEBUG
		: !!process.env.UPLOT_DEBUG
);

export const FEAT_DEBUG         = getenv_uplot_debug();
