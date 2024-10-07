import { OverridableStringUnion } from '@mui/types';
export const mainURL = "http://localhost:8888";
export const reduxConstants = {
	MAIN_API_URL: mainURL + "/api",
	LOGIN_PATH: "/login",
	FORGOT_PATH: "/password/forgot-password",
	FORGOTTEN_PASSWORD_PATH: "/password/forgot-password",
	RESET_PASSWORD_PATH: "/password/reset",
	REGISTER_PATH: "/register",
	LOGOUT_PATH: "/logout",
	RESENED_FORGOTTEN_PASSWORD: "/email/verify/resend",
	ADDRESS: "/adress",
	USER: "/user",
	ME: "/me",
	AGENT: "/agents",
	// ARTICLES: "/articles",
	ARTICLES_PRODUCTS: "/articlesProduits",
	ARTICLE_MATIERE_PREMIERE: "/articleMatierePremiere",
	ARTICLE_MATIERE_PREMIERE_INPUT: "/articleMatierePremiereInput",
	ARTICLES_TYPE: "/articlesType",
	BANK: "/bank",
	BON_LIVRAISON: "/bonLivraison",
	BON_ENTRAIS: "/bonDentree",
	CLIENT: "/client",
	SUB_CLIENT: "/subClient",
	CLIENT_CONVENTION: "/clientConvention",
	DEPENCES: "/depences",
	ETAT_BANK: "/etatBank",
	DEVIS: "/devis",
	FACTURE_AVOIR: "/factureAvoir",
	FACTURE: "/facture",
	FAMILLE_ARTICLE: "/familleArticle",
	FOURNISSEUR: "/fournisseur",
	INVENTAIRES: "/inventaire",
	MODE_PAIEMENTS: "/modePaiement",
	REGLEMENT_FACTURE: "reglementFacture",
	ROLE: "/role",
	TAX: "/tax",
	TRANCHES_REGMELEMT_FACTURE: "/trancheReglementFacture",
	TYPE_REGLEMENT_FACTURE: "/typeReglementFacture",
	UNIT: "/unit",
	USERS: "/user",
	VILLE: "/ville",
	ROOM: "/room",
	ROOM_INPUT: "/roomInput",
	ROOM_CAPACITY: "/roomCapacity",
	ROOM_RESERVATION: "/roomReservation",
	FLOOR: "/floor",
	IDENTITY_TYPE: "/identityType",
	NATIONALITY: "/nationality",
	NATIONALITY_TYPE: "/nationalityType",
	PAIEMENT_TYPE: "/paiementType",
	EMPLACEMENT: "/emplacement",
	LOT: "/lot",
	SOUS_FAMILLE_ARTICLE: "/sousFamilleArticle",
	BON_RETOUR: "/bonRetour",
	ALL_TICKET: "/all_ticket",
	TICKET: "/ticket",
	TICKET_FOR_TABLE: "/ticketForTable",
	TICKET_BY_CLOTURE_OPEN: "/ticketByClotureOpen/",
	TICKET_LAST_CLOTURE: "/ticketLastCloture",
	TICKETS_PAR_CLOTURE: "/ticketsParCloture",
	ONE_TICKET_TOTAL: "/ticketTotalNet",
	TABLE: "/table",
	TICKET_INPUT: "/ticketInput",
	RESTORENT_PLATE_OPTION: "/restorentPlateOption",
	RESTORENT_PLATE_OPTION_INPUT: "/restorentPlateOptionInput",
	FORM_REDUCTION_RESTORANT: "/formReductionRestorant",
	UNIT_TYPE: "/unitType",
	UNIT_REPORT: "/unitReport",
	BON_SORTIE: "/bonSortie",
	FOURNISSEUR_STATE: "/fournisseurState",
	INVOICING_REFERENCE: "/invoiceReference",
	CLIENT_VERRIERE: "/clientVerrieree",
	ROOM_RESERVATION_SERVICE: "/roomReservationService",
	ROOM_RESERVATION_SERVICE_INPUT: "/roomReservationServiceInput",
	ALL_TICKET_CLOTURE: "/all_ticketCloture",
	TICKET_VENTES_PAR_CLOTURE: "/ticketVentesParCloture",
	TICKET_CLOTURE: "/ticketCloture",
	TICKET_MONTHLY: "/ticketMonthly",
	TICKET_CLOTURE_WITH_DETAILS: "/ticketClotureWithDetails",
	TICKETCLOTUREMATIEREPREMIERE: "/ticketClotureMatierePremiere",
	TICKET_ROOM_INPUT_INPUT: "/ticketRoomInputInput"
};
export const dayToTimeStampMultiplier = (1000 * 3600 * 24);

