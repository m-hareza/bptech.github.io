window.onload = function() {
    function radians_to_degrees(radians) {
        return radians * (180 / Math.PI);
    }

    $('#pedal-strike-angle').on('submit', function (e) {
        e.preventDefault();
        const bbLength = +$('#bb-length').val();
        const bbHeight = +$('#bb-height').val();
        const crankLength = +$('#crank-length').val();
        const crankOffset = +$('#crank-offset').val();
        const pedalWidth = +$('#pedal-width').val();
        const pedalThickness = +$('#pedal-thickness').val();
        const width = pedalWidth + crankOffset + (bbLength / 2);
        const height = bbHeight - (pedalThickness / 2) - crankLength;
        const angleInRadians = Math.atan(width / height);
        const angle = radians_to_degrees(angleInRadians);
        const pedalStrikeAngle = 90 - angle;
        $('#result').val(pedalStrikeAngle);
    });

}

