export class Strike {
  lat: number
  lng: number
  title: string
  permalink: string
  date: Date
  outdated: boolean

  constructor(json) {
    this.lat = json.lat
    this.lng = json.lng
    this.title = json.title
    this.permalink = json.permalink
    this.date = new Date(json.date);
    this.outdated = isOutdated(this.date)
  }
}

export function ParseStrikes(json: any[]): Strike[] {
    return json.map(function(element) {
        return new Strike(element)
    })
}

function isOutdated(date: Date): boolean {
  const diff = new Date().getTime() - date.getTime()
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days > 7
}