export const events = [
	{
		id: 0,
		title: "All Day Event very long title",
		allDay: true,
		start: new Date(2015, 3, 0),
		end: new Date(2015, 3, 1)
	},
	{
		id: 1,
		title: "Long Event",
		start: new Date(2015, 3, 7),
		end: new Date(2015, 3, 10)
	},

	{
		id: 2,
		title: "DTS STARTS",
		start: new Date(2016, 2, 13, 0, 0, 0),
		end: new Date(2016, 2, 20, 0, 0, 0)
	},

	{
		id: 3,
		title: "DTS ENDS",
		start: new Date(2016, 10, 6, 0, 0, 0),
		end: new Date(2016, 10, 13, 0, 0, 0)
	},

	{
		id: 4,
		title: "Some Event",
		start: new Date(2015, 3, 9, 0, 0, 0),
		end: new Date(2015, 3, 10, 0, 0, 0)
	},
	{
		id: 5,
		title: "Conference",
		start: new Date(2015, 3, 11),
		end: new Date(2015, 3, 13),
		desc: "Big conference for important people"
	},
	{
		id: 6,
		title: "Meeting",
		start: new Date(2015, 3, 12, 10, 30, 0, 0),
		end: new Date(2015, 3, 12, 12, 30, 0, 0),
		desc: "Pre-meeting meeting, to prepare for the meeting"
	},
	{
		id: 7,
		title: "Lunch",
		start: new Date(2015, 3, 12, 12, 0, 0, 0),
		end: new Date(2015, 3, 12, 13, 0, 0, 0),
		desc: "Power lunch"
	},
	{
		id: 8,
		title: "Meeting",
		start: new Date(2015, 3, 12, 14, 0, 0, 0),
		end: new Date(2015, 3, 12, 15, 0, 0, 0)
	},
	{
		id: 9,
		title: "Happy Hour",
		start: new Date(2015, 3, 12, 17, 0, 0, 0),
		end: new Date(2015, 3, 12, 17, 30, 0, 0),
		desc: "Most important meal of the day"
	},
	{
		id: 10,
		title: "Dinner",
		start: new Date(2015, 3, 12, 20, 0, 0, 0),
		end: new Date(2015, 3, 12, 21, 0, 0, 0)
	},
	{
		id: 11,
		title: "Planning Meeting with Paige",
		start: new Date(2015, 3, 13, 8, 0, 0),
		end: new Date(2015, 3, 13, 10, 30, 0)
	},
	{
		id: 11.1,
		title: "Inconvenient Conference Call",
		start: new Date(2015, 3, 13, 9, 30, 0),
		end: new Date(2015, 3, 13, 12, 0, 0)
	},
	{
		id: 11.2,
		title: "Project Kickoff - Lou's Shoes",
		start: new Date(2015, 3, 13, 11, 30, 0),
		end: new Date(2015, 3, 13, 14, 0, 0)
	},
	{
		id: 11.3,
		title: "Quote Follow-up - Tea by Tina",
		start: new Date(2015, 3, 13, 15, 30, 0),
		end: new Date(2015, 3, 13, 16, 0, 0)
	},
	{
		id: 12,
		title: "Late Night Event",
		start: new Date(2015, 3, 17, 19, 30, 0),
		end: new Date(2015, 3, 18, 2, 0, 0)
	},
	{
		id: 12.5,
		title: "Late Same Night Event",
		start: new Date(2015, 3, 17, 19, 30, 0),
		end: new Date(2015, 3, 17, 23, 30, 0)
	},
	{
		id: 13,
		title: "Multi-day Event",
		start: new Date(2015, 3, 20, 19, 30, 0),
		end: new Date(2015, 3, 22, 2, 0, 0)
	},
	{
		id: 14,
		title: "Today",
		start: new Date(new Date().setHours(new Date().getHours() - 3)),
		end: new Date(new Date().setHours(new Date().getHours() + 3))
	},
	{
		id: 15,
		title: "Point in Time Event",
		start: new Date(),
		end: new Date()
	},
	{
		id: 16,
		title: "Video Record",
		start: new Date(2015, 3, 14, 15, 30, 0),
		end: new Date(2015, 3, 14, 19, 0, 0)
	},
	{
		id: 17,
		title: "Dutch Song Producing",
		start: new Date(2015, 3, 14, 16, 30, 0),
		end: new Date(2015, 3, 14, 20, 0, 0)
	},
	{
		id: 18,
		title: "Itaewon Halloween Meeting",
		start: new Date(2015, 3, 14, 16, 30, 0),
		end: new Date(2015, 3, 14, 17, 30, 0)
	},
	{
		id: 19,
		title: "Online Coding Test",
		start: new Date(2015, 3, 14, 17, 30, 0),
		end: new Date(2015, 3, 14, 20, 30, 0)
	},
	{
		id: 20,
		title: "An overlapped Event",
		start: new Date(2015, 3, 14, 17, 0, 0),
		end: new Date(2015, 3, 14, 18, 30, 0)
	},
	{
		id: 21,
		title: "Phone Interview",
		start: new Date(2015, 3, 14, 17, 0, 0),
		end: new Date(2015, 3, 14, 18, 30, 0)
	},
	{
		id: 22,
		title: "Cooking Class",
		start: new Date(2015, 3, 14, 17, 30, 0),
		end: new Date(2015, 3, 14, 19, 0, 0)
	},
	{
		id: 23,
		title: "Go to the gym",
		start: new Date(2015, 3, 14, 18, 30, 0),
		end: new Date(2015, 3, 14, 20, 0, 0)
	}
]

