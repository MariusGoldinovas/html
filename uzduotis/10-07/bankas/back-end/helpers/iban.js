// Function to generate a random 11-digit account number
export const generateRandomAccountNumber = () => {
  return Math.floor(10000000000 + Math.random() * 90000000000).toString(); // Generate 11-digit random account number
};

export const generateRandomBankCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Random 5-digit bank code
};

export const generateLithuanianIBAN = (bankCode, accountNumber) => {
  const countryCode = "LT";

  // Placeholder IBAN with "00" as check digits
  let ibanWithoutCheckDigits = `${countryCode}00${bankCode}${accountNumber}`;

  // Convert characters to integers for IBAN check digit calculation
  const numericIBAN =
    ibanWithoutCheckDigits
      .split("")
      .map((char) =>
        isNaN(char) ? (char.charCodeAt(0) - 55).toString() : char
      ) // Convert letters to numbers, keep digits as is
      .join("") + "271500"; // Append country code as numbers (LT = 2715)

  // Convert to BigInt for modulus operation
  const ibanBigInt = BigInt(numericIBAN);

  // Calculate check digits
  const checkDigits = (98n - (ibanBigInt % 97n)).toString();

  // Return the final IBAN with check digits
  return `${countryCode}${checkDigits.padStart(
    2,
    "0"
  )}${bankCode}${accountNumber}`;
};
