
import axios from "axios";
import { storageService } from "./async-storage.service";

const DATA_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=medical&api-key=G9uYEwGAIAAbvA01jyKSm7MyRp6pM7iV";

const STORAGE_KEY = 'news'

export const newsService = {
  query,
}

async function query() {
  try {
     const news = await storageService.query(STORAGE_KEY)
    if(news.length === 0 ){
        const {data} = await axios.get(DATA_URL);
        const news = data.response.docs
        await storageService.saveToStorge(STORAGE_KEY,news)
        return news
    }
    return news
  } catch (err) {
    console.log('Had error bringing patients', err)
  }
}
