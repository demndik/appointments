function Confirmation(app_id) {
    var _this = this;
    this.id = app_id;
    this.form_tpl = 
        '<div>' +
            '<form>' +
                '<div class="row">' +
                    '<div class="col-md-3 col-sm-3 hidden-xs">' +
                    '</div>' +
                    '<div class="col-md-6 col-sm-6 col-xs-12">' +
                        '<h1>End apppointment</h1>' +
                        '<div id="msg" class="alert alert-danger collapse">' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label>Apppointment result</label>' +
                            '<textarea name="result" class="app-result">' +
                            '</textarea>' +
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
        return $(this.form_tpl).html();
    }
    $(document).off('click', '#save').on('click', '#save', function () {
        if (!$('textarea', _this.content).val().length) {
            alert('Please describe the result of the appointment.');
            return;
        }
        _this.saveAppResult();
    })
    $(document).off('click', '#cancel').on('click', '#cancel', function () {
        window.app.init();
    })

    this.saveAppResult = function () {
        $('#msg').addClass('collapse');
        var data = $('form', _this.content).serialize();
        $.post(window.url + 'appointments/result/save', data, function (resp) {
        })
            .done(function () {
                window.app.init(1);
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                $('#msg').html(jQuery.parseJSON(jqXHR.responseText).result).removeClass('collapse');
            })
    }
}