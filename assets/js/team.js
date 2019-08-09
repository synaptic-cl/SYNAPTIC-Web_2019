function Shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getUrlVars() {
    var vars = {},
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars[hash[0]] = hash[1];
    }
    return vars;
};

function dashboard() {
    $(document).ready(function() {
        $.getJSON('team.json', function(data) {
            Handlebars.registerHelper('ifFind', function(arg1, arg2, options) {
                return (arg1.indexOf(arg2) >= 0) ? options.fn(this) : options.inverse(this);
            });
            var source = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
            var tu = data.pop();
            var shuffledTeam = Shuffle(data);
            shuffledTeam.push(tu)
            $('#team').html(template({ team: shuffledTeam }));
        });
    });
};

function person() {
    $(document).ready(function() {
        var hashes = getUrlVars();
        var name = hashes.name;
        $.getJSON('team.json', function(data) {
            var person = null;
            $.each(data, function(k, v) {
                if (name === v.id) {
                    person = v
                }
            })
            if (!person) document.location.href = '/dashboard.html'
            var source = document.getElementById("entry-template").innerHTML;
            Handlebars.registerHelper('ifFind', function(arg1, arg2, options) {
                return (arg1.indexOf(arg2) >= 0) ? options.fn(this) : options.inverse(this);
            });
            var template = Handlebars.compile(source);
            $('#id-synaptic').html(template(person));
        });
    });
};
