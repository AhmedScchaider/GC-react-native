import * as SecureStore from "expo-secure-store";
import {
  dayToTimeStampMultiplier,
  isTrueOrFalseString,
  keys,
  mainURL,
  ticket_owner,
} from "../constants/constants";
import dayjs, { Dayjs } from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { tokenHeader } from "./auth-header";

declare module "dayjs" {
  interface Dayjs {
    dayOfYear(): number;
  }
}

dayjs?.extend(dayOfYear);
function checkDate(date: any) {
  return date
    ? date?.includes("/")
      ? dateToNumber__Slash(date)
      : dateToNumber__Minus(date)
    : "1/1";
}

function dateToNumber__Slash(date: any) {
  return (
    Number(date.toString().split("/")[0]) +
    Number(date.toString().split("/")[1]) * 60 +
    Number(date.toString().split("/")[2]) * 400
  );
}
function dateToNumber__Minus(date: any) {
  return (
    Number(date.toString().split("-")[2]) +
    Number(date.toString().split("-")[1]) * 60 +
    Number(date.toString().split("-")[0]) * 400
  );
}
export function sortCategories(category: any) {
  return category.reduce((sorted: any, oneCategory: any) => {
    let index = 0;

    while (
      index < sorted.length &&
      checkDate(oneCategory?.categoryExtraFields?.sortie) >
        checkDate(sorted[index]?.categoryExtraFields?.sortie)
    )
      index++;
    sorted.splice(index, 0, oneCategory);
    return sorted;
  }, []);
}

// export function GraphCMSImageLoader({ src:any, width:any, quality:any }) {
// 	const relativeSrc = (src:any) => src.split("/").pop();
// 	return `${src}?w=${width}&q=${quality || 75}`;
// }

export function sortCards(cards: any) {
  return cards.reduce((sorted: any, oneCard: any) => {
    let index = 0;

    while (
      index < sorted.length &&
      Number(
        oneCard?.node?.productExtraFields?.orderNumber.replace(/\D/g, ""),
      ) >
        Number(
          sorted[index]?.node?.productExtraFields?.orderNumber.replace(
            /\D/g,
            "",
          ),
        )
    )
      index++;
    sorted.splice(index, 0, oneCard);
    return sorted;
  }, []);
}

export function generateInvoice(orderId: any, orderKey: any) {
  return (
    "https://phoenixgrade.com/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&template_type=invoice&order_ids=" +
    orderId +
    "&order_key=" +
    orderKey
  );
}

export function generateBordoreau(orderId: any, orderKey: any) {
  return (
    "https://phoenixgrade.com/wp-admin/admin-ajax.php?action=generate_wpo_wcpdf&template_type=packing-slip&order_ids=" +
    orderId +
    "&order_key=" +
    orderKey
  );
}
export function isThereDelivaryFee(cardsOptions: any, delivaryFee: any) {
  return (
    (cardsOptions?.reduce(
      (sum: any, oneCardOptions: any) => sum + oneCardOptions?.calculatedValue,
      0,
    ) < 100
      ? delivaryFee
      : 0) + ".00 €"
  );
}
export function totalCalculation(cardsOptions: any, delivaryFee: any) {
  return (
    cardsOptions?.reduce(
      (sum: any, oneCardOptions: any) => sum + oneCardOptions?.calculatedValue,
      0,
    ) +
    (cardsOptions?.reduce(
      (sum: any, oneCardOptions: any) => sum + oneCardOptions?.calculatedValue,
      0,
    ) < 100
      ? delivaryFee
      : 0) +
    ".00 €"
  );
}

export function TVACalculation(
  cardsOptions: any,
  delivaryFee: any,
  TVAValue: any,
) {
  return (
    priceToNumber(totalCalculation(cardsOptions, delivaryFee)) -
    priceToNumber(totalCalculation(cardsOptions, delivaryFee)) / (1 + TVAValue)
  ).toFixed(2);
}

export function priceToString(price: any) {
  return price + ".00 €";
}
export function priceToNumber(price: any) {
  return Number(price.split(".")[0]);
}

export function storeToLocalStorage(data: any) {
  storeSecureData(keys.USER_DATA, data);
  storeSecureData(keys.TOKEN, data?.token);
}

export function storeNewToken(data: any) {
  storeSecureData(keys.USER_DATA, data);
  storeSecureData(keys.REFRESH_TOKEN, data?.refreshToken);
  storeSecureData(keys.TOKEN, data?.data?.token);
}

export function dateFormat(date: any) {
  if (date != undefined && typeof date == "string" && date?.includes("T")) {
    return (
      date?.split("T")[0]?.split("-")[2] +
      "/" +
      date?.split("T")[0]?.split("-")[1] +
      "/" +
      date?.split("T")[0]?.split("-")[0]
    );
  } else {
    return (
      date?.toISOString()?.split("T")[0]?.split("-")[2] +
      "/" +
      date?.toISOString()?.split("T")[0]?.split("-")[1] +
      "/" +
      date?.toISOString()?.split("T")[0]?.split("-")[0]
    );
  }
}

export const getFormData = async (object: any) => {
  let formData = new FormData();
  await Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export const variants = {
  enter: (direction: any) => {
    return {
      x: direction > 0 ? 0 : 0,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: any) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 0 : 0,
      opacity: 0,
    };
  },
};
export const divisionToInteger = (number: any) => {
  return (number + 1) / 4 - (((number + 1) / 4) % 1);
};

export const getAdress = (data: any) => {
  return data?.split('adress":')[1]?.replaceAll('"', "")?.replaceAll("}", "");
};

export const handleFilterArrayFromArrayFalseIfEmpty = (
  arr1: any[],
  arr2: any[],
) => {
  return arr1?.map((oneItem: any) => {
    return {
      ...oneItem,
      ArticleProduit: arr2?.find((oneFound: any) => oneFound?.ID == oneItem?.ID)
        ?.ArticleProduit,
      ArticleMatierePremiere: arr2?.find(
        (oneFound: any) => oneFound?.ID == oneItem?.ID,
      )?.ArticleMatierePremiere,
      RestorentPlateOptionInputs: arr2?.find(
        (oneFound: any) => oneFound?.ID == oneItem?.ID,
      )?.RestorentPlateOptionInputs,
    };
  });
};
export const handleFilterArrayFromArrayFalseIfEmpty_fk = (
  arr1: any[],
  arr2: any[],
  fk_1?: string,
  fk_2?: string,
) => {
  return arr1?.filter((oneFilteredItem: any) =>
    arr2?.length > 0
      ? arr2
          ?.map((oneMappedItem: any) => oneMappedItem[fk_2 ? fk_2 : "ID"])
          ?.indexOf(oneFilteredItem[fk_1 ? fk_1 : "ID"]) < 0
      : false,
  );
};
export const handleFilterArrayFromArray = (
  arr1: any[],
  arr2: any[],
  foregnKey?: string,
) => {
  return arr1?.filter((oneFilteredItem: any) =>
    arr2?.length > 0
      ? arr2
          ?.map(
            (oneMappedItem: any) => oneMappedItem[foregnKey ? foregnKey : "ID"],
          )
          ?.indexOf(oneFilteredItem?.ID) < 0
      : true,
  );
};

export const getUnitsSameType = (
  units: any,
  objectUnit: any,
  unitTypes: any,
  selectedObject: any,
) => {
  return units
    ?.filter(
      (oneItem: any) =>
        oneItem?.ID != objectUnit?.ID &&
        oneItem?.UnitTypeID == objectUnit?.UnitTypeID,
    )
    ?.map((oneItem: any) => {
      return {
        UnitID: oneItem?.ID,
        Unit: oneItem,
        UnitType: unitTypes?.find(
          (oneFoundItem: any) => oneFoundItem?.ID == objectUnit?.UnitTypeID,
        ),
        UnitTypeID: objectUnit?.UnitTypeID,
        report: selectedObject?.UnitReports?.find(
          (oneItemFound: any) => oneItemFound?.UnitToID == oneItem?.UnitToID,
        )?.report,
      };
    });
};

export function getTime(date?: Date) {
  return date != undefined ? date.getTime() : new Date().getTime();
}

export function sortByCreation(arr: any[]) {
  return arr?.sort((a: any, b: any) => {
    return a.ID - b.ID;
  });
}

export function getOpenedTickets(tickets: any) {
  return tickets?.filter((oneItem: any) => oneItem?.is_terminated == false);
}
export function findClientConventionPrice(
  clients: any[],
  clientID: any,
  RoomCapacity: any,
) {
  return (
    clients
      ?.find((oneClient: any) => oneClient?.ID == clientID)
      ?.ClientConventions?.find(
        (oneFoundConvention: any) =>
          oneFoundConvention?.RoomCapacityID == RoomCapacity?.ID,
      )?.prix_ttc ?? RoomCapacity?.prix_ttc
  );
}
export function getStayDiffInDays(date_1: any, date_2: any) {
  return Number(dayjs(date_1)?.dayOfYear() - dayjs(date_2)?.dayOfYear()) < 7
    ? Number(dayjs(date_1)?.dayOfYear() - dayjs(date_2)?.dayOfYear())
    : 7;
}
export function getDiffInDays(date_1: any, date_2: any) {
  return Number(dayjs(date_1)?.dayOfYear() - dayjs(date_2)?.dayOfYear());
}
export function compareDays(date_1: any, date_2: any) {
  return dayjs(date_1)?.dayOfYear() > dayjs(date_2)?.dayOfYear();
}

const unitsFrensh = [
  "",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
];
const teensFrensh = [
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix-sept",
  "dix-huit",
  "dix-neuf",
];
const tensFrensh = [
  "",
  "dix",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "soixante-dix",
  "quatre-vingt",
  "quatre-vingt-dix",
];
const inWordsFrensh = (num: any): any => {
  if (num < 10) return unitsFrensh[num] as any;
  if (num < 20) return teensFrensh[num - 11] as any;
  if (num < 100) {
    const remainder = num % 10;
    return (tensFrensh[Math.floor(num / 10)] +
      (remainder !== 0 ? `-${unitsFrensh[remainder]}` : "")) as any;
  }
  if (num < 1000)
    return (unitsFrensh[Math.floor(num / 100)] +
      " cent" +
      (num % 100 !== 0 ? ` ${inWordsFrensh(num % 100)} ` : "")) as any;
  if (num < 1000000)
    return (inWordsFrensh(Math.floor(num / 1000)) +
      " dinars" +
      (num % 1000 !== 0
        ? ` ${inWordsFrensh(num % 1000)}`
        : " et zero millimes")) as any;
};

