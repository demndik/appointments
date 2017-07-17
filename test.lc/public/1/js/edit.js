function Edit(app_id) {
    var _this = this;
    this.id = app_id;
    this.form_tpl =
        '<div>' +
            '<form>' +
                '<div class="row">' +
                    '<div class="col-md-3 col-sm-3 hidden-xs">' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<h1>Edit appointment</h1>' +
                        '<div id="msg" class="alert alert-danger collapse">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_name">Company name</label>' +
                            '<input type="text" class="form-control" id="c_name" name="c_name">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_locality">Company locality</label>' +
                            '<input type="text" class="form-control" id="c_locality" name="c_locality">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_street">Company street</label>' +
                            '<input type="text" class="form-control" id="c_street" name="c_street">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_house">Company house</label>' +
                            '<input type="text" class="form-control" id="c_house" name="c_house">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_postal">Company postal</label>' +
                            '<input type="text" class="form-control" id="c_postal" name="c_postal">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="c_site">Company site</label>' +
                            '<input type="text" class="form-control" id="c_site" name="c_site">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="p_fname">Person first name</label>' +
                            '<input type="text" class="form-control" id="p_fname" name="p_fname">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="p_lname">Person last name</label>' +
                            '<input type="text" class="form-control" id="p_lname" name="p_lname">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="p_phone">Person phone</label>' +
                            '<input type="text" class="form-control" id="p_phone" name="p_phone">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="p_email">Person email</label>' +
                            '<input type="email" class="form-control" id="p_email" name="p_email">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="p_salutation">Person salutation</label>' +
                            '<input type="text" class="form-control" id="p_salutation" name="p_salutation">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="app_date">Appointment date</label>' +
                            '<input type="text" class="form-control" id="app_date" name="app_date">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="app_time">Appointment time</label>' +
                            '<input type="text" class="form-control" id="app_time" name="app_time">' +
                        '</div>' +
                        '<a class="btn btn-success btn-sm" id="save">Save</a>' +
                        '<a class="btn btn-default btn-sm" id="cancel">Cancel</a>' +
                    '</div>' +
                    '<div class="col-md-3 col-sm-3 hidden-xs">' +
                    '</div>' +
                '</div>' +
                '<input type="hidden" name="id" value="' + _this.id + '">' +
            '</form>' +
        '</div>';

    this.content = $('#' + main_container_id);

    this.getForm = function () {
        var form = $(this.form_tpl);
        $.get(window.url + 'appointments/'+_this.id, function (resp) {
            resp.forEach(function (app, i, resp) {
                $('#c_name').val(app.name);
                $('#c_locality').val(app.locality);
                $('#c_street').val(app.street);
                $('#c_house').val(app.house);
                $('#c_postal').val(app.postal);
                $('#c_site').val(app.site);
                $('#p_fname').val(app.fname);
                $('#p_lname').val(app.lname);
                $('#p_phone').val(app.phone);
                $('#p_email').val(app.email);
                $('#p_salutation').val(app.salutation);
                $('#app_date').val(app.date);
                $('#app_time').val(app.time);
            })
        })
        return form.html();
    }

    $(document).off('click', '#save').on('click', '#save', function () {
        _this.updateApp();
    })
    $(document).off('click', '#cancel').on('click', '#cancel', function () {
        window.app.init();
    })

    this.updateApp = function () {
        var $msg = $('#msg');
        $msg.addClass('collapse').html('');
        var data = $('form', _this.content).serialize();
        $.post(window.url + 'appointments/update', data, function (resp) {
        })
            .done(function () {
                window.app.init(1);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                var msgs = jQuery.parseJSON(jqXHR.responseText);
                for(var i in msgs) {
                    msgs[i].forEach(function(msg) {
                        $msg.append(msgs[i][0] + '<br />').removeClass('collapse');
                    })
                }
                window.scrollTo(0, 0);
            })
    }
}