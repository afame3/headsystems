modCommunityDatingInit = function( $ ) {
    var formAction = mod_community_dating_data.formAction,
        formAdditionalParams = mod_community_dating_data.formAdditionalParams,
        ageFormat = mod_community_dating_data.ageFormat,
        now = new Date(mod_community_dating_data.serverTimestamp),
        $form = $('.joms-module--dating form'),
        $genderField = $('.joms-module--dating-gender-field'),
        $genderValue = $('.joms-module--dating-gender-value'),
        $ageField = $('.joms-module--dating-age-field'),
        $ageFrom = $('.joms-module--dating-age-from'),
        $ageTo = $('.joms-module--dating-age-to'),
        $locationField = $('.joms-module--dating-location-field'),
        $locationValue = $('.joms-module--dating-location-value'),
        $locationType = $('.joms-module--dating-location-type'),
        $radiusField = $('.joms-module--dating-radius-field'),
        $radiusValue = $('.joms-module--dating-radius-value');

    $ageFrom.add( $ageTo ).on('input', function( e ) {
        var val = e.target.value
            .replace(/[^\d]+/g, '')
            .replace(/^(\d{3}).+$/, '$1');

        if ( e.target.value !== val ) {
            e.target.value = val;
        }
    });

    $form.on('submit', function( e ) {
        e.preventDefault();
        e.stopPropagation();

        var counter = 0,
            params = [],
            keyList = [],
            ageFrom, ageTo, dateFrom, dateTo;

        // format gender parameters
        if ( $genderField.length && $genderValue.length && $genderValue.val() ) {
            params.push([
                'field' + counter + '=' + $genderField.val(),
                'condition' + counter + '=equal',
                'value' + counter + '=' + $genderValue.val(),
                'fieldType' + counter + '=gender'
            ].join('&'));
            keyList.push( counter++ );
        }

        // format age parameters
        if ( $ageField.length && $ageFrom.length && $ageTo.length ) {
            ageFrom = +$ageFrom.val();
            ageTo = +$ageTo.val();
            if ( ageFrom || ageTo ) {
                if ( ageFormat !== 'age' ) {
                    if ( ageFrom ) {
                        dateFrom = new Date( now.getTime() );
                        dateFrom.setFullYear( dateFrom.getFullYear() - ageFrom );
                        ageFrom = dateFrom.getFullYear() + '-' + ( dateFrom.getMonth() + 1 ) + '-' + dateFrom.getDate();
                    }
                    if ( ageTo ) {
                        dateTo = new Date( now.getTime() );
                        dateTo.setFullYear( dateTo.getFullYear() - ageTo );
                        ageTo = dateTo.getFullYear() + '-' + ( dateTo.getMonth() + 1 ) + '-' + dateTo.getDate();
                    }
                }
                params.push([
                    'field' + counter + '=' + $ageField.val(),
                    'condition' + counter + '=between',
                    'value' + counter + '=' + (ageFrom || ''),
                    'value' + counter + '_2=' + (ageTo || ''),
                    'fieldType' + counter + '=birthdate'
                ].join('&'));
                keyList.push( counter++ );
            }
        }

        // format location parameters
        if ( $locationField.length && $locationValue.length && $locationValue.val() ) {
            params.push([
                'field' + counter + '=' + $locationField.val(),
                'condition' + counter + '=' + ( $locationValue.prop('tagName').toUpperCase() === 'SELECT' ? 'equal' : 'contain' ),
                'value' + counter + '=' + $locationValue.val(),
                'fieldType' + counter + '=' + $locationType.val()
            ].join('&'));
            keyList.push( counter++ );
        }

        // format radius parameters
        if ( $radiusField.length && $radiusValue.length && $radiusValue.val() ) {
            params.push([
                'field' + counter + '=' + $radiusField.val(),
                'value' + counter + '=' + $radiusValue.val(),
                'fieldType' + counter + '=select'
            ].join('&'));
            keyList.push( counter++ );
        }

        // force user to enter at least one parameter
        if ( !params.length ) {
            return;
        }

        window.location = formAction + '?' + params.join('&') + '&' + formAdditionalParams + keyList.join(',');
    });
};

modCommunityDatingTimer = setInterval(function() {
    if ( window.jQuery ) {
        clearInterval( modCommunityDatingTimer );
        jQuery(function() {
            modCommunityDatingInit( jQuery );
        });
    }
}, 1000 );
