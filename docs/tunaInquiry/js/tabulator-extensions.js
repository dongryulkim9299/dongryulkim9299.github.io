/*
 * Provides functions to work with tabulator library.
 * 
 * TODO
 *  - Have to remove all debug logs.
 */
var _$tabulator_extensions = {
    // Customer editor for Driver field.
    driverSelectInputEditor: function (cell, onRendered, success, cancel, editorParams) {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass the successfuly updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell
        //editorParams - params object passed into the editorParams column definition property

        console.debug('Creating customer editor...');

        const cellValue = cell.getValue();

        var editor = document.createElement('div');

        // Create select and option elements
        var select = document.createElement("select");
        select.name = 'cell-driver-select'
        select.classList.add('cell-driver-select');
        select.classList.add('show');

        // Add empty item because sometims an option in the selec element cannot be selected with the empty item.
        let opt = document.createElement('option');
        opt.value = '';
        opt.text = '';
        select.append(opt);

        let found = false;
        if ((editorParams.values || {}).length > 0) {
            editorParams.values.forEach(function (item) {
                opt = document.createElement('option');
                opt.value = item.value;

                if (item.value == cellValue) {
                    opt.text = "*" + item.label;
                }
                else {
                    opt.text = item.label;
                }
                
                select.append(opt);

                if (item.text == cellValue || item.value == cellValue) {
                    found = true;
                }
            });
        }

        // Add the current cell value which is added by selecting 'Other'.
        if (!found) {
            opt = document.createElement('option');
            opt.value = cellValue;
            opt.text = cellValue;
            select.append(opt);
        }

        // Add 'Other' option
        opt = document.createElement('option');
        opt.value = 'Other';
        opt.text = 'Other';
        select.append(opt);

        select.addEventListener('change', function (evt) {
            console.debug('select > change event this.value => ' + this.value);
            console.debug('select > change event target.value => ' + evt.target.value);

            if (this.value == 'Other') {
                // Show text element while hiding select element
                $('.cell-driver-text').removeClass('hide');
                $('.cell-driver-text').addClass('show');
                $('.cell-driver-text').focus();

                $('.cell-driver-select').removeClass('show');
                $('.cell-driver-select').addClass('hide');
            }
            else if (!!!this.value) {
            }
            else { // Update value in tabulator when an item ohter than 'Other' is selected
                success(this.value);
            }
        });

        editor.append(select);

        // Create text element which is shown when 'Other' is selected.
        var text = document.createElement('input');
        text.setAttribute('type', 'text');
        text.classList.add('cell-driver-text');
        text.classList.add('hide');
        text.addEventListener('change', function (evt) {
            console.debug('text > change event this.value => ' + this.value);
            console.debug('text > change event target.value => ' + evt.target.value);

            success(this.value);
        });
        editor.append(text);        

        onRendered(function () {
            editor.style.css = "100%";
        });

        return editor;
    }
};