const unitsEnglish = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const teensEnglish = [
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tensEnglish = [
  "",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const inWordsEnglish = (num: any): any => {
  if (num < 10) return unitsEnglish[num];
  if (num < 20) return teensEnglish[num - 11];
  if (num < 100)
    return (
      tensEnglish[Math.floor(num / 10)] +
      (num % 10 !== 0 ? ` ${unitsEnglish[num % 10]}` : "")
    );
  if (num < 1000)
    return (
      unitsEnglish[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 !== 0 ? ` ${inWordsEnglish(num % 100)}` : "")
    );
  if (num < 1000000)
    return (
      inWordsEnglish(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 !== 0 ? ` ${inWordsEnglish(num % 1000)}` : "")
    );
};
export const convertNumberToWordsFrench = (number: any): any => {
  if (number === 0) {
    return "Zéro";
  }

  return inWordsFrensh(number);
};

export const convertNumberToWordsEnglish = (number: any): any => {
  if (number === 0) {
    return "Zero";
  }

  return inWordsEnglish(number);
};
export const toIsoStringDate = (isoDate: string) => {
  return (
    isoDate?.split("T")[0]?.split("-")[0] +
    "-" +
    (Number(isoDate?.split("T")[0]?.split("-")[1]) + 1) +
    "-" +
    isoDate?.split("T")[0]?.split("-")[2]
  );
};
export const invoiceDetailsSejour = (object: any[], roomCapacity: any) => {
  return Number(
    (object ?? [])?.reduce(
      (sum: any, oneRoomInput: any) =>
        sum +
        (oneRoomInput?.prix_ttc > 0
          ? oneRoomInput?.prix_ttc
          : Number(
              object[0]?.RoomReservation?.Client?.ClientConventions?.find(
                (oneClientConvention: any) =>
                  oneClientConvention?.RoomCapacityID ==
                  oneRoomInput?.RoomCapacityID,
              )?.prix_ttc ??
                roomCapacity?.find(
                  (oneRoomCapacity: any) =>
                    oneRoomCapacity?.ID == oneRoomInput?.RoomCapacityID,
                )?.prix_ttc,
            )),
      0,
    ),
  );
};
export const getDevisTotalTVA = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getDevisTotalHT(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate,
    ) *
    ((1 + 0.01) * 0.07)
  )?.toFixed(3);
};
export const getTotalTVA = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getTotalHT(selectedObject, selectedRoomsInput, object, client, startDate) *
    ((1 + 0.01) * 0.07)
  )?.toFixed(3);
};
export const getDevisTotalFaudec = (
  object: any,
  selectedRoomsInput: any,
  selectedObject: any,
  client: any,
  startDate: any,
) => {
  return (
    getDevisTotalHT(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate,
    ) * 0.01
  ).toFixed(3);
};
export const getTotalFaudec = (
  object: any,
  selectedRoomsInput: any,
  selectedObject: any,
  client: any,
  startDate: any,
) => {
  return (
    getTotalHT(selectedObject, selectedRoomsInput, object, client, startDate) *
    0.01
  ).toFixed(3);
};

export const getReducedTicketInputFromTicket = (ticketInputs: any[]) => {
  return Number(
    ticketInputs?.reduce(
      (sum: any, oneReducedTicketInput: any) =>
        (oneReducedTicketInput?.prix_total == 0
          ? oneReducedTicketInput?.ArticleProduit?.prix_ttc
          : oneReducedTicketInput?.prix_total) *
          (1 - oneReducedTicketInput?.remise / 100) +
        sum,
      0,
    ),
  );
};

export const getTotalInvoiceTicketOnCard = (object: any, oneItem: any) => {
  return Array.isArray(object?.TicketInvoiceInputs)
    ? getReducedTicketInputFromTicket(
        object?.TicketInvoiceInputs?.map((oneMapped: any) =>
          oneMapped?.Ticket?.TicketInputs?.map((oneTicketInputMapped: any) => {
            return {
              ...oneTicketInputMapped,
              remise:
                oneMapped?.Ticket?.prix_ttc > 700
                  ? oneMapped?.Ticket?.ReductionFormRestorant?.value == 0
                    ? oneMapped?.Ticket?.ClientVerriere?.remise
                    : oneMapped?.Ticket?.ReductionFormRestorant?.value
                  : 0,
            };
          }),
        )
          .flat()
          ?.filter((oneFilteredTicletInput: any) =>
            oneItem?.ID
              ? oneFilteredTicletInput?.ArticleProduit?.ArticleTypeID ==
                oneItem?.ID
              : true,
          ),
      )
    : // ?.reduce((sum: any, oneReducedTicketInput: any) => oneReducedTicketInput?.ArticleProduit?.prix_ttc * (1 - (oneReducedTicketInput?.remise / 100)) + sum, 0)
      0;
};
export const getRoomCapacityPriceReduction = (roomInput: any) => {
  return roomInput?.prix_ttc > 0
    ? roomInput?.prix_ttc
    : (roomInput?.RoomReservation?.Client?.ClientConventions?.find(
        (oneConvention: any) =>
          oneConvention?.RoomCapacityID == roomInput?.RoomCapacityID,
      )?.prix_ttc ?? roomInput?.RoomCapacity?.prix_ttc);
};
export const getTotalInvoiceRoomAllocation = (object: any) => {
  return object?.RoomInputInvoiceInputs?.reduce(
    (sum: any, oneMapped: any) =>
      getRoomCapacityPriceReduction(oneMapped?.RoomInput) *
        getDiffInDays(
          oneMapped?.RoomInput?.date_out_is_cloturee ==
            "0001-01-01T01:00:00+01:00"
            ? new Date()
            : oneMapped?.RoomInput?.date_out_is_cloturee,
          oneMapped?.RoomInput?.RoomReservation?.date_in,
        ) +
      sum,
    0,
  );
};
export function checkIsArray(array: any[]) {
  return Array.isArray(array) ? array : [];
}
export const getTotalInvoiceTicket = (object: any, oneItem: any) => {
  return getReducedTicketInputFromTicket(
    checkIsArray(object?.RoomInputInvoiceInputs)
      ?.map((oneMapped: any) =>
        checkIsArray(oneMapped?.RoomInput?.TicketRoomInputInputs)?.map(
          (oneMappedTicketRoomInput: any) =>
            checkIsArray(oneMappedTicketRoomInput?.Ticket?.TicketInputs)
              ?.filter((oneFilteredTicletInput: any) =>
                oneItem?.ID
                  ? oneFilteredTicletInput?.ArticleProduit?.ArticleTypeID ==
                    oneItem?.ID
                  : true,
              )
              ?.map((oneMappedTicket: any) => {
                return {
                  ...oneMappedTicket,
                  remise:
                    oneMappedTicketRoomInput?.Ticket?.ReductionFormRestorant
                      ?.value == 0
                      ? oneMappedTicketRoomInput?.Ticket?.ClientVerriere?.remise
                      : oneMapped?.Ticket?.ReductionFormRestorant?.value,
                };
              }),
        ),
      )
      ?.flat()
      ?.flat(),
  );
};
export const getTotalTicketEachType = (object: any[], oneItem: any) => {
  return (
    getReducedTicketInputFromTicket(
      (
        object?.map((oneMappedItem: any) => oneMappedItem?.Tickets)?.flat() ??
        []
      )
        ?.map((oneTicketInput: any) => oneTicketInput?.TicketInputs)
        ?.flat()
        ?.filter(
          (oneFiltered: any) =>
            oneFiltered?.ArticleProduit?.ArticleTypeID == oneItem?.ID,
        ) ?? [],
    ) +
    // ?.reduce((sum: any, onePrice: any) => sum + onePrice?.ArticleProduit?.prix_ttc, 0)
    (oneItem?.description == "Repas"
      ? object?.reduce(
          (sum: any, oneItem_: any) =>
            (oneItem_?.is_there_repas == isTrueOrFalseString.TRUE
              ? oneItem_?.prix_repas * (oneItem_?.SubClientInputs?.length ?? 0)
              : 0) + sum,
          0,
        )
      : 0)
  )?.toFixed(3);
};
export const getTotalInvoiceTicketEachTypeOneDay = (
  object: any,
  oneItem: any,
) => {
  return (
    getReducedTicketInputFromTicket(
      (
        object?.map((oneMappedItem: any) => oneMappedItem?.Tickets)?.flat() ??
        []
      )
        ?.map((oneTicketInput: any) => oneTicketInput?.TicketInputs)
        ?.flat()
        ?.filter(
          (oneFiltered: any) =>
            oneFiltered?.ArticleProduit?.ArticleTypeID == oneItem?.ID,
        ) ?? [],
    ) +
    // ?.reduce((sum: any, onePrice: any) => sum + onePrice?.ArticleProduit?.prix_ttc, 0)
    (oneItem?.description == "Repas"
      ? object?.reduce(
          (sum: any, oneItem_: any) =>
            (oneItem_?.is_there_repas == isTrueOrFalseString.TRUE
              ? oneItem_?.prix_repas * (oneItem_?.SubClientInputs?.length ?? 0)
              : 0) + sum,
          0,
        )
      : 0)
  )?.toFixed(3);
};
export const getTotalTicketInvoiceEachTypeOneDay = (
  object: any[],
  oneItem: any,
) => {
  return (
    getReducedTicketInputFromTicket(
      (
        object?.map((oneMappedItem: any) => oneMappedItem?.Tickets)?.flat() ??
        []
      )
        ?.map((oneTicketInput: any) => oneTicketInput?.TicketInputs)
        ?.flat()
        ?.filter(
          (oneFiltered: any) =>
            oneFiltered?.ArticleProduit?.ArticleTypeID == oneItem?.ID,
        ) ?? [],
    ) +
    // ?.reduce((sum: any, onePrice: any) => sum + onePrice?.ArticleProduit?.prix_ttc, 0)
    (oneItem?.description == "Repas"
      ? object?.reduce(
          (sum: any, oneItem_: any) =>
            (oneItem_?.is_there_repas == isTrueOrFalseString.TRUE
              ? oneItem_?.prix_repas * (oneItem_?.SubClientInputs?.length ?? 0)
              : 0) + sum,
          0,
        )
      : 0)
  )?.toFixed(3);
};
export const getTotalTicketEachTypeOneDay = (object: any[], oneItem: any) => {
  return (
    getReducedTicketInputFromTicket(
      (
        object?.map((oneMappedItem: any) => oneMappedItem?.Tickets)?.flat() ??
        []
      )
        ?.map((oneTicketInput: any) => oneTicketInput?.TicketInputs)
        ?.flat()
        ?.filter(
          (oneFiltered: any) =>
            oneFiltered?.ArticleProduit?.ArticleTypeID == oneItem?.ID,
        ) ?? [],
    ) +
    // ?.reduce((sum: any, onePrice: any) => sum + onePrice?.ArticleProduit?.prix_ttc, 0)
    (oneItem?.description == "Repas"
      ? object?.reduce(
          (sum: any, oneItem_: any) =>
            (oneItem_?.is_there_repas == isTrueOrFalseString.TRUE
              ? oneItem_?.prix_repas * (oneItem_?.SubClientInputs?.length ?? 0)
              : 0) + sum,
          0,
        )
      : 0)
  )?.toFixed(3);
};

