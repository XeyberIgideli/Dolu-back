const WebTorrent = require('webtorrent')
const client = new WebTorrent()

const torrentID = 'https://zoink.ch/torrent/Ahsoka.S01E02.720p.WEB.x265-MiNX[eztv.re].mkv.torrent'

      client.add(torrentID, function (torrent) {
       const file = torrent.files.find(function (file) {
         return file.name.endsWith('.mkv')
       }) 
       console.log(file)
})