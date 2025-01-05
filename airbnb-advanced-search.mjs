//imports
import axios from 'axios'
import {load} from 'cheerio'
import {findAllPathsOfNestedObject} from './nestedObjectsFunctions.mjs'
import {getValueONestedObjectFromPath} from './nestedObjectsFunctions.mjs'

//default Airbnb request setting 
const params = {
  refinement_paths: '/homes',
  monthly_start_date: '2025-05-01',
  monthly_length: 3,
  monthly_end_date: '2025-10-01',
  price_filter_input_type: 0,
  channel: 'EXPLORE',
  query: 'Île-de-France, France',
  place_id: 'ChIJF4ymA8Th5UcRcCWLaMOCCwE',
  date_picker_type: 'flexible_dates',
  adults: 16,
  source: 'structured_search_input_header',
  search_type: 'filter_change',
  search_mode: 'regular_search',
  price_filter_num_nights: 153,
  flexible_trip_lengths: 'weekend_trip',
  flexible_trip_dates: ['may', 'june', 'july', 'august', 'september']
};

const config = {
    method: 'get',
    maxBodyLength: Infinity,
    baseURL: 'https://www.airbnb.fr/',
    url: 's/Île~de~France--France/homes',
    params
};

/**
 * Seach on Aibnb.fr, filter on the website given your need and then overwrite the URL parameters
 */
if (false) {
    config.url = ""
    delete config.params
}

async function getAirbnbPageData(config) {
    //HTTPS response 
    const response = await axios(config)

    //Parse HTML response 
    const $ = load(response.data);

    //Get data 
    return JSON.parse($('script#data-deferred-state-0').text()); 
}

const firstRequest = await getAirbnbPageData(config)

//Looking for pages IDs
if (false) console.log(findAllPathsOfNestedObject(json, 'pageCursors'))
const pages = firstRequest.niobeMinimalClientData[0][1].data.presentation.staysSearch.results.paginationInfo.pageCursors
if (false) console.log(pages.length)

//Get hostings from all available pages 
let hosts = []

for (const page of pages){
    //Next page 
    config.params.cursor = page

    //get data
    const json = await getAirbnbPageData(config)

    //Hosting data 
    if (false) console.log(findAllPathsOfNestedObject(json, 'listing'))
    hosts = hosts.concat( json.niobeMinimalClientData[0][1].data.presentation.staysSearch.results.searchResults )
}

//mapping data 
const mapping = {
    latitude: "listing.coordinate.latitude",
    longitude: "listing.coordinate.longitude",
    title: "listing.title", 
    id: "listing.id", 
    name: "listing.name", 
    primaryLine:"listing.structuredContent.primaryLine.0.body",
    secondaryLine:"listing.structuredContent.secondaryLine.0.body",
    rating: "avgRatingLocalized",
    numberOfAdults: "listingParamOverrides.adults", 
    checkin: "listingParamOverrides.checkin",
    checkout: "listingParamOverrides.checkout", 
    pricePerNight: "pricingQuote.structuredStayDisplayPrice.primaryLine.accessibilityLabel", 
    totalPrice : "pricingQuote.structuredStayDisplayPrice.secondaryLine.accessibilityLabel", 
}

const mappedHosts = hosts.map(el => {
    const hosting = {}
    for (const [mapKey, mapValue] of Object.entries(mapping)){
        hosting[mapKey] = getValueONestedObjectFromPath(el, mapValue)
    }
    return hosting
});

if (true) console.log(mappedHosts)

//filter on localisation