export const getFamilleArticleReference = (
  description: string,
  arrayRefs: any[],
) => {
  return arrayRefs?.find(
    (oneItem: any) =>
      oneItem ==
      (description?.trim().includes(" ")
        ? description.split(" ")[0][0] +
          description.split(" ")[description.split(" ").length - 1][0]
        : description[0] + description[description.length - 1]
      ).toUpperCase(),
  ) == undefined
    ? getFamilleArticleRef(description, 1)
    : getFamilleArticleRef(description, 2);
};

const getFamilleArticleRef = (description: any, index: number) => {
  return (
    description?.trim().includes(" ")
      ? description.split(" ")[0][0] +
        description.split(" ")[description.split(" ").length - 1][index - 1]
      : description[0] + description[description.length - index]
  ).toUpperCase();
};
export function lpad(value: number, padding: number) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

export const concatinateRoomInputs = (
  selectedObject: any,
  selectedRoomsInput: any[],
) => {
  return selectedRoomsInput ?? [];
};
export const getDevisTaxSejoursPrice = (
  selectedObject: any,
  selectedRoomsInput: any[],
) => {
  return concatinateRoomInputs(selectedObject, selectedRoomsInput)
    ?.map((oneItem: any) => oneItem?.SubClientInputs)
    ?.flat()
    ?.map(
      (oneMappedItem: any) =>
        oneMappedItem?.SubClient?.Nationality?.NationalityType?.prixTaxSejours,
    )
    ?.reduce((sum: number, oneItem: number) => sum + oneItem, 0);
};
export const getTaxSejoursPrice = (selectedRoomsInput: any[]) => {
  return selectedRoomsInput
    ?.map((oneItem: any) => oneItem?.SubClientInputs)
    ?.flat()
    ?.map(
      (oneMappedItem: any) =>
        oneMappedItem?.SubClient?.Nationality?.NationalityType?.prixTaxSejours,
    )
    ?.reduce((sum: number, oneItem: number) => sum + oneItem, 0);
};
export const getClientNumber = (
  selectedObject: any,
  selectedRoomsInput: any[],
) => {
  return concatinateRoomInputs(selectedObject, selectedRoomsInput)
    ?.map((oneItem: any) => oneItem?.SubClientInputs)
    ?.flat()
    ?.map(
      (oneMappedItem: any) =>
        oneMappedItem?.SubClient?.Nationality?.NationalityType?.prixTaxSejours,
    )?.length;
};
export const checkIfConventionDevis = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
) => {
  return (
    concatinateRoomInputs(selectedObject, selectedRoomsInput)?.reduce(
      (sum: any, item: any) =>
        findClientConventionPrice(
          client.data,
          selectedObject?.ID
            ? selectedObject?.RoomReservation?.ClientID
            : object?.ClientID,
          item?.RoomCapacity,
        ) + sum,
      0,
    ) ?? 0
  );
};
export const checkIfConvention = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
) => {
  return (
    concatinateRoomInputs(selectedObject, selectedRoomsInput)?.reduce(
      (sum: any, item: any) =>
        findClientConventionPrice(
          client.data,
          selectedObject?.ID
            ? selectedObject?.RoomReservation?.ClientID
            : object?.ClientID,
          item?.RoomCapacity,
        ) + sum,
      0,
    ) ?? 0
  );
};
export const getDevisTotalHT = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getDevisTotalTTC(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate ?? dayjs(),
    ) / 1.0807
  );
};
export const getTotalHT = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getRoomReservationTotalTTC(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate ?? dayjs(),
    ) / 1.0807
  );
};

export const getDevisStayTax = (
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getStayDiffInDays(object?.date_out, object?.date_in ?? startDate) *
    selectedRoomsInput
      ?.map((oneItem: any) =>
        oneItem?.NationalityTypeInputs?.map((oneNationalityType: any) => {
          return { ...oneNationalityType, roomQuantity: oneItem?.quantity };
        }),
      )
      .flat()
      ?.reduce(
        (sum: any, oneMappedItem: any) =>
          (oneMappedItem?.NationalityType?.prixTaxSejours ?? 0) *
            Number(oneMappedItem?.quantity) *
            Number(oneMappedItem?.roomQuantity) +
          sum,
        0,
      )
  ).toFixed(3);
};
export const getStayTax = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getStayDiffInDays(
      object?.date_out /* selectedObject?.RoomReservation?.date_out*/,
      object?.date_in /*?? selectedObject?.RoomReservation?.date_in ?? */ ??
        startDate,
    ) * getTaxSejoursPrice(selectedRoomsInput)
  ).toFixed(3);
};
export const getDevisTotalTTC = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    (selectedRoomsInput?.reduce(
      (sum: any, onePrice: any) =>
        onePrice?.prix_ttc * onePrice?.quantity + sum,
      0,
    ) +
      selectedRoomsInput?.reduce(
        (sum: any, oneRepas: any) =>
          (oneRepas?.is_there_repas == isTrueOrFalseString.TRUE
            ? oneRepas?.person_quantity * oneRepas?.prix_repas
            : 0) + sum,
        0,
      )) *
    getDiffInDays(
      object?.date_out ?? selectedObject?.RoomReservation?.date_out,
      object?.date_in ?? selectedObject?.RoomReservation?.date_in ?? startDate,
    ) /* *
	checkIfConventionDevis(selectedObject, selectedRoomsInput, object, client) */
  );
};
export const getRoomReservationInvoiceTotalTTC = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    (selectedRoomsInput?.reduce(
      (sum: any, oneCapacityPrice: any) =>
        (client?.ClientConventions?.find(
          (oneConvention: any) => oneConvention?.RoomCapacityID,
        )?.prix_ttc == undefined
          ? oneCapacityPrice?.RoomCapacity?.prix_ttc
          : client?.ClientConventions?.find(
              (oneConvention: any) =>
                oneConvention?.RoomCapacityID ==
                oneCapacityPrice?.RoomCapacityID,
            )?.prix_ttc) + sum,
      0,
    ) +
      selectedRoomsInput?.reduce(
        (sum: any, oneRepasPrice: any) =>
          (oneRepasPrice?.is_there_repas == isTrueOrFalseString.TRUE
            ? oneRepasPrice?.prix_repas * oneRepasPrice?.SubClientInputs?.length
            : 0) + sum,
        0,
      )) *
    getDiffInDays(
      object?.date_out ?? selectedObject?.RoomReservation?.date_out,
      object?.date_in ?? selectedObject?.RoomReservation?.date_in ?? startDate,
    )
  );
};
export const getRoomReservationTotalTTC = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    selectedRoomsInput.reduce(
      (sum: any, oneReduced: any) =>
        (oneReduced?.prix_ttc > 0
          ? oneReduced?.prix_ttc
          : client?.ClientConventions?.find(
                (oneConvention: any) => oneConvention?.RoomCapacityID,
              )?.prix_ttc == undefined
            ? (oneReduced?.RoomCapacity?.prix_ttc ?? 0)
            : (client?.ClientConventions?.find(
                (oneConvention: any) =>
                  oneConvention?.RoomCapacityID == oneReduced?.RoomCapacityID,
              )?.prix_ttc ?? 0)) +
        (oneReduced?.is_there_repas == "true"
          ? ((oneReduced?.prix_repas ? Number(oneReduced?.prix_repas) : 0) ?? 0)
          : 0) *
          (oneReduced?.SubClientInputs?.length ?? 0) +
        sum,
      0,
    ) *
    getDiffInDays(
      object?.date_out ?? selectedObject?.RoomReservation?.date_out,
      object?.date_in ?? selectedObject?.RoomReservation?.date_in ?? startDate,
    )
  );
};
export const checkIfValidDate = (date: string) => {
  return date?.includes("/")
    ? `${date?.split("/")[2]}-${date?.split("/")[1]}-${date?.split("/")[0]}`
    : date;
};

export const checkIfCreationDate = (object: any) => {
  return object?.date_in?.includes("0001")
    ? new Date(checkIfValidDate(object?.CreatedAt)).toISOString()
    : object?.date_in;
};

export const getDevisRoomReduction = (object: any, roomCapacity: any) => {
  return (
    (1 -
      (checkIsArray(object.Client.ClientConventions)?.length > 0
        ? (checkIsArray(object.Client.ClientConventions)?.find(
            (oneConvention: any) =>
              oneConvention?.RoomCapacityID == roomCapacity?.ID,
          )?.prix_ttc_percent ?? 0)
        : 0) /
        100) *
    roomCapacity?.prix_ttc
  );
};

