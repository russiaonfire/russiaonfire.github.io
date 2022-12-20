export class Strike {
  constructor(json) {
    this.lat = json.lat
    this.lng = json.lng
    this.title = json.title
    this.permalink = json.permalink
    this.date = new Date(json.date);
    this.outdated = isOutdated(this.date)
  }
}

export function ParseStrikes(json) {
    return json.map(function(element) {
        return new Strike(element)
    })
}

/**
 * 
 * @param {Date} date 
 * @returns {Boolean}
 */
function isOutdated(date) {
  const diff = new Date().getTime() - date.getTime()
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days > 7
}