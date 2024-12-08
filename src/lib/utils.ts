import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials!";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again!";
    case ResultCode.UserAlreadyExists:
      return "User already exists, please log in!";
    case ResultCode.UserCreated:
      return "User created, welcome!";
    case ResultCode.UnknownError:
      return "Something went wrong, please try again!";
    case ResultCode.UserLoggedIn:
      return "Logged in!";
  }
};

export function formatTVL(num: number): string {
  if (num === 0) return "0";
  const absNum = Math.abs(num);

  if (absNum >= 1_000_000) {
    const millions = Math.floor((num / 1_000_000) * 100) / 100;
    return `${millions.toFixed(2)}M`;
  }

  if (absNum >= 1_000) {
    const thousands = Math.floor((num / 1_000) * 100) / 100;
    return `${thousands.toFixed(2)}K`;
  }

  return num.toFixed(2);
}

export function formatPercentage(numStr: string | number): string {
  const num = typeof numStr === "string" ? parseFloat(numStr) : numStr;

  if (isNaN(num)) return "-";

  return `${num.toFixed(2)}%`;
}

export function toPercentage (value: number): string {
  const percentage = (value * 100).toFixed(2); 
  return `${percentage}%`;
};


export function getChainName(chainId: number | string): string {
  // Convert string chainId to a number, handling hex or decimal formats
  const id =
    typeof chainId === "string"
      ? chainId.startsWith("0x")
        ? parseInt(chainId, 16)
        : parseInt(chainId, 10)
      : chainId;

  const chainIdToNames: { [key: number]: string[] } = {
    1: ["Ethereum", "MAINNET"],
    56: ["Binance Smart Chain Mainnet", "BSC Mainnet"],
    97: ["Binance Smart Chain Testnet", "BSC Testnet"],
    43114: ["Avalanche C-Chain Mainnet", "Avalanche Mainnet"],
    43113: ["Avalanche Fuji Testnet", "Avalanche Testnet"],
    42161: ["Arbitrum One", "Arbitrum", "ARBITRUM"],
    421613: ["Arbitrum Goerli Testnet", "Arbitrum Goerli"],
    10: ["Optimism", "Optimism Mainnet","OPTIMISM"],
    420: ["Optimism Goerli Testnet", "Optimism Testnet"],
    250: ["Fantom Opera", "Fantom Mainnet"],
    4002: ["Fantom Testnet", "Fantom Testnet"],
    100: ["Gnosis Chain (xDai)", "xDai"],
    8453: ["Base", "Base Layer","BASE"],
  };

  const names = chainIdToNames[id];

  return names ? names[0] : "Unknown Chain";
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}