export const getDevisTotalNet = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getDevisTotalTTC(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate ?? dayjs(),
    ) +
    1 +
    Number(
      getDevisStayTax(selectedRoomsInput, object, client, startDate ?? dayjs()),
    )
  )?.toFixed(3);
};
export const getRoomReservationTotalNet = (
  selectedObject: any,
  selectedRoomsInput: any[],
  object: any,
  client: any,
  startDate: Dayjs,
) => {
  return (
    getRoomReservationTotalTTC(
      selectedObject,
      selectedRoomsInput,
      object,
      client,
      startDate ?? dayjs(),
    ) +
    1 +
    getTaxSejoursPrice(selectedRoomsInput) *
      getStayDiffInDays(
        object?.date_out ?? selectedObject?.RoomReservation?.date_out,
        object?.date_in ??
          selectedObject?.RoomReservation?.date_in ??
          startDate,
      )
  )?.toFixed(3);
};
export function getUniqueArray(arr: any[], index: any, innerIndex: any) {
  const unique = (Array.isArray(arr) == true ? arr : [])
    .map((e) => (e?.hasOwnProperty(index) ? e[index] : ""))

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e: any) => arr[e])
    .map((e: any) => arr[e]);

  return unique;
}
export function getUnique(arr: any[], index: any) {
  const unique =
    checkIsArray(arr).length > 0
      ? checkIsArray(arr)
          ?.map((e) => e[index])
          ?.map((e, i, final) => final.indexOf(e) === i && i)
          ?.filter((e: any) => arr[e])
          .map((e: any) => arr[e])
      : [];

  return unique;
}
export function getYear(date: any) {
  return Number(date?.split("T")[0]?.split("-")[0]);
}
export function getMonth(date: any) {
  return Number(date?.split("T")[0]?.split("-")[1]);
}
export function getDay(date: any) {
  return Number(date?.split("T")[0]?.split("-")[2]);
}
export function getDateMinusOneDay(date: any) {
  return new Date(
    dayjs()
      .dayOfYear(dayjs(date).dayOfYear() - 1)
      .toISOString(),
  );
}

export function getAchatTotalPrice(tickets: any[]) {
  return getUnique(
    tickets
      ?.map((oneTicket: any) => oneTicket?.TicketInputs)
      .flat()
      ?.map(
        (oneMapped: any) =>
          oneMapped?.ArticleProduit?.ArticleMatierePremiereInputs,
      )
      .flat(),
    "ArticleMatierePremiereID",
  )
    ?.map(
      (oneMappedUnique: any) =>
        tickets
          ?.map((oneTicket: any) => oneTicket?.TicketInputs)
          .flat()
          ?.map(
            (oneMapped: any) =>
              oneMapped?.ArticleProduit?.ArticleMatierePremiereInputs,
          )
          .flat()
          ?.find(
            (oneUniqueFiltered: any) =>
              oneUniqueFiltered?.ArticleMatierePremiereID ==
              oneMappedUnique.ArticleMatierePremiereID,
          )?.ArticleMatierePremiere?.prix_ttc *
        Number(
          tickets
            ?.map((oneTicket: any) => oneTicket?.TicketInputs)
            .flat()
            ?.map(
              (oneMapped: any) =>
                oneMapped?.ArticleProduit?.ArticleMatierePremiereInputs,
            )
            .flat()
            ?.filter(
              (oneUniqueFiltered: any) =>
                oneUniqueFiltered?.ArticleMatierePremiereID ==
                oneMappedUnique.ArticleMatierePremiereID,
            )
            ?.reduce(
              (sum: any, oneReducedUnique: any) =>
                (oneReducedUnique?.Unit?.UnitReports?.length > 0
                  ? oneReducedUnique?.Unit?.UnitReports[0]?.report
                  : 1) *
                  oneReducedUnique?.quantity +
                sum,
              0,
            ) /
            (oneMappedUnique?.ArticleMatierePremiere?.Unit?.abbreviation ==
            (oneMappedUnique?.Unit?.UnitReports?.length > 0
              ? oneMappedUnique?.Unit?.UnitReports[0]?.Unit?.abbreviation
              : oneMappedUnique?.Unit?.abbreviation)
              ? 1
              : oneMappedUnique?.ArticleMatierePremiere?.Unit?.UnitReports
                    ?.length > 0
                ? oneMappedUnique?.ArticleMatierePremiere?.Unit?.UnitReports[0]
                    .report
                : 1),
        ),
    )
    ?.reduce((sum: any, oneReduced: any) => Number(oneReduced) + sum, 0);
}
export function getTicketsOfSelectedMonthFromCloture(
  ticketCloture: any[],
  index: any,
) {
  return ticketCloture
    ?.filter(
      (oneFiltered: any) => dayjs(oneFiltered?.CreatedAt).month() == index,
    )
    ?.map((oneMapped: any) => oneMapped?.Tickets)
    ?.flat();
}
export function getInvoiceRoomServiceTotalTTC(generalEntaite: any) {
  return generalEntaite?.RoomReservationServiceInputs
    ? generalEntaite?.RoomReservationServiceInputs?.reduce(
        (sum: any, oneReduced: any) => Number(oneReduced?.prix_ttc) + sum,
        0,
      )
    : 0;
}
export function getInvoiceTotalTTC(generalEntaite: any) {
  return (
    (getTotalInvoiceTicketOnCard(generalEntaite, {}) +
      getTotalInvoiceTicket(generalEntaite, {}) +
      getInvoiceRoomServiceTotalTTC(generalEntaite) +
      (Array.isArray(generalEntaite?.RoomInputInvoiceInputs) &&
      generalEntaite?.RoomInputInvoiceInputs?.length > 0
        ? generalEntaite?.RoomInputInvoiceInputs?.reduce(
            (sum: any, oneItem: any) =>
              (oneItem?.RoomInput?.prix_ttc > 0
                ? oneItem?.RoomInput?.prix_ttc
                : (oneItem?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
                    (oneConvention: any) =>
                      oneConvention?.RoomCapacityID ==
                      oneItem?.RoomInput?.RoomCapacityID,
                  )?.prix_ttc ?? oneItem?.RoomInput?.RoomCapacity?.prix_ttc)) *
                getDiffInDays(
                  oneItem?.RoomInput?.date_out_is_cloturee ==
                    "0001-01-01T01:00:00+01:00"
                    ? new Date()
                    : oneItem?.RoomInput?.date_out_is_cloturee,
                  oneItem?.RoomInput?.RoomReservation?.date_in,
                ) +
              sum,
            0,
          )
        : 0) +
      roomServiceInvoiceInvoiceArray(generalEntaite)?.reduce(
        (sum: any, oneReduced: any) => oneReduced?.prix_ttc + sum,
        0,
      )) /
    (generalEntaite?.is_vat_exempt != isTrueOrFalseString.TRUE ? 1 : 1 + 0.07)
  );
}
export function getInvoiceTotalRoomInputTickets(object: any) {
  return object?.RoomInputInvoiceInputs?.map(
    (oneMappedItem: any) =>
      oneMappedItem?.RoomInput?.RoomReservationServiceInputs,
  )
    ?.flat()
    ?.reduce(
      (sum: any, oneServiceRoomInput: any) =>
        oneServiceRoomInput?.prix_ttc + sum,
      0,
    );
}
export function getInvoiceTotalRoomService(object: any) {
  return object?.RoomInputInvoiceInputs?.map(
    (oneMappedItem: any) =>
      oneMappedItem?.RoomInput?.RoomReservationServiceInputs,
  )
    ?.flat()
    ?.reduce(
      (sum: any, oneServiceRoomInput: any) =>
        oneServiceRoomInput?.prix_ttc + sum,
      0,
    );
}
export function getInvoiceRoomInputTicketReduction(oneItem: any) {
  return (
    1 -
    (oneItem?.Ticket?.ReductionFormRestorant?.value > 0
      ? oneItem?.Ticket?.ReductionFormRestorant?.value
      : oneItem?.Ticket?.ClientVerriere?.remise) /
      100
  );
}
export function getInvoiceTotalRemise(generalEntaite: any) {
  return (
    (Array.isArray(generalEntaite?.TicketInvoiceInputs) &&
    generalEntaite?.TicketInvoiceInputs.length > 0
      ? generalEntaite?.TicketInvoiceInputs?.reduce(
          (sum: any, oneItem: any) =>
            oneItem?.Ticket?.prix_ttc *
              ((oneItem?.Ticket?.ReductionFormRestorant?.value > 0
                ? oneItem?.Ticket?.ReductionFormRestorant?.value
                : oneItem?.Ticket?.ClientVerriere?.remise) /
                100) +
            sum,
          0,
        )
      : 0) +
    (Array.isArray(generalEntaite?.RoomInputInvoiceInputs) &&
    generalEntaite?.RoomInputInvoiceInputs?.length > 0
      ? generalEntaite?.RoomInputInvoiceInputs?.reduce(
          (sum: any, oneItem: any) =>
            ((1 -
              oneItem?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
                (oneConvention: any) =>
                  oneConvention?.RoomCapacityID ==
                  oneItem?.RoomInput?.RoomCapacityID,
              )?.prix_ttc_percent /
                100) *
              oneItem?.RoomInput?.RoomCapacity?.prix_ttc ?? 0) + sum,
          0,
        )
      : 0)
  );
}
export function getInvoiceTotalHT(generalEntaite: any) {
  return (
    getInvoiceTotalTTC(generalEntaite) /
    (1.01 *
      (generalEntaite?.is_vat_exempt != isTrueOrFalseString.TRUE ? 1.07 : 1))
  );
}
export function getInvoiceTotalFodec(generalEntaite: any) {
  return getInvoiceTotalHT(generalEntaite) * 0.01;
}
export function getInvoiceTotalTAX(generalEntaite: any) {
  return (
    (getInvoiceTotalHT(generalEntaite) + getInvoiceTotalFodec(generalEntaite)) *
    (generalEntaite?.is_vat_exempt != isTrueOrFalseString.TRUE ? 0.07 : 0)
  );
}
export function getInvoiceTotalSejour(object: any) {
  return checkIsArray(object?.RoomInputInvoiceInputs)
    ?.map((oneMapped: any) =>
      oneMapped?.RoomInput?.SubClientInputs?.map((oneRoomInputMapped: any) => {
        return {
          ...oneRoomInputMapped?.SubClient?.Nationality?.NationalityType,
          days:
            getDiffInDays(
              oneMapped?.RoomInput?.date_out_is_cloturee,
              oneMapped?.RoomInput?.RoomReservation?.date_in,
            ) > 7
              ? 7
              : getDiffInDays(
                  oneMapped?.RoomInput?.date_out_is_cloturee,
                  oneMapped?.RoomInput?.RoomReservation?.date_in,
                ),
        };
      }),
    )
    ?.flat()
    ?.reduce(
      (sum: any, oneReduced: any) =>
        oneReduced?.days * oneReduced?.prixTaxSejours + sum,
      0,
    );
}

