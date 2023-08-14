import { Faker } from "@faker-js/faker";

export type Citizen = {
  index: number;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

export type Region = {
  hasMiddleName: boolean;
  faker: Faker;
  alphabet: string[];
  label: string;
};

export type ChangableElements = "firstName" | "middleName" | "lastName" | "address" | "phoneNumber";
