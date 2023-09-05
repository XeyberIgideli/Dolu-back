import TorrentSearchApi from 'torrent-search-api'
TorrentSearchApi.enableProvider('1337x')

async function torrentSearch(title,index) { 
      const torrents = await TorrentSearchApi.search(title, 'All', 5)
      if(torrents.length === 0) {
            console.log('No torrent found!')
            return;
      } 
      const torrentFiltered = torrents.filter(torrent => {
           let sizeInMB = parseFloat(torrent.size)
           if (torrent.size.includes("GB")) {
            sizeInMB *= 1024; // 1 GB = 1024 MB
          }
           return torrent.seeds > -1 && sizeInMB < 1300 
      })
      const magnet = await TorrentSearchApi.getMagnet(torrentFiltered[index])
      return magnet
} 

export {torrentSearch}