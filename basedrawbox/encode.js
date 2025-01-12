// Base128 table definition
const base128Table = [
    '─', '━', '│', '┃', '┄', '┅', '┆', '┇', '┈', '┉', '┊', '┋', '┌', '┍', '┎', '┏',
    '┐', '┑', '┒', '┓', '└', '┕', '┖', '┗', '┘', '┙', '┚', '┛', '├', '┝', '┞', '┟',
    '┠', '┡', '┢', '┣', '┤', '┥', '┦', '┧', '┨', '┩', '┪', '┫', '┬', '┭', '┮', '┯',
    '┰', '┱', '┲', '┳', '┴', '┵', '┶', '┷', '┸', '┹', '┺', '┻', '┼', '┽', '┾', '┿',
    '╀', '╁', '╂', '╃', '╄', '╅', '╆', '╇', '╈', '╉', '╊', '╋', '╌', '╍', '╎', '╏',
    '═', '║', '╒', '╓', '╔', '╕', '╖', '╗', '╘', '╙', '╚', '╛', '╜', '╝', '╞', '╟',
    '╠', '╡', '╢', '╣', '╤', '╥', '╦', '╧', '╨', '╩', '╪', '╫', '╬', '╭', '╮', '╯',
    '╰', '╱', '╲', '╳', '╴', '╵', '╶', '╷', '╸', '╹', '╺', '╻', '╼', '╽', '╾', '╿'
];

/**
 * Base128 encoding function
 * @param {Uint8Array} data - Input binary data
 * @returns {string} - The string encoded in Base128
 */
function encodeBase128(data) {
    let result = '';
    let bitBuffer = 0;
    let bitCount = 0;

    for (let byte of data) {
        bitBuffer = (bitBuffer << 8) | byte; // Add 8 bits
        bitCount += 8;

        while (bitCount >= 7) {
            bitCount -= 7;
            let index = (bitBuffer >> bitCount) & 0x7F; // Extract the top 7 bits
            result += base128Table[index];
        }
    }

    // Process remaining bits
    if (bitCount > 0) {
        let index = (bitBuffer << (7 - bitCount)) & 0x7F;
        result += base128Table[index];
    }

    return result;
}

/**
 * Encode a string in Base128 (converting from string to binary)
 * @param {string} input - Input string
 * @returns {string} - The string encoded in Base128
 */
function stringToBase128(input) {
    const encoder = new TextEncoder(); // UTF-8 encoding
    const data = encoder.encode(input);
    return encodeBase128(data);
}

// Example usage
const inputString = process.env.INPUT;
const encodedString = stringToBase128(inputString);
console.log("Input:", inputString);
console.log("Encoded:", encodedString);
