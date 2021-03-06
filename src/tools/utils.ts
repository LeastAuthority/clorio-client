import { VALIDATORS_TABLE_ITEMS_PER_PAGE } from "./const/transactions";
import Big from "big.js";
import {
  DEFAULT_VALID_UNTIL_FIELD,
  TRANSACTIONS_TABLE_ITEMS_PER_PAGE,
  MINIMUM_FEE,
} from "./const";
import { toNanoMINA } from "./mina";

export const copyToClipboard = (content = "") => {
  const el = document.createElement("textarea");
  el.value = content;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

/**
 * Set the class to show the error message "Smaller screen support is coming soon"
 */
export const initHtmlElements = () => {
  document.getElementsByClassName("show-on-load")[0].className = "show-mob";
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.style.display = "none";
  }
};

/**
 * Check if the object is empty
 * @param object
 * @returns boolean
 */
export const isEmptyObject = (objectToCheck: any) => {
  return (
    objectToCheck &&
    Object.entries(objectToCheck).length === 0 &&
    objectToCheck.constructor === Object
  );
};

export const toBTC = (amount: number) => {
  return Big(amount).mul(1e-9).toFixed(3);
};

export const getDefaultValidUntilField = () => {
  return DEFAULT_VALID_UNTIL_FIELD;
};

/**
 * Get the number of the transactions table and validators table pages based on the total number of elements
 * @returns Number
 */
export const getTotalPages = (totalItems = 0, transactions = true) => {
  const itemsPerPage = transactions
    ? TRANSACTIONS_TABLE_ITEMS_PER_PAGE
    : VALIDATORS_TABLE_ITEMS_PER_PAGE;
  const halfItemsPerPage = itemsPerPage / 2;
  if (totalItems) {
    const pages = (totalItems / itemsPerPage).toFixed(0);
    if (
      totalItems % itemsPerPage < halfItemsPerPage &&
      totalItems % itemsPerPage !== 0
    ) {
      return parseInt(pages) === 0 ? 1 : parseInt(pages) + 1;
    }
    return parseInt(pages) === 0 ? 1 : pages;
  }
  return 1;
};

/**
 * Calculate page from the offset
 * @param {number} offset
 * @returns number
 */
export const getPageFromOffset = (offset = 0) => {
  return offset / TRANSACTIONS_TABLE_ITEMS_PER_PAGE + 1;
};

/**
 * Check if the fee is greater than the minimum
 * @param fee number
 * @returns boolean
 */
export const feeGreaterThanMinimum = (fee: number) => {
  if (fee) {
    const feeToSend = toNanoMINA(fee);
    const feeMinusMinimum = +Big(feeToSend).sub(MINIMUM_FEE);
    if (feeMinusMinimum >= 0) {
      return true;
    }
  }
  return false;
};

export const isDevnet = () => {
  return process.env.REACT_APP_NETWORK === "devnet";
};