export function getInvoiceTotalTTC_Net(generalEntaite: any) {
  return (
    getInvoiceTotalTTC(generalEntaite) +
    1 +
    getInvoiceTotalSejour(generalEntaite)
  );
}
export function checkIfContain_DT(data: any) {
  return (data as string)?.toString()?.includes(" DT")
    ? data?.split(" DT")[0]
    : Number(data).toFixed(3) + " DT";
}
export function deleteDT_Contain_DT(data: any) {
  return Number(
    (data as string)?.toString()?.includes(" DT")
      ? data?.split(" DT")[0]
      : data,
  );
}
export function checkCreateEntaiteEnabled(
  generalEntaite: any,
  newEntaite: any,
  objectLignesAttribute?: string,
) {
  return generalEntaite == undefined
    ? true
    : (generalEntaite?.ID == undefined &&
        ((objectLignesAttribute
          ? generalEntaite[objectLignesAttribute]?.length > 0
          : true) ||
          generalEntaite?.TicketInvoiceInputs?.length > 0 ||
          generalEntaite?.RoomInputInvoiceInputs?.length > 0 ||
          generalEntaite?.RoomReservationServiceInputs?.length > 0)) == false ||
        generalEntaite?.ID > 0;
}

export function getDetailsInvoiceStandAloneTickets(
  object: any,
  value: any,
  articleTypes: any[],
) {
  return articleTypes
    ?.filter((oneItem_: any) =>
      getDailyInvoiceStandAloneTickets(object, value, oneItem_),
    )
    ?.map((oneItem: any) => {
      return createData(
        oneItem?.description + " à la carte",
        "",
        "",
        getDailyInvoiceStandAloneTickets(object, value, oneItem).toString(),
        false,
      );
    });
}
export function getDetailsInvoiceRoomInputTickets(
  object: any,
  value: any,
  articleTypes: any[],
) {
  return articleTypes
    ?.filter((oneItem_: any) =>
      getDailyInvoiceRoomInputTickets(object, value, oneItem_),
    )
    ?.map((oneItem: any) => {
      return createData(
        oneItem?.description,
        "",
        "",
        getDailyInvoiceRoomInputTickets(object, value, oneItem).toString(),
        false,
      );
    });
}
export const checkArticleID = (ticketInputs: any[], typeItem: any) => {
  return ticketInputs?.filter((oneTicketInputFiltered: any) =>
    typeItem?.ID
      ? oneTicketInputFiltered?.ArticleProduit?.ArticleTypeID == typeItem?.ID
      : true,
  );
};
export function getDailyInvoiceStandAloneTickets(
  object: any,
  value: number,
  typeItem: any,
) {
  return getReducedTicketInputFromTicket(
    checkArticleID(
      object?.TicketInvoiceInputs?.filter(
        (oneFitered: any) =>
          dayjs(oneFitered?.Ticket?.CreatedAt).dayOfYear() == value,
      )
        ?.map((oneMapped: any) => oneMapped?.Ticket?.TicketInputs)
        ?.flat(),
      typeItem,
    ),
  );
}
export function getDailyInvoiceRoomInputTickets(
  object: any,
  value: any,
  typeItem: any,
) {
  return getReducedTicketInputFromTicket(
    checkArticleID(
      object?.RoomInputInvoiceInputs?.map((oneReducedItem: any) =>
        oneReducedItem?.RoomInput?.TicketRoomInputInputs?.filter(
          (oneFitered: any) =>
            dayjs(oneFitered?.Ticket?.CreatedAt).dayOfYear() == value,
        )?.map(
          (oneTicketRoomInput: any) => oneTicketRoomInput?.Ticket?.TicketInputs,
        ),
      )
        ?.flat()
        ?.flat()
        ?.flat(),
      typeItem,
    ),
  );
}

export function getDailyInvoiceOnCardTickets(
  object: any,
  value: any,
  index: any,
  typeItem?: any,
) {
  return object?.TicketInvoiceInputs?.reduce(
    (sum: any, oneReducedItem: any) =>
      (dayjs(oneReducedItem?.Ticket?.CreatedAt)?.dayOfYear() == value + index &&
      true
        ? oneReducedItem?.Ticket?.prix_ttc *
          (1 -
            (oneReducedItem?.Ticket?.ReductionFormRestorant?.value > 0
              ? oneReducedItem?.Ticket?.ReductionFormRestorant?.value
              : oneReducedItem?.Ticket?.ClientVerriere?.remise) /
              100)
        : 0) + sum,
    0,
  );
}
export function createData(
  name: string,
  quantity: string,
  prix_unitaire: string,
  prix_total: string,
  is_date?: boolean,
) {
  return { name, quantity, prix_unitaire, prix_total, is_date };
}

export function getDailyInvoiceTicketsArrayForm(
  ticketInvoiceInputs: any[],
  articlesTypes: any[],
) {
  return [
    getUnique(
      ticketInvoiceInputs
        .map((oneMapped: any) => oneMapped.Ticket.TicketInputs)
        .flat()
        ?.map((oneDatedMap: any) => {
          return {
            ...oneDatedMap,
            creationDate: dayjs(oneDatedMap?.CreatedAt).format("DD/MM/YYYY"),
          };
        }),
      "creationDate",
    )?.map((oneOnCardItem: any) => [
      createData(oneOnCardItem?.creationDate, "", "", "", true),
      ...articlesTypes?.map((oneItem: any) => {
        return getReducedTicketInputFromTicket(
          checkArticleID(
            ticketInvoiceInputs
              .map((oneMapped) => oneMapped.Ticket.TicketInputs)
              .flat()
              ?.filter(
                (oneTicketInputFiltered: any) =>
                  dayjs(oneTicketInputFiltered?.CreatedAt).format(
                    "DD/MM/YYYY",
                  ) == oneOnCardItem?.creationDate,
              ),
            oneItem,
          ),
        ) > 0
          ? createData(
              oneItem?.description + " à la carte",
              "",
              "",
              getReducedTicketInputFromTicket(
                checkArticleID(
                  ticketInvoiceInputs
                    .map((oneMapped) => oneMapped.Ticket.TicketInputs)
                    .flat()
                    ?.filter(
                      (oneTicketInputFiltered: any) =>
                        dayjs(oneTicketInputFiltered?.CreatedAt).format(
                          "DD/MM/YYYY",
                        ) == oneOnCardItem?.creationDate,
                    ),
                  oneItem,
                ),
              ).toString(),
              false,
            )
          : [];
      }),
    ]),
  ]
    ?.flat()
    ?.map((oneMappedTicket: any) => {
      return {
        date: oneMappedTicket[0]["name"],
        content: oneMappedTicket,
      };
    });
}
export function getReducedRoomInputPrice(
  roomInputInvoiceInputs: any[],
  value: any,
  index: any,
) {
  return roomInputInvoiceInputs?.reduce(
    (sum: any, oneReducedItem: any) =>
      (dayjs(
        oneReducedItem?.RoomInput?.date_out_is_cloturee?.includes("0001-01-01")
          ? new Date().toISOString()
          : oneReducedItem?.RoomInput?.date_out_is_cloturee,
      )?.dayOfYear() >
        value + index &&
      (dayjs(
        oneReducedItem?.RoomInput?.RoomReservation?.date_in,
      )?.dayOfYear() ==
        dayjs(
          oneReducedItem?.RoomInput?.RoomReservation?.date_in,
        )?.dayOfYear() +
          index ||
        dayjs(
          oneReducedItem?.RoomInput?.RoomReservation?.date_in,
        )?.dayOfYear() <
          dayjs(
            oneReducedItem?.RoomInput?.RoomReservation?.date_in,
          )?.dayOfYear() +
            index)
        ? oneReducedItem?.RoomInput?.prix_ttc > 0
          ? oneReducedItem?.RoomInput?.prix_ttc
          : (oneReducedItem?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
              (oneFound: any) =>
                oneFound?.RoomCapacityID ==
                oneReducedItem?.RoomInput?.RoomCapacityID,
            )?.prix_ttc ??
            oneReducedItem?.RoomInput?.RoomCapacity?.prix_ttc ??
            0) /* ?.toFixed(3) */
        : 0) + sum,
    0,
  );
}
export function getDailyInvoiceRoomReservationPreServiceArray(
  object: any,
  articleTypes: any[],
) {
  return getUnique(
    object?.RoomInputInvoiceInputs?.map((oneItemMapped: any) => {
      return {
        date_out: dayjs(
          oneItemMapped?.RoomInput?.date_out_is_cloturee?.includes("0001-01-01")
            ? new Date().toISOString()
            : oneItemMapped?.RoomInput?.date_out_is_cloturee,
        )?.dayOfYear(),
        date_in: dayjs(
          oneItemMapped?.RoomInput?.RoomReservation?.date_in,
        )?.dayOfYear(),
        tickets: oneItemMapped?.RoomInput?.TicketRoomInputInputs,
        roomInputsPrice:
          oneItemMapped?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
            (oneFound: any) =>
              oneFound?.RoomCapacityID ==
              oneItemMapped?.RoomInput?.RoomCapacityID,
          )?.prix_ttc ?? oneItemMapped?.RoomInput?.RoomCapacity?.prix_ttc,
        roomCapacity:
          oneItemMapped?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
            (oneFound: any) =>
              oneFound?.RoomCapacityID ==
              oneItemMapped?.RoomInput?.RoomCapacityID,
          ) ?? oneItemMapped?.RoomInput?.RoomCapacity,
        roomCapacityID:
          oneItemMapped?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
            (oneFound: any) =>
              oneFound?.RoomCapacityID ==
              oneItemMapped?.RoomInput?.RoomCapacityID,
          ) ?? oneItemMapped?.RoomInput?.RoomCapacityID,
      };
    }),
    "roomCapacityID",
  )
    ?.map((oneDetailItem: any) => {
      {
        return Array(
          Number(dayjs(oneDetailItem?.date_out - oneDetailItem?.date_in)),
        )
          .fill(oneDetailItem?.date_in)
          .map((value, index: number) => [
            createData(
              dayjs()
                ?.dayOfYear(value + index)
                .format("DD/MM/YYYY"),
              "",
              "",
              "",
              true,
            ),
            ...getDetailsInvoiceRoomInputTickets(
              object,
              value + index,
              articleTypes,
            ),
            // ...getDetailsInvoiceStandAloneTickets(object, value + index, articleTypes),

            ...getUnique(
              object?.RoomInputInvoiceInputs?.map((oneMapped: any) => {
                return {
                  ...oneMapped,
                  roomCapacityID: oneMapped?.RoomInput?.RoomCapacityID,
                };
              }),
              "roomCapacityID",
            )
              ?.map((oneRoomInputReduced: any) => {
                return {
                  ...oneRoomInputReduced,
                  prix_ttc: object?.RoomInputInvoiceInputs?.filter(
                    (oneFiltered: any) =>
                      oneFiltered?.RoomInput?.RoomCapacityID ==
                      oneRoomInputReduced?.roomCapacityID,
                  )?.reduce(
                    (sum: any, oneReducedRoomService: any) =>
                      getRoomCapacityPriceReduction(
                        oneReducedRoomService?.RoomInput,
                      ) + sum,
                    0,
                  ),
                };
              })
              ?.map((oneMappedData: any) =>
                createData(
                  oneMappedData?.RoomInput?.RoomCapacity?.description,
                  "",
                  "",
                  oneMappedData?.prix_ttc,
                  false,
                ),
              ),
          ]);
      }
    })
    ?.flat()
    ?.map((oneMappedArray: any) => {
      return { date: oneMappedArray[0]["name"], content: oneMappedArray };
    });
}

