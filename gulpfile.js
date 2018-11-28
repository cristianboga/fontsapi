const gulp = require('gulp');
const sass = require('gulp-sass');
// const babel = require('gulp-babel');
// const concat = require('gulp-concat');

// Copy All Html files

// gulp.task('html', () =>
//     gulp.src('src/*html')
//         .pipe(gulp.dest('build'))
// );


//Compile Sass

gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/sass/compile'))
);

gulp.task('watch', () =>
    gulp.watch('sass/**/*.scss', ['css'])
);

// Compile Js

// gulp.task('js', () =>
//     gulp.src('src/js/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(gulp.dest('build/js'))
// );


// gulp.task('default', ['sass']);