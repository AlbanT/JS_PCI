/**
 * NOTE pad(input_value, width, left, z)
 * @param {variant} input_value string or number to pad
 * @param {int} width nr of digits
 * @param {boolean} left pads left when true, otherwise right pad
 * @param {char} z optional padding character. When omitted '0' is used
 * @returns 
 */
function pad(input_value, width, left, z) {
    z = z || '0'; // default is '0' unless z is given
    input_value = input_value + '';

    if (left) { /* pad left */
        return input_value.length >= width ? input_value : new Array(width - input_value.length + 1).join(z) + input_value;
    }
    else { /* pad right */
        return input_value.length >= width ? input_value : input_value + new Array(width - input_value.length + 1).join(z);
    }
}

alert("'" + pad(1234, 6, true) + "'\n'" + pad("1234", 6, false, ' ') + "'");