export function getDailyInvoiceRoomReservationArray(
  object: any,
  articleTypes: any[],
) {
  return object?.RoomInputInvoiceInputs?.map((oneItemMapped: any) => {
    return {
      date_out: dayjs(
        oneItemMapped?.RoomInput?.date_out_is_cloturee?.includes("0001-01-01")
          ? new Date().toISOString()
          : oneItemMapped?.RoomInput?.date_out_is_cloturee,
      )?.dayOfYear(),
      date_in: dayjs(
        oneItemMapped?.RoomInput?.RoomReservation?.date_in,
      )?.dayOfYear(),
      tickets: oneItemMapped?.RoomInput?.TicketRoomInputInputs,
      roomInputsPrice:
        oneItemMapped?.RoomInput?.prix_ttc > 0
          ? oneItemMapped?.RoomInput?.prix_ttc
          : (oneItemMapped?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
              (oneFound: any) =>
                oneFound?.RoomCapacityID ==
                oneItemMapped?.RoomInput?.RoomCapacityID,
            )?.prix_ttc ?? oneItemMapped?.RoomInput?.RoomCapacity?.prix_ttc),
      roomCapacity:
        oneItemMapped?.RoomInput?.RoomReservation?.Client?.ClientConventions?.find(
          (oneFound: any) =>
            oneFound?.RoomCapacityID ==
            oneItemMapped?.RoomInput?.RoomCapacityID,
        ) ?? oneItemMapped?.RoomInput?.RoomCapacity,
    };
  })
    ?.map((oneDetailItem: any) => {
      {
        return Array(
          Number(dayjs(oneDetailItem?.date_out - oneDetailItem?.date_in)),
        )
          .fill(oneDetailItem?.date_in)
          .map((value, index: number) => [
            createData(
              dayjs()
                ?.dayOfYear(value + index)
                .format("DD/MM/YYYY"),
              "",
              "",
              "",
              true,
            ),
            ...getDetailsInvoiceRoomInputTickets(
              object,
              value + index,
              articleTypes,
            ),
            // ...getDetailsInvoiceStandAloneTickets(object, value + index, articleTypes),
            createData(
              "Sejour",
              "",
              "",
              getReducedRoomInputPrice(
                object?.RoomInputInvoiceInputs,
                value,
                index,
              ),
              false,
            ),
          ]);
      }
    })
    ?.flat()
    ?.map((oneMappedArray: any) => {
      return { date: oneMappedArray[0]["name"], content: oneMappedArray };
    });
}
export const getDayNumberForReservation = (roomReservationInput: any) => {
  return getDiffInDays(
    roomReservationInput?.RoomInput?.date_out_is_cloturee ==
      "0001-01-01T01:00:00+01:00"
      ? new Date()
      : roomReservationInput?.RoomInput?.date_out_is_cloturee,
    roomReservationInput?.RoomInput?.RoomReservation?.date_in,
  );
};

export function getInventaireNewValue(
  entaiteArray: any[],
  object: any,
  lotID: any,
) {
  return checkIsArray(
    entaiteArray?.filter((oneFiltered: any) => oneFiltered?.LotID == lotID),
  ) &&
    entaiteArray?.filter((oneFiltered: any) => oneFiltered?.LotID == lotID)
      ?.length > 0
    ? entaiteArray
        ?.filter((oneFiltered: any) => oneFiltered?.LotID == lotID)[0]
        ?.InventaireLignes?.find(
          (oneFoundItem: any) =>
            Number(oneFoundItem?.ArticleMatierePremiereID) ==
            Number(object?.ID),
        ) /* ?.new_value ?? 0 */
    : {};
}
export function setPrintableReference(objectArray: any) {
  return Array.isArray(objectArray)
    ? objectArray?.length > 0
      ? (
          Number(
            objectArray[0]?.reference?.includes("/")
              ? objectArray[0]?.reference?.split("/")[0]
              : objectArray[0]?.reference,
          ) + 1
        )
          ?.toString()
          .padStart(6, "0") +
        "/" +
        dayjs().format("YYYY")
      : "1".padStart(6, "0") + "/" + dayjs().format("YYYY")
    : "1".padStart(6, "0") + "/" + dayjs().format("YYYY");
}

export function getTaxValueBonDentree(
  tax: any[],
  oneItem: any,
  oneScopedItem: any,
  e: any,
) {
  return (
    e.target.value,
    tax?.find(
      (oneTax: any) =>
        oneTax?.ID ==
        (oneItem?.ArticleMatierePremiere?.ID ==
        oneScopedItem?.ArticleMatierePremiere?.ID
          ? Number(e.target.value)
          : oneItem[e.target.name]),
    )?.value
  );
}
export function roomServiceInvoiceInvoiceArray(object: any) {
  return checkIsArray(object?.RoomInputInvoiceInputs)
    ?.map((oneRoomInvoiceInput: any) =>
      oneRoomInvoiceInput?.RoomInput?.RoomReservationServiceInputs?.map(
        (oneRoomReservationService: any) => oneRoomReservationService,
      ),
    )
    ?.flat()
    ?.flat();
}
export function getInventaireArray(array: any[], lastInventaire: any) {
  return checkIsArray(array)?.filter((oneFiltered: any) => {
    return (
      new Date(oneFiltered?.CreatedAt).getTime() >
      new Date(lastInventaire?.CreatedAt).getTime()
    );
  });
}
export function getUnitReport(onePrimaryMaterialItem: any) {
  return checkIsArray(onePrimaryMaterialItem?.Unit?.UnitReports)?.length > 0
    ? checkIsArray(onePrimaryMaterialItem?.Unit?.UnitReports)[0]?.report
    : 1;
}
export function getTicket_sConsumption(tickets: any[], inventaire: any) {
  return getUnique(
    getInventaireArray(tickets, inventaire)
      ?.map((oneMapped: any) => oneMapped?.TicketInputs)
      ?.flat()
      ?.map((oneArticleItem: any) =>
        oneArticleItem?.ArticleProduit?.ArticleMatierePremiereInputs?.map(
          (onePrimaryMaterialItem: any) => {
            return {
              ...onePrimaryMaterialItem,
              quantity:
                onePrimaryMaterialItem?.quantity *
                getUnitReport(onePrimaryMaterialItem) *
                oneArticleItem?.quantity,
            };
          },
        ),
      )
      ?.flat(),
    "ArticleMatierePremiereID",
  )
    ?.map((oneUniqueItem: any) => {
      return {
        ...oneUniqueItem,
        quantity: getInventaireArray(tickets, inventaire)
          ?.map((oneMapped: any) => oneMapped?.TicketInputs)
          ?.flat()
          ?.map((oneArticleItem: any) =>
            oneArticleItem?.ArticleProduit?.ArticleMatierePremiereInputs?.map(
              (onePrimaryMaterialItem: any) => {
                return {
                  ...onePrimaryMaterialItem,
                  quantity:
                    onePrimaryMaterialItem?.quantity * oneArticleItem?.quantity,
                };
              },
            ),
          )
          ?.flat()
          ?.filter(
            (oneFilteredMP: any) =>
              oneFilteredMP?.ArticleMatierePremiereID ==
              oneUniqueItem?.ArticleMatierePremiereID,
          )
          ?.reduce((sum: any, reducedMP: any) => reducedMP?.quantity + sum, 0),
      };
    })
    ?.filter((oneFiltered: any) => oneFiltered?.quantity > 0);
}

