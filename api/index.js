import { Headers } from 'node-fetch';
import useSWR from 'swr'

const demodaoKey = process.env.DD_API_KEY;
const demodao = process.env.DD_API_ROOT;
const demodaoHeaders = {
  'x-api-key':  demodaoKey,
  'accept': "*/*"
}

const meta = {
	'Content-Type': 'text/xml'
};
const ddHeaders = new Headers(demodaoHeaders);

const fetcher = (...args) => fetch(...args).then((res) => res.json())
const fetcherDD = (url) => fetch(
  url,
  {  
    headers: demodaoHeaders
  }
).then(
  (res) => res.json()
)


export function downloadContract(listId) {
  const { data, error } = useSWR(`/api/list/contract?listId=${listId}`, fetcher)

  return { data, error }
}

export function uploadCSV(name = '', csv = {}) {
  const postUrl = `/api/list/upload/csv_name=${name}`;
  const { data, error } = useSWR(postUrl, fetcher)

  const poster = async () => await fetcher(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(csv),
  });
  if (!poster) {

  }

  return { data, error }
}


export function searchUser(key = '') {
  const { data, error } = useSWR(`/api/user/search/${key}`, fetcher)

  return { data, error }
}

export function searchOffer() {
  const { data, error } = useSWR(`/api/offer/list`, fetcher)

  return { data, error }
}

export function searchUserByName(name = '') {
  const { data, error } = useSWR(`/api/user/search?username=${name}`, fetcher)

  return { data, error }
}


export function pageUsers(from = 0, to = 10, searchString = '', organizationId = null, mode = 'dao') {
  if (mode == 'dao') {
    if (organizationId) {
      const { data, error } = useSWR(`${demodao}/organizations/${organizationId}/top_active_in_organization?orderBy=proposalsCount`, fetcherDD);
      return { ...data, error }
    }
    const { data, error } = useSWR(`/api/user/page?from=${from}&to=${to}&searchString=${searchString}`, fetcher)
    return { ...data, error }
  } else {
    const { data, error } = useSWR(`/api/target?id=${organizationId}`, fetcher)
    return { ...data, error }
  }
}

export function daoList() {
  const { data, error } = useSWR([`${demodao}/organizations`, ddHeaders], fetcherDD)
  return { ...data, error }
}

export function getTopActiveMembers (organizationId) {
  return fetcherDD(`${demodao}/organizations/${organizationId}/top_active_in_organization?orderBy=proposalsCount`)
}

export async function daoListDD() {
  return fetcherDD(`${demodao}/organizations`)
}
