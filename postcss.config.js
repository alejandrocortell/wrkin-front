module.exports = {
    plugins: {
        'postcss-nested': true,
        autoprefixer: true,
        'postcss-import': true,
        'postcss-purgecss': {
            content: ['public/**/*.html', 'src/**/*.tsx'],
            css: ['src/**/*.css'],
        },
        'postcss-sorting': {
            order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
            'properties-order': 'alphabetical',
            'unspecified-properties-position': 'bottom',
        },
        'postcss-font-magician': {
            variants: {
                'Roboto Condensed': {
                    300: [],
                    400: [],
                    700: [],
                },
            },
            foundries: ['google'],
        },
    },
}
