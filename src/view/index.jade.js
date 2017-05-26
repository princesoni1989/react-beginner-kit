// Exporting jade template as string for further compilation
// is a hack to work around webpack's serverside bundling
module.exports = `
doctype html
html(class="no-js", lang="")
  head
    meta(charset="utf-8")
    meta(http-equiv="x-ua-compatible", content="ie=edge")
    

    title= title

    meta(name='description', content=description)
    meta(name='viewport', content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")

    link(rel='apple-touch-icon', href="/apple-touch-icon.png")

    if stylesheet
      link(media="all", rel="stylesheet", href=stylesheet)
  body
    #app!= body
    script(type='text/javascript').
      window.__INITIAL_STATE__=!{initialState}
    script(src=entry)
`;
