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
 * Decode Base128 encoded string to binary data
 * @param {string} encoded - The Base128 encoded string
 * @returns {Uint8Array} - Decoded binary data
 */
function decodeBase128(encoded) {
    let bitBuffer = 0;
    let bitCount = 0;
    let result = [];

    for (let char of encoded) {
        let index = base128Table.indexOf(char); // Get the index of the character in the Base128 table
        if (index === -1) {
            throw new Error("Invalid character in Base128 encoded string.");
        }

        bitBuffer = (bitBuffer << 7) | index; // Add 7 bits from the index
        bitCount += 7;

        // Extract full bytes (8 bits) from the bit buffer
        while (bitCount >= 8) {
            bitCount -= 8;
            let byte = (bitBuffer >> bitCount) & 0xFF;
            result.push(byte);
        }
    }

    return new Uint8Array(result);
}

/**
 * Decode Base128 encoded string back to the original string
 * @param {string} encoded - The Base128 encoded string
 * @returns {string} - The original decoded string
 */
function base128ToString(encoded) {
    const decodedData = decodeBase128(encoded);
    const decoder = new TextDecoder("utf-8"); // UTF-8 decoding
    return decoder.decode(decodedData);
}

// Example usage
const encodedString = "┻┳╙╮"; // Use the Base128-encoded string you want to decode
const decodedString = base128ToString(encodedString);
console.log("Decoded:", decodedString);
