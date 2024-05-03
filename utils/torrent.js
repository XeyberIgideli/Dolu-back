import torrentApi from "@pardaillan/torrent-api"


const torrentSource =  await torrentApi.setSource("1377x")

async function torrentSearch(title,index) {  
      const torrents = await torrentSource.search({query: title, size: 1300})
      if(torrents.length === 0) {
            console.log('No torrent found!')
            return;
      } 
     
      const magnet = await torrentSource.getMagnet(torrents[index])  
      
      return magnet
} 
 
export {torrentSearch}