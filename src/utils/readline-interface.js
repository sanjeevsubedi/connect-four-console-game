import readline from "readline";

/**
 * helper function to handle input and output stream
 */
export default function getReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}