export interface BreakpointOverrides { }

export type DialogMaxWidthBP = OverridableStringUnion<
	'xs' | 'sm' | 'md' | 'lg' | 'xl',
	BreakpointOverrides
>;



export enum dialogMaxWidth {
	XS = "xs",
	SM = "sm",
	MD = "md",
	LG = "lg",
	XL = "xl",

}
export enum traider_name {
	CLIENT = "Client",
	FOURNISSEUR = "Fournisseur",
	FACTURE = "facture",
	DEVIS = "devis"
}
export enum is_resident {
	RESIDENT = "RESIDENT",
	NON_RESIDENT = "NON_RESIDENT"
}
export enum ticket_owner {
	ROOM = "ROOM",
	CLIENT = "CLIENT"
}
export enum isCloturee {
	CLOTUREE = "CLOTUREE",
	NON_CLOTUREE = "NON_CLOTUREE",
}
export enum isTrueOrFalseString {
	TRUE = "true",
	FALSE = "false"
}
export enum role {
	ADMINISTRATION = "ADMINISTRATION",
	ECONOMA = "ECONOMA",
	VERRIERE = "VERRIERE",
	VERRIERE_GERAN = "VERRIERE_GERAN",
	RECEPTION = "RECEPTION"
}
export enum invoiceType {
	GLOBAL = "global",
	RESUME = "résumé",
	RESUME_PER_SERVICE = "résumé par service",
	DETAILS = "détails",
	DETAILS_PER_SERVICE = "détails pas service",
}
export enum tax_value {
	VALUE = ((1 + .07) * 1.01)
}

