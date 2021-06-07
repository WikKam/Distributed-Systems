const create404 = (res) => {
    res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    res.write("<div>404 page not found :(</div>");
    return res;
}

const createForm = (res, action, params, label) => {
    res.write(`<div>${label}</div>`)
    res.write(`<form method="GET" action="${action}">`);
    params.forEach(param => {
        res.write(`<label for="${param.name}">Enter ${param.name}</label>`);
        res.write(`<input name=${param.name} type="${param.type}">`);
        res.write("<br>");
    });
    res.write('<input type="submit">');
    if(params.length > 0){
        res.write('<input type="reset">');
    }
    res.write('</form>');

    return res;
}

module.exports = { createForm, create404 };