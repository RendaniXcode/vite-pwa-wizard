export interface Location {
  province: string;
  metro: string;
  neighborhood: string;
}

export interface LocationData {
  [province: string]: {
    [metro: string]: string[];
  };
}

export const locationData: LocationData = {
  "Gauteng": {
    "City of Johannesburg": [
      "Alexandra",
      "Diepsloot",
      "Orlando East",
      "Orlando West", 
      "Zola",
      "Dobsonville",
      "Meadowlands",
      "Kliptown",
      "Protea Glen",
      "Lenasia",
      "Roodepoort",
      "Randburg",
      "Sandton",
      "Midrand",
      "Fourways",
      "Rosebank",
      "Melville",
      "Braamfontein",
      "Hillbrow",
      "Yeoville"
    ],
    "City of Tshwane": [
      "Mamelodi",
      "Soshanguve",
      "Hammanskraal",
      "Atteridgeville",
      "Ga-Rankuwa",
      "Mabopane",
      "Centurion",
      "Pretoria Central",
      "Hatfield",
      "Menlyn",
      "Arcadia",
      "Brooklyn",
      "Waterkloof",
      "Silverton",
      "Laudium"
    ],
    "Ekurhuleni": [
      "Tembisa",
      "Katlehong",
      "Tokoza",
      "Vosloorus",
      "Thokoza",
      "Kempton Park",
      "Edenvale",
      "Germiston",
      "Boksburg",
      "Benoni",
      "Springs",
      "Daveyton",
      "Duduza",
      "Wattville",
      "Ivory Park"
    ],
    "Sedibeng": [
      "Sebokeng",
      "Evaton",
      "Orange Farm",
      "Boipatong",
      "Sharpeville",
      "Vanderbijlpark",
      "Vereeniging",
      "Sasolburg",
      "Heidelberg"
    ],
    "West Rand": [
      "Kagiso",
      "Munsieville",
      "Bekkersdal",
      "Westonaria",
      "Randfontein",
      "Krugersdorp",
      "Carletonville",
      "Potchefstroom"
    ]
  },
  "Western Cape": {
    "City of Cape Town": [
      "Khayelitsha",
      "Mitchells Plain",
      "Gugulethu",
      "Langa",
      "Nyanga",
      "Philippi",
      "Delft",
      "Mfuleni",
      "Strand",
      "Somerset West",
      "Bellville",
      "Parow",
      "Goodwood",
      "Cape Town CBD",
      "Sea Point",
      "Camps Bay",
      "Observatory",
      "Woodstock",
      "Salt River",
      "Athlone"
    ]
  },
  "KwaZulu-Natal": {
    "eThekwini": [
      "Umlazi",
      "KwaMashu",
      "Inanda",
      "Ntuzuma",
      "Chatsworth",
      "Phoenix",
      "Lamontville",
      "Clerwood",
      "Durban Central",
      "Pinetown",
      "Westville",
      "Umhlanga",
      "Amanzimtoti",
      "Queensburgh"
    ]
  }
};

export const getMetros = (province: string): string[] => {
  return Object.keys(locationData[province] || {});
};

export const getNeighborhoods = (province: string, metro: string): string[] => {
  return locationData[province]?.[metro] || [];
};

export const getProvinces = (): string[] => {
  return Object.keys(locationData);
};