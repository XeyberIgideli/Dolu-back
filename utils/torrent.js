import TorrentSearchApi from 'torrent-search-api'
TorrentSearchApi.enableProvider('1337x')

async function torrentSearch(title) {
      const torrents = await TorrentSearchApi.search(title, 'Movies', 5)
      const torrentFiltered = torrents.filter(torrent => torrent.seeds > 3 && torrent.size < '1.3 GB' )
      const magnet = await TorrentSearchApi.getMagnet(torrentFiltered[0])
      return magnet
} 

export {torrentSearch}