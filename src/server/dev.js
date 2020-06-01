import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../../webpack.dev.config';
const app = express(),
    compiler = webpack(config);

const port = process.env.PORT;

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(__dirname + '/index.html', (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    })
})

app.listen(port);
