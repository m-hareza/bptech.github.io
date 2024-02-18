window.onload = function() {
    function radians_to_degrees(radians) {
        return radians * (180 / Math.PI);
    }

    function to3decimalDigits(ratio) {
        return Number(ratio.toFixed(3));
    }

    function sortByRatio(possibleGearCombinations) {
        return possibleGearCombinations.sort((a, b) => a[0] - b[0]);
    }

    function get_possible_ger_combinations(min, max) {
        const possibleGearCombinations = [];
        for (let front = 22; front <= 40; front++) {
            for (let rear = 16; rear <= 22; rear++) {
                const ratio = to3decimalDigits(front/rear);
                if (ratio >= min && ratio <= max) {
                    possibleGearCombinations.push([ratio, front, rear]);
                }
            }
        }
        return sortByRatio(possibleGearCombinations);
    }

    $('#pedal-strike-angle-form').on('submit', function (e) {
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
        $('#pedal-strike-angle').val(pedalStrikeAngle);
    });

    $('#chainring-and-cog-sizes-form').on('submit', function (e) {
        e.preventDefault();
        $("#chainring-and-cog-sizes").find("tr:gt(0)").remove();
        const minimumRatio = +$('#minimum-ratio').val();
        const maximumRatio = +$('#maximum-ratio').val();
        const ratios = get_possible_ger_combinations(minimumRatio, maximumRatio);
        const resultContainer = $('#chainring-and-cog-sizes');
        ratios.forEach(ratio => {
            const row = "<tr><td>"+ ratio[0] + "</td><td>" + ratio[1] + " </td><td>" + ratio[2]+"</td></tr>";
            resultContainer.append(row);
        })

    //     <tr>
    //     <td>Alfreds Futterkiste</td>
    //     <td>Maria Anders</td>
    //     <td>Germany</td>
    // </tr>
    });

}

