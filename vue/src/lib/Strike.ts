export interface ISetikeJSON {
    lat: number
    lng: number
    title: string
    date:  string
}

export class Strike {
    lat: number
    lng: number
    title: string
    date: Date
    outdated: boolean

  constructor(json: ISetikeJSON) {
    this.lat = json.lat
    this.lng = json.lng
    this.title = json.title
    this.date = new Date(json.date);
    this.outdated = isOutdated(this.date)
  }
}

export function ParseStrikes(json: ISetikeJSON[]): Strike[] {
    return json.map(function(element) {
        return new Strike(element)
    })
}

function isOutdated(date: Date): boolean {
  const diff = new Date().getTime() - date.getTime()
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days > 7
}