export function getBon_Values(
  array: any,
  lastInventaire: any,
  linesAttribute: string,
  isTransfert: boolean,
  selectedLotID: any,
) {
  return getUnique(
    getInventaireArray(array, lastInventaire)
      ?.map((oneMapped: any) =>
        oneMapped[linesAttribute]?.map((oneLineItem: any) => {
          return {
            ...oneLineItem,
            LotToID: oneMapped?.LotToID,
            LotFromID: oneMapped?.LotFromID,
          };
        }),
      )
      ?.flat(),
    "ArticleMatierePremiereID",
  )
    ?.map((oneMapped_: any) => {
      return {
        ...oneMapped_,
        quantity: getInventaireArray(array, lastInventaire)
          ?.map((oneMapped: any) => oneMapped[linesAttribute])
          ?.flat()
          ?.filter(
            (oneFiltered: any) =>
              oneFiltered?.ArticleMatierePremiereID ==
              oneMapped_?.ArticleMatierePremiereID,
          )
          ?.reduce(
            (sum: any, reducedItem: any) =>
              (reducedItem?.quantity ?? 1) *
                getUnitReport(oneMapped_) *
                (isTransfert == true
                  ? selectedLotID == oneMapped_?.LotToID
                    ? 1
                    : selectedLotID == oneMapped_?.LotFromID
                      ? -1
                      : 0
                  : 1) +
              sum,
            0,
          ),
      };
    })
    ?.filter((oneFiltered: any) => oneFiltered?.quantity > 0);
}
export function getPrimaryArticleActualConsumption(
  array: any,
  selectedItem: any,
) {
  return (
    array?.find(
      (oneFound: any) =>
        oneFound?.ArticleMatierePremiereID ==
        selectedItem?.ArticleMatierePremiereID,
    ),
    array?.find(
      (oneFound: any) =>
        oneFound?.ArticleMatierePremiereID ==
        selectedItem?.ArticleMatierePremiereID,
    )?.quantity ?? 0
  );
}
export function getTicketTTC(oneTicket: any) {
  return oneTicket?.TicketInputs?.reduce(
    (sum: any, oneReduced: any) =>
      oneReduced?.ArticleProduit?.prix_ttc * oneReduced?.quantity + sum,
    0,
  );
}
export function checkIfThereIsReduction(oneTicket: any, ticket_owner: any) {
  return (
    1 -
    (dayjs().dayOfYear() > 100 &&
    dayjs().format("YYYY") == "2024" &&
    getTicketTTC(oneTicket) > 700
      ? oneTicket?.ReductionFormRestorant?.value != 0
        ? oneTicket?.ReductionFormRestorant?.value / 100
        : (oneTicket?.ticket_owner == ticket_owner.CLIENT
            ? oneTicket?.ClientVerriere?.remise
            : 0) / 100
      : 0)
  );
}

export function getInvoiceCompanyMatricule(object: any) {
  return checkIsArray(object?.RoomInputInvoiceInputs).length > 0
    ? getInvoiceCompanyRoomReservationMatricule(object)
    : getInvoiceClientVerriereMatricule(object);
}
export function getInvoiceCompany(object: any) {
  return checkIsArray(object?.RoomInputInvoiceInputs).length > 0
    ? getInvoiceCompanyRoomReservation(object)
    : getInvoiceClientVerriere(object);
}
export function getInvoiceClient(object: any) {
  return checkIsArray(object?.RoomInputInvoiceInputs).length > 0
    ? getInvoiceClientRoomReservation(object)
    : "";
}

export function getInvoiceCompanyRoomReservationMatricule(object: any) {
  return (
    checkIsArray(object?.RoomInputInvoiceInputs)
      ? checkIsArray(object?.RoomInputInvoiceInputs)?.map(
          (oneMapped: any) =>
            oneMapped?.RoomInput?.RoomReservation?.Client
              ?.commercial_registery ?? "",
        )[0]
      : ""
  )?.trim();
}
export function getInvoiceCompanyRoomReservation(object: any) {
  return (
    checkIsArray(object?.RoomInputInvoiceInputs)
      ? checkIsArray(object?.RoomInputInvoiceInputs)?.map(
          (oneMapped: any) =>
            oneMapped?.RoomInput?.RoomReservation?.Client?.commercial_name ??
            "",
        )[0]
      : ""
  )?.trim();
}
export function getInvoiceClientRoomReservation(object: any) {
  return object?.RoomInputInvoiceInputs?.map((oneRoomInputInvoice: any) =>
    oneRoomInputInvoice?.RoomInput?.SubClientInputs?.map(
      (oneSubClient: any) =>
        oneSubClient?.SubClient?.nom + " " + oneSubClient?.SubClient?.prenom,
    ),
  ).toString();
}

export function getInvoiceClientVerriereMatricule(object: any) {
  return (
    checkIsArray(object?.TicketInvoiceInputs).length > 0
      ? checkIsArray(object?.TicketInvoiceInputs)?.map(
          (oneMapped: any) =>
            oneMapped?.Ticket?.ClientVerriere?.commercial_registery ?? "",
        )[0]
      : ""
  ).trim();
}
export function getInvoiceClientVerriere(object: any) {
  return (
    checkIsArray(object?.TicketInvoiceInputs).length > 0
      ? checkIsArray(object?.TicketInvoiceInputs)?.map(
          (oneMapped: any) =>
            oneMapped?.Ticket?.ClientVerriere?.nom +
            " " +
            object?.TicketInvoiceInputs[0]?.Ticket?.ClientVerriere?.prenom,
        )[0]
      : ""
  ).trim();
}

export function mapRoomReservationToTheCalendar(roomInputs: any[]) {
  return roomInputs?.map((oneRoomReservation: any) => {
    return {
      ...oneRoomReservation,
      id: oneRoomReservation?.ID,
      title:
        oneRoomReservation?.Room?.description +
        (oneRoomReservation?.RoomReservation?.Client?.commercial_name
          ? " : " + oneRoomReservation?.RoomReservation?.Client?.commercial_name
          : "") +
        " : " +
        oneRoomReservation?.SubClientInputs?.map(
          (oneClient: any) =>
            oneClient?.SubClient?.prenom + " " + oneClient?.SubClient?.nom,
        )
          ?.toString()
          ?.replaceAll(",", ", "),

      allDay: true,
      start: dayjs(oneRoomReservation?.RoomReservation?.date_in).toISOString(),
      end: getDateMinusOneDay(
        compareDays(
          oneRoomReservation?.RoomReservation?.date_out,
          new Date().toISOString(),
        ) == true
          ? new Date(oneRoomReservation?.RoomReservation?.date_out)
          : new Date(),
      ),
      backgroundColor: oneRoomReservation?.Room?.color ?? "#ad314e",
    };
  });
}

export function getDayOfYear(date: any) {
  return dayjs(date).dayOfYear();
}
export function checkGeneraltedInvoiceClient(data: any) {
  return checkIsArray(data?.RoomInputInvoiceInputs)?.length > 0
    ? isTrueOrFalseString.TRUE
    : isTrueOrFalseString.FALSE;
}
export function getGeneratedInvoiceClientVerriere(data: any) {
  return checkIsArray(data?.TicketInvoiceInputs)?.length > 0
    ? data?.TicketInvoiceInputs[0]?.Ticket?.ClientVerriereID > 0
      ? data?.TicketInvoiceInputs[0]?.Ticket?.ClientVerriere
      : undefined
    : undefined;
}
export function getGeneratedInvoiceClient(data: any) {
  return checkIsArray(data?.RoomInputInvoiceInputs)?.length > 0
    ? data?.RoomInputInvoiceInputs[0]?.RoomInput?.RoomReservation?.Client
    : undefined;
}
export function checkIfNaN(number: any) {
  return number?.toString()?.includes("NaN") ? 0 : number;
}

