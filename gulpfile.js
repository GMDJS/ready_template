let browserSync = require('browser-sync'),
		gulp = require('gulp'),

		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		cssnano = require('cssnano'),
		fonts = require('postcss-font-magician'),

		sass = require('gulp-sass'),
		image = require('gulp-image'),
		media = require('gulp-group-css-media-queries'),
		notify = require('gulp-notify');

gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: 'assets'
		},
		notify: false
	})
});


gulp.task('postcss', function () {
	const processor = ([
		//autoprefixer({browsers: ['last 10 version']}),
		cssnano(),
		fonts()
	]);
	return gulp.src('./assets/sass/*.sass')
		.pipe(sass().on("error", notify.onError()))
		.pipe(media())
		.pipe(postcss(processor))
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('image', function () {
	return gulp.src('./assets/img/**/*')
		.pipe(image())
		.pipe(gulp.dest('./assets/img'))
})

gulp.task('watch', ['postcss', 'browserSync'], function () {
	gulp.watch('assets/sass/**/*.sass', ['postcss']);
	gulp.watch('assets/*.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);
