export const getNotes = async (subdomain: string, apikey: string) => {
  const siteData = await fetch(`https://${siteDomain}.daftra.com/api2/site_info`, {
    headers: {
      'Content-Type': 'application/json',
      'apiKey': apikey,
    },
  })
  const data = await siteData.json()
  // siteInfo.value =
  console.log(data)
}

export interface Note {
  id: string
  body: string
  date: string
  author: string
  path: string
}
export const filteredNotes = (notes: Note[]): Array<Note> => {
  const thisUrlPath: string = window.location.pathname
  return notes.filter((note: Note) => (note.path === '/work-orders'))
}
