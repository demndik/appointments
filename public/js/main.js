$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    window.url = '//appointments.lc/api/v1/';
    window.main_container_id = 'apps-list';
    window.app = new Appointments();
})
function Appointments() {
    var _this = this;
    this.format_date = 'YYYY-MM-DD';
    this.message_tpl = '<div class="alert"></div>';
    this.appointments_index_tpl =
        '<div>' +
            '<div class="row apps-row">' +
                '<div class="col-md-12 col-sm-12 col-xs-12">' +
                    '<div class="col-md-1 item">' +
                    '</div>' +
                    '<div class="col-md-7 company">' +
                    '</div>' +
                    '<div class="col-md-2 date">' +
                    '</div>' +
                    '<div class="col-md-1 status">' +
                    '</div>' +
                    '<div class="col-md-1 actions">' +
                        '<div role="group" class="btn-group-vertical">' +
                            '<a class="btn btn-sm btn-success" action="1">Confirm</a>' +
                            '<a class="btn btn-sm btn-primary" action="2">Edit</a>' +
                            '<a class="btn btn-sm btn-warning" action="3">Cancel</a>' +
                            '<a class="btn btn-sm btn-danger" action="4">Delete</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    this.company_tpl =
        '<div class="row">' +
            '<div class="col-md-12 col-sm-12 col-xs-12">' +
                '<div class="col-md-9 col-sm-9 col-xs-7">' +
                    '<div class="col-md-12 col-sm-12 col-xs-12 c_name">' +
                    '</div>' +
                    '<div class="col-md-12 col-sm-12 col-xs-12 c_address">' +
                    '</div>' +
                    '<div class="col-md-12 col-sm-12 col-xs-12 c_contacts">' +
                    '</div>' +
                    '<div class="col-md-12 col-sm-12 col-xs-12 c_person">' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-3 col-sm-3 col-xs-3 result">' +
                '</div>' +
            '</div>' +
        '</div>';
    this.content = $('#' + main_container_id);

    this.init = function (app_updated) {
        app_updated = app_updated || 0;
        var appointments_block = $(_this.appointments_index_tpl);
        var company_block = $(_this.company_tpl);
        $.get(window.url + 'appointments/list', function (resp) {
            var row = '';
            var c_info = '';
            var result = [];
            resp.forEach(function (app, i, resp) {
                row = appointments_block;
                c_info = company_block;
                $('.c_name', c_info).html('"' + app.name + '"');
                $('.c_address', c_info).html(app.postal + ', ' + app.locality + ', ' + app.street + ' ' + app.house);
                $('.c_contacts', c_info).html(app.phone + ', ' + app.email + ', ' + app.site);
                $('.c_person', c_info).html(app.fname + ' ' + app.lname + '. Salutation: ' + app.salutation);

                $('.item', row).html(app.id);
                $('.company', row).html(c_info);
                $('.date', row).html(moment(app.date).format(_this.format_date) + '<br />' + app.time.slice(0, -3));
                $('.status', row).html(_this.humanizeAppStatus(app.status));
                $('.actions', row).attr('item', app.id);
                if (0 != app.status) {
                    $('.actions', row).remove();
                    $('.result', row).html(app.result);
                }
                result.push(row.html());
            })
            _this.content.html(_this.getUpdateResMessage(app_updated)+result.join(''));

            $('.actions').on('click', 'a', function () {
                $this = $(this);
                var item = $this.parent().parent().attr('item');
                var action = parseInt($this.attr('action'));
                switch (action) {
                    case 1:
                        var confirmation = new Confirmation(item);
                        _this.content.html(confirmation.getForm());
                        break;
                    case 2:
                        var edit = new Edit(item);
                        _this.content.html(edit.getForm());
                        break;
                    case 3:
                        _this.cancelApp(action, item);
                        break;
                    case 4:
                        _this.deleteApp(action, item);
                        break;
                }
            })
        })
    }

    this.getUpdateResMessage = function (result_id) {
        var res = '';
        var message_block = '';
        switch (result_id) {
            case 1:
                    res = $("<div />")
                            .append($(_this.message_tpl)
                                        .addClass('alert-success')
                                        .append('Appointment succesfull updated.')
                                        .clone()
                            )
                            .html();
                break;
            case 2:
                break;
            default:
        }
        return res;
    }

    this.humanizeAppStatus = function (number) {
        switch (number) {
            case 0:
                $str = 'Future';
                break;
            case 1:
                $str = 'Ok';
                break;
            case 3:
                $str = 'Canceled';
                break;
            case 4:
                $str = 'Deleted';
                break;
            default:
                $str = '';
        }
        return $str;
    }

    this.cancelApp = function(action_id, item) {
        if (confirm('Are you sure you want to CANCEL the appointment '+item+'?')) {
            _this.updateAppStatus(action_id, item);
        }
    }

    this.deleteApp = function(action_id, item) {
        if (confirm('Are you sure you want to DELETE the appointment '+item+'?')) {
            _this.updateAppStatus(action_id, item);
        }
    }

    this.updateAppStatus = function(action_id, item) {
        data = {'id': item, 'status': action_id};
        $.post(window.url + 'appointments/status/save', data, function (resp) {
        })
            .done(function () {
                window.app.init(1);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $('#msg').html(jQuery.parseJSON(jqXHR.responseText).result).removeClass('collapse');
            })
    }

    this.init();
}