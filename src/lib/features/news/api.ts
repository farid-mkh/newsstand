import { NYTArticle, NewsModel, NewsorgArticle } from "@/types";
import axios from "axios";

interface NYTQuery {
    q?: string;
    page?: number | string;
    sort?: "oldest";
    from?: string;
    category?: string;
}

export const fetchNYTHome = async (params: NYTQuery = {}) => {
    const queries = { ...params };
    if (queries.hasOwnProperty("from")) {
        delete queries.from;
        Object.assign(queries, { "from-date": params.from });
    }
    if (queries.hasOwnProperty("category") && queries.category) {
        delete queries.category;
        // fq: Filter Query Fields ex: news_desk:("Sports", "Foreign","Arts","Books","Cars","Health","Technology")
        Object.assign(queries, {
            fq: `news_desk:("${params.category?.toLowerCase()}")`,
        });
    }
    try {
        const { data } = await axios.get(
            `${process.env.nyt_api_url}/search/v2/articlesearch.json`,
            {
                params: {
                    ...queries,
                    "api-key": process.env.nyt_api_key,
                },
            }
        );
        return data.response.docs.map((article: NYTArticle) => ({
            title: article.headline.main,
            published_at: article.published_date,
            description: article.abstract,
            img: article.multimedia?.length
                ? `https://static01.nyt.com/${article.multimedia[0].url}`
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6dtqA3NU1wthgTlOth4Y7WE4kl7M-b6z8g&usqp=CAU",
            source: "NYT",
        }));
    } catch (e) {
        throw e;
    }
};

interface NewsorgQuery {
    q?: string;
    country?: string;
    category?: string;
    page?: number | string;
    pageSize?: number | string; // default 20
    from?: string;
    to?: string;
}

export const fetchNewsorgHome = async (params: NewsorgQuery = {}) => {
    try {
        const { data } = await axios.get(
            `${process.env.newsorg_api_url}/top-headlines`,
            {
                params: {
                    ...params,
                    apiKey: process.env.newsorg_api_key,
                },
            }
        );
        return data.articles
            .map((i: any) => ({
                title: i.title,
                img:
                    i.urlToImage ??
                    "data:image/png;base64,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",
                description: i.description,
                published_at: i.publishedAt,
                source: "newsapi.org",
            }))
            .filter((i: NewsModel) => i.title.trim() !== "[Removed]");
    } catch (e) {
        throw e;
    }
};

interface GuardianQuery {
    q?: string;
    from?: string;
}

export const fetchGuardianHome = (params: GuardianQuery = {}) => {
    const queries = { ...params };
    if (queries.hasOwnProperty("from")) {
        delete queries.from;
        Object.assign(queries, { "from-date": params.from });
    }
    return axios
        .get(`${process.env.guardian_api_url}/search`, {
            params: {
                ...queries,
                "show-blocks": "all",
                "api-key": process.env.guardian_api_key,
            },
        })
        .then(({ data }) => {
            return data.response.results
                .map((articles: NewsorgArticle) =>
                    articles.blocks.body
                        .map((a: any) =>
                            a.attributes.title
                                ? {
                                      title: a.attributes.title,
                                      description: a.bodyTextSummary,
                                      published_at: a.publishedDate,
                                      img: "https://reaction.life/wp-content/uploads/elementor/thumbs/shutterstock_1746904922-pupwo0eiy2a1hf4r6j1fpi35oni1d81g3t2odz46u0.jpg",
                                      source: "guardian",
                                  }
                                : null
                        )
                        .filter((i: NewsModel) => !!i)
                )
                .flat();
        })
        .catch((e) => {
            throw e;
        });
};
