function truncateUrl(url: string) {
  return url.slice(0, 15) + '…' + url.slice(-10)
}

function truncateStr(address: string, shrinkInidicator?: string) {
  return address.slice(0, 4) + (shrinkInidicator || '…') + address.slice(-4)
}

export { truncateUrl, truncateStr }
