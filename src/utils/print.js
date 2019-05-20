/**
 * helper function to print the output
 */
export default function print(content, clear = false, space = false) {
  if (clear) {
    console.clear();
  }
  if (space) {
    process.stdout.cursorTo(20);
  }
  return console.log(content);
}
