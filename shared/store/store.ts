import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";
import addressReducer from "./slices/adresss";
import agentReducer from "./slices/agents";
import articleMatierePremiereReducer from "./slices/articlesMatierePremiere";
import articleMatierePremiereInputReducer from "./slices/articlesMatierePremiereInput";
import articleProduitReducer from "./slices/articlesProduit";
import articleTypesReducer from "./slices/articleTypes";
import bankReducer from "./slices/bank";
import bonEntraitReducer from "./slices/bonEntrais";
import bonLivraisonReducer from "./slices/bonLivraison";
import BonRetoursReducer from "./slices/bonRetour";
import bonSortieReducer from "./slices/bonSortie";
import clientReducer from "./slices/client";
import clientConventionReducer from "./slices/clientConvention";
import clientVerriereReducer from "./slices/clientVerriere";
import depencesReducer from "./slices/depences";
import devisReducer from "./slices/devis";
import emplacementReducer from "./slices/emplacement";
import etatBankReducer from "./slices/etatBank";
import factureAvoirReducer from "./slices/factureAvoir";
import factureReducer from "./slices/factures";
import familleArticleReducer from "./slices/familleArticles";
import floorReducer from "./slices/floor";
import formReductionRestorantsReducer from "./slices/formeReductionRestorant";
import fournisseurReducer from "./slices/fournisseurs";
import fournisseurStateReducer from "./slices/fournisseurState";
import generalLigneReducer from "./slices/generalLigne";
import identityTypeReducer from "./slices/identityType";
import inventaireReducer from "./slices/inventaires";
import invoicingReferenceReducer from "./slices/invoicingReference";
import lotReducer from "./slices/lot";
import modePaiementReducer from "./slices/modePaiement";
import nationalityReducer from "./slices/nationality";
import nationalityTypeReducer from "./slices/nationalityType";
import paiementTypeReducer from "./slices/paiementType";
import reglementFactureReducer from "./slices/reglementFacture";
import restorentPlateOptionReducer from "./slices/restorentPlateOption";
import restorentPlateOptionInputReducer from "./slices/restorentPlateOptionInput";
import roleReducer from "./slices/role";
import roomReducer from "./slices/room";
import roomCapacityReducer from "./slices/roomCapacity";
import roomInputReducer from "./slices/roomInput";
import roomReservationReducer from "./slices/roomReservation";
import roomReservationServiceInputReducer from "./slices/roomReservationServiceInputs";
import roomReservationServiceReducer from "./slices/roomReservationServices";
import searchsReducer from "./slices/search";
import sousFamilleArticleReducer from "./slices/sousFamilleArticle";
import subClientsReducer from "./slices/subClient";
import tableReducer from "./slices/table";
import taxReducer from "./slices/tax";
import ticketReducer from "./slices/ticket";
import ticketClotureReducer from "./slices/ticketCloture";
import ticketInputsReducer from "./slices/ticketInput";
import ticketVentesParClotureReducer from "./slices/ticketVentesParCloture";
import tranchesReglementFactureReducer from "./slices/tranchesRegmelemtFacture";
import typeReglementFacturesReducer from "./slices/typeReglementFacture";
import unitReducer from "./slices/units";
import unitTypeReducer from "./slices/unitType";
import userReducer from "./slices/user";
import usersReducer from "./slices/users";
import villeReducer from "./slices/villes";

export const createStore = () =>
	configureStore({
		reducer: {
			addres: addressReducer,
			agent: agentReducer,
			articleMatierePremiere: articleMatierePremiereReducer,
			articleMatierePremiereInput: articleMatierePremiereInputReducer,
			articleProduit: articleProduitReducer,
			articleTypes: articleTypesReducer,
			bank: bankReducer,
			bonEntrais: bonEntraitReducer,
			bonSortie: bonSortieReducer,
			bonRetour: BonRetoursReducer,
			bonLivraison: bonLivraisonReducer,
			client: clientReducer,
			subClient: subClientsReducer,
			fournisseur: fournisseurReducer,
			depences: depencesReducer,
			devis: devisReducer,
			etatBank: etatBankReducer,
			factureAvoir: factureAvoirReducer,
			facture: factureReducer,
			familleArticle: familleArticleReducer,
			fournisseurs: fournisseurReducer,
			inventaire: inventaireReducer,
			modePaiement: modePaiementReducer,
			reglementFacture: reglementFactureReducer,
			role: roleReducer,
			tax: taxReducer,
			tranchesReglmentFacture: tranchesReglementFactureReducer,
			typeReglement: typeReglementFacturesReducer,
			floor: floorReducer,
			room: roomReducer,
			roomInput: roomInputReducer,
			roomReservation: roomReservationReducer,
			roomCapacity: roomCapacityReducer,
			unit: unitReducer,
			ville: villeReducer,
			user: userReducer,
			generalLigne: generalLigneReducer,
			nationality: nationalityReducer,
			nationalityType: nationalityTypeReducer,
			identityType: identityTypeReducer,
			paiementType: paiementTypeReducer,
			lot: lotReducer,
			emplacement: emplacementReducer,
			sousFamilleArticle: sousFamilleArticleReducer,
			ticket: ticketReducer,
			ticketInputs: ticketInputsReducer,
			table: tableReducer,
			restorentPlateOption: restorentPlateOptionReducer,
			restorentPlateOptionInput: restorentPlateOptionInputReducer,
			formReductionRestorant: formReductionRestorantsReducer,
			unitType: unitTypeReducer,
			users: usersReducer,
			fournisseurState: fournisseurStateReducer,
			clientConvention: clientConventionReducer,
			clientVerriere: clientVerriereReducer,
			invoicingReference: invoicingReferenceReducer,
			roomReservationService: roomReservationServiceReducer,
			roomReservationServiceInput: roomReservationServiceInputReducer,
			ticketVentesParCloture: ticketVentesParClotureReducer,
			ticketCloture: ticketClotureReducer,
			searchs: searchsReducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware(
			{
				serializableCheck: false
			}
		),
	});

export const store = createStore();
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
