/*!
 *                                                                                                                                (℠)
 *  # gulpfile for Bibi
 *
 */

'use strict';

const gulp = require('gulp'), del = require('del'), fs = require('fs'), gulpZip = require('gulp-zip');
const Package = JSON.parse(fs.readFileSync('package.json')), Bibi = require('./bibi.info.js');

/* clean:distribution */ {
    gulp.task('clean:distribution', done => {
        const BibiDirectory = Bibi.DIST + '/bibi';
        del.sync([
            '**/.DS_Store',
            '**/Thumbs.db',
            'LICENSE',
            'README.md',
            '*.html',
            'and',
            'extensions',
            'presets',
            'resources',
            'wardrobe'
        ].map(X => BibiDirectory + '/' + X));
        try { if(!fs.readdirSync(BibiDirectory).length) del.sync(BibiDirectory); } catch(Err) {}
        done();
    });
}

/* make:distribution */ {
    const PkgName = Package.name + '-v' + Package.version;
    gulp.task('clean:distribution-package-directory', done => { del.sync(Bibi.DIST + '/' + PkgName         ); done(); });
    gulp.task('clean:distribution-package',           done => { del.sync(Bibi.DIST + '/' + PkgName + '.zip'); done(); });
    gulp.task('copy:bibi-files', () => {
        return gulp.src([
            Bibi.DIST + '/bibi/**'
        ], {
            base: Bibi.DIST + '/bibi'
        })
            .pipe(gulp.dest(Bibi.DIST + '/' + PkgName + '/bibi'));
    });
    gulp.task('create:bookshelf-directory', done => { fs.mkdirSync(Bibi.DIST + '/' + PkgName + '/bibi-bookshelf'), done(); });
    gulp.task('make:distribution-package', () => {
        return gulp.src([
            Bibi.DIST + '/' + PkgName + '/**'
        ], {
            base: Bibi.DIST
        })
            .pipe(gulpZip(PkgName + '.zip'))
            .pipe(gulp.dest(Bibi.DIST));
    });
    gulp.task('make:distribution', gulp.series(
        gulp.parallel(
            'clean:distribution-package-directory',
            'clean:distribution-package'
        ),
        'copy:bibi-files',
        'create:bookshelf-directory',
        'make:distribution-package'/*,
        'clean:distribution-files'*/
    ));
}

/* make:dress-template */ {
    const TimeStamp = new Date(Date.now() + 1000 * 60 * 60 * (new Date().getTimezoneOffset() / -60)).toISOString().split('.')[0].replace(/[-:]/g, '').replace('T', '-');
    const WardrobeDir = Bibi.SRC + '/bibi/wardrobe', TemplateDir = WardrobeDir + '/DRESS-TEMPLATE-' + TimeStamp;
    gulp.task('copy:dress-template-files', () => {
        const BaseDir = WardrobeDir + '/_dress-codes';
        return gulp.src([
            BaseDir + '/**',
        ], {
            base: BaseDir
        })
            .pipe(gulp.dest(TemplateDir));
    });
    gulp.task('make:dress-template', gulp.series(
        gulp.parallel(
            'copy:dress-template-files'
        )
    ));
}