export function getInvoiceTableContent(
  object: any,
  componenetInvoiceType: any,
  invoiceType: any,
  globalInvoiceDescription: any,
  articleTypes: any,
) {
  return object?.TicketInvoiceInputs?.length > 0 ||
    object?.RoomInputInvoiceInputs?.length > 0 ||
    object?.RoomReservationServiceInputs?.length > 0
    ? componenetInvoiceType == invoiceType.GLOBAL
      ? [
          createData(
            globalInvoiceDescription ?? "",
            "",
            "",
            getInvoiceTotalTTC(object)?.toFixed(3),
            true,
          ),
        ]
      : componenetInvoiceType == invoiceType.RESUME
        ? [
            ...articleTypes.data
              ?.filter(
                (oneItem_: any) => getTotalInvoiceTicket(object, oneItem_) > 0,
              )
              ?.map((oneItem: any) => {
                return createData(
                  oneItem?.description,
                  "",
                  "",
                  getTotalInvoiceTicket(object, oneItem).toFixed(3)?.toString(),
                  true,
                );
              }),
            ...articleTypes.data
              ?.filter(
                (oneItem_: any) =>
                  getTotalInvoiceTicketOnCard(object, oneItem_) > 0,
              )
              ?.map((oneItem: any) => {
                return createData(
                  oneItem?.description + " à la carte",
                  "",
                  "",
                  getTotalInvoiceTicketOnCard(object, oneItem)
                    .toFixed(3)
                    ?.toString(),
                  true,
                );
              }),
            roomServiceInvoiceInvoiceArray(object)?.reduce(
              (sum: any, oneReduced: any) => oneReduced?.prix_ttc + sum,
              0,
            ) > 0 &&
              createData(
                roomServiceInvoiceInvoiceArray(object)
                  ?.map(
                    (oneRoomService: any) =>
                      oneRoomService?.RoomReservationService?.description,
                  )
                  ?.toString(),
                "",
                "",
                roomServiceInvoiceInvoiceArray(object)
                  ?.reduce(
                    (sum: any, oneReduced: any) => oneReduced?.prix_ttc + sum,
                    0,
                  )
                  .toFixed(3)
                  .toString(),
                true,
              ),
            getTotalInvoiceRoomAllocation(object) > 0 &&
              createData(
                "Sejour",
                "",
                "",
                getTotalInvoiceRoomAllocation(object).toFixed(3).toString(),
                true,
              ),
            ...checkIsArray(object?.RoomReservationServiceInputs)?.map(
              (oneItem: any) => {
                return createData(
                  oneItem?.RoomReservationService?.description,
                  "",
                  "",
                  Number(oneItem?.prix_ttc).toFixed(3),
                  true,
                );
              },
            ),
          ].flat()
        : componenetInvoiceType == invoiceType.DETAILS
          ? [
              ...getUnique(
                [
                  ...getDailyInvoiceRoomReservationArray(
                    object,
                    articleTypes.data,
                  ),
                  ...getDailyInvoiceTicketsArrayForm(
                    object?.TicketInvoiceInputs,
                    articleTypes.data,
                  ),
                ],
                "date",
              )
                ?.map((oneLastMap: any) => oneLastMap?.content)
                ?.flat()
                ?.map((oneMapped: any) => {
                  return {
                    ...oneMapped,
                    prix_total: oneMapped?.prix_total
                      ? Number(oneMapped?.prix_total)?.toFixed(3)
                      : "",
                  };
                }),
            ]
          : componenetInvoiceType == invoiceType.RESUME_PER_SERVICE
            ? [
                ...articleTypes.data
                  ?.filter(
                    (oneItem_: any) =>
                      getTotalInvoiceTicket(object, oneItem_) > 0,
                  )
                  ?.map((oneItem: any) => {
                    return createData(
                      oneItem?.description,
                      "",
                      "",
                      getTotalInvoiceTicket(object, oneItem)
                        .toFixed(3)
                        ?.toString(),
                      true,
                    );
                  }),
                ...articleTypes.data
                  ?.filter(
                    (oneItem_: any) =>
                      getTotalInvoiceTicketOnCard(object, oneItem_) > 0,
                  )
                  ?.map((oneItem: any) => {
                    return createData(
                      oneItem?.description + " à la carte",
                      "",
                      "",
                      getTotalInvoiceTicketOnCard(object, oneItem)
                        .toFixed(3)
                        ?.toString(),
                      true,
                    );
                  }),
                roomServiceInvoiceInvoiceArray(object)?.reduce(
                  (sum: any, oneReduced: any) => oneReduced?.prix_ttc + sum,
                  0,
                ) > 0 &&
                  createData(
                    roomServiceInvoiceInvoiceArray(object)
                      ?.map(
                        (oneRoomService: any) =>
                          oneRoomService?.RoomReservationService?.description,
                      )
                      ?.toString(),
                    "",
                    "",
                    roomServiceInvoiceInvoiceArray(object)
                      ?.reduce(
                        (sum: any, oneReduced: any) =>
                          oneReduced?.prix_ttc + sum,
                        0,
                      )
                      .toFixed(3)
                      .toString(),
                    true,
                  ),
                ...getUnique(
                  object?.RoomInputInvoiceInputs?.map((oneMapped: any) => {
                    return {
                      ...oneMapped,
                      roomCapacityID: oneMapped?.RoomInput?.RoomCapacityID,
                    };
                  }),
                  "roomCapacityID",
                )
                  ?.map((oneRoomInputReduced: any) => {
                    return {
                      ...oneRoomInputReduced,
                      prix_ttc: object?.RoomInputInvoiceInputs?.filter(
                        (oneFiltered: any) =>
                          oneFiltered?.RoomInput?.RoomCapacityID ==
                          oneRoomInputReduced?.roomCapacityID,
                      )?.reduce(
                        (sum: any, oneReducedRoomService: any) =>
                          getRoomCapacityPriceReduction(
                            oneReducedRoomService?.RoomInput,
                          ) *
                            getDayNumberForReservation(oneReducedRoomService) +
                          sum,
                        0,
                      ),
                    };
                  })
                  ?.map((oneMappedData: any) =>
                    createData(
                      oneMappedData?.RoomInput?.RoomCapacity?.description,
                      object?.RoomInputInvoiceInputs?.filter(
                        (oneMapped: any) =>
                          oneMapped?.RoomInput?.RoomCapacityID ==
                          oneMappedData?.RoomInput?.RoomCapacityID,
                      )?.length,
                      oneMappedData?.prix_ttc
                        ? (
                            Number(oneMappedData?.prix_ttc) /
                            object?.RoomInputInvoiceInputs?.filter(
                              (oneMapped: any) =>
                                oneMapped?.RoomInput?.RoomCapacityID ==
                                oneMappedData?.RoomInput?.RoomCapacityID,
                            )?.length
                          ).toFixed(3)
                        : "",
                      oneMappedData?.prix_ttc
                        ? Number(oneMappedData?.prix_ttc).toFixed(3)
                        : "",
                      true,
                    ),
                  ),
              ].flat()
            : componenetInvoiceType == invoiceType.DETAILS_PER_SERVICE
              ? [
                  ...getUnique(
                    [
                      ...getDailyInvoiceRoomReservationPreServiceArray(
                        object,
                        articleTypes.data,
                      ),
                      ...getDailyInvoiceTicketsArrayForm(
                        object?.TicketInvoiceInputs,
                        articleTypes.data,
                      ),
                    ],
                    "date",
                  )
                    ?.map((oneLastMap: any) => oneLastMap?.content)
                    ?.flat()

                    ?.map((oneMapped: any) => {
                      return {
                        ...oneMapped,
                        quantity:
                          object?.RoomInputInvoiceInputs?.filter(
                            (oneMappedItem: any) =>
                              oneMappedItem?.RoomInput?.RoomCapacity
                                ?.description == oneMapped?.name,
                          )?.length == 0
                            ? ""
                            : object?.RoomInputInvoiceInputs?.filter(
                                (oneMappedItem: any) =>
                                  oneMappedItem?.RoomInput?.RoomCapacity
                                    ?.description == oneMapped?.name,
                              )?.length,
                        prix_unitaire: oneMapped?.prix_total
                          ? (
                              Number(oneMapped?.prix_total) /
                              object?.RoomInputInvoiceInputs?.filter(
                                (oneMappedItem: any) =>
                                  oneMappedItem?.RoomInput?.RoomCapacity
                                    ?.description == oneMapped?.name,
                              )?.length
                            ).toFixed(3)
                          : "",
                        prix_total: oneMapped?.prix_total
                          ? Number(oneMapped?.prix_total)?.toFixed(3)
                          : "",
                      };
                    }),
                ]
              : []
    : [];
}

export function convertDateToISOString(date: string) {
  if (date?.includes("/")) {
    return (
      date?.split("/")[2] +
      "-" +
      date?.split("/")[1] +
      "-" +
      date?.split("/")[0]
    );
  } else {
    return date;
  }
  return;
}
export function getSelectedInvoiceClient(oneSelectedItem: any) {
  return oneSelectedItem?.is_client == isTrueOrFalseString.FALSE
    ? oneSelectedItem?.ClientVerriere?.ID != 0
      ? oneSelectedItem?.ClientVerriere
      : checkIsArray(oneSelectedItem?.TicketInvoiceInputs)?.length > 0
        ? oneSelectedItem?.TicketInvoiceInputs?.find(
            (oneMapped: any) => oneMapped?.ID,
          )?.Ticket?.ClientVerriere
        : {}
    : oneSelectedItem?.Client?.ID != 0
      ? oneSelectedItem?.Client
      : (oneSelectedItem?.RoomInputInvoiceInputs?.find(() => true)?.RoomInput
          ?.RoomReservation?.Client ?? {});
}

export const checkNumber = (number: any) => {
  return isNaN(number) ? 1 : number;
};

export const getSousFamilleArticleLastRef = (
  sousFamilleArticles: any[],
  selectedObject: any,
) => {
  return Number(
    sousFamilleArticles
      .filter(
        (oneItem: any) =>
          oneItem?.FamilleArticleID == selectedObject?.FamilleArticleID,
      )
      ?.find(() => true)
      ?.reference?.substr(6 - 3) ?? 0,
  );
};

export const getSousFamilleArticleNewRefIndex = (
  sousFamilleArticles: any[],
  selectedObject: any,
) => {
  return lpad(
    checkNumber(
      getSousFamilleArticleLastRef(sousFamilleArticles, selectedObject),
    ) + 1,
    3,
  );
};

export const getSousFamilleNewRef = (
  selectedObject: any,
  familleArticleList: any[],
  object: any,
  sousFamilleList: any[],
) => {
  return selectedObject?.ID == undefined
    ? object?.FamilleArticleID > 0
      ? (familleArticleList ?? [])?.find(
          (oneItem: any) => oneItem?.ID == object.FamilleArticleID,
        )?.reference +
        "-" +
        getSousFamilleArticleNewRefIndex(sousFamilleList, object)
      : "XX-XXX"
    : selectedObject?.FamilleArticleID == object?.FamilleArticleID &&
        selectedObject?.reference != "XX-XXX"
      ? selectedObject?.reference
      : object?.FamilleArticleID > 0
        ? (familleArticleList ?? [])?.find(
            (oneItem: any) => oneItem?.ID == object.FamilleArticleID,
          )?.reference +
          "-" +
          getSousFamilleArticleNewRefIndex(sousFamilleList, object)
        : "XX-XXX";
};
export const ticketsSearchFilter = (oneItem: any, searchs: any) => {
  return (
    (oneItem?.ticket_owner == ticket_owner.CLIENT
      ? oneItem?.client
          .toLowerCase()
          .includes(
            (typeof searchs.oneObject === "string" ? searchs.oneObject : "")
              .trim()
              ?.toString()
              .toLowerCase(),
          )
      : false) ||
    oneItem?.table
      .toLowerCase()
      .includes(
        (typeof searchs.oneObject === "string" ? searchs.oneObject : "")
          .trim()
          ?.toString()
          .toLowerCase(),
      ) ||
    oneItem?.reference
      .toLowerCase()
      .includes(
        (typeof searchs.oneObject === "string" ? searchs.oneObject : "")
          .trim()
          ?.toString()
          .toLowerCase(),
      ) ||
    (oneItem?.ticket_owner == ticket_owner.ROOM
      ? oneItem?.room
          .toLowerCase()
          .includes(
            (typeof searchs.oneObject === "string" ? searchs.oneObject : "")
              .trim()
              ?.toString()
              .toLowerCase(),
          )
      : false)
  );
};

export const storeSecureData = async (key: any, value: any) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureData = async (key: any) => {
  const value = await SecureStore.getItemAsync(key);
  return value;
};

/*
 * Invoice reservation with tickets in reservations and stand alone
 * */
// object.RoomInputInvoiceInputs.map(oneMapped=>oneMapped.RoomInput.RoomCapacity.prix_ttc).reduce((sum,oneReduced)=>oneReduced*.8+sum,0)
// object.TicketInvoiceInputs.map(oneMapped=>oneMapped?.Ticket?.TicketInputs)?.flat()?.reduce((sum,oneReduced)=>(oneReduced?.ArticleProduit?.prix_ttc * oneReduced?.quantity) + sum,0)
// object.RoomInputInvoiceInputs.map(oneMapped=>oneMapped.RoomInput.TicketRoomInputInputs.map(oneMappedTicket=>oneMappedTicket.Ticket.TicketInputs.map(oneMappedTicketInput=>oneMappedTicketInput.ArticleProduit.prix_ttc))).flat().flat().reduce((sum,oneReducedTicketInputs)=>oneReducedTicketInputs+sum,0)
