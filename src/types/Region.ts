import { Region } from "../types/types";
import { fakerEN_US, fakerPL, fakerKA_GE } from "@faker-js/faker";

export const regions: Record<string, Region> = {
  US: {
    hasMiddleName: true,
    faker: fakerEN_US,
    alphabet: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    label: "United States",
  },
  PL: {
    hasMiddleName: false,
    faker: fakerPL,
    alphabet: "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(""),
    label: "Poland",
  },
  GE: {
    hasMiddleName: false,
    faker: fakerKA_GE,
    alphabet: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split(""),
    label: "Georgia",
  },
};
