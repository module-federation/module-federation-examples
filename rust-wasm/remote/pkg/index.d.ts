/* tslint:disable */
/* eslint-disable */
/**
 * @param {string} string
 */
export function greet(string: string): void;
/**
 */
export function main_js(): void;
/**
 */
export enum Cell {
  Dead,
  Alive,
}
/**
 */
export class Universe {
  free(): void;
  /**
   * @returns {Universe}
   */
  static new(): Universe;
  /**
   */
  tick(): void;
  /**
   */
  reset(): void;
  /**
   * @returns {string}
   */
  render(): string;
}
