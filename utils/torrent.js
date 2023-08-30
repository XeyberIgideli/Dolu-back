import TorrentSearchApi from 'torrent-search-api'
TorrentSearchApi.enableProvider('1337x')

async function torrentSearch(title,index) { 
      const torrents = await TorrentSearchApi.search(title, 'All', 5)
      if(torrents.length === 0) {
            console.log('No torrent found!')
            return;
      } 
      const torrentFiltered = torrents.filter(torrent => torrent.seeds > -1 && Number(torrent.size.split(' ')[0]) < 1300 )
      const magnet = await TorrentSearchApi.getMagnet(torrentFiltered[index])
      // const torrentHtmlDetail = await TorrentSearchApi.getTorrentDetails(torrentFiltered[0])
      return magnet
} 

export {torrentSearch}