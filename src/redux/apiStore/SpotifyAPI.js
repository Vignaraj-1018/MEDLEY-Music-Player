import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyAPI = createApi({
    reducerPath:"spotifyAPI",
    baseQuery:fetchBaseQuery({
        baseUrl: "https://helper-api-vignu.el.r.appspot.com/medley",
        prepareHeaders: (header) =>{
            const country = sessionStorage.getItem("country");
            if (country) {
                header.set("country", country);
            }
            return header;
        }
    }),
    endpoints: (builder) => ({
        getDiscoverList: builder.query({ query:() => `/discover`}),
        getTrendingList: builder.query({ query:() => `/trending`}),
        getFeaturedList: builder.query({ query:() => `/featured`}),
        getNewReleasesList: builder.query({ query:() => `/newreleases`}),
        getHomeList: builder.query({ query:() => `/home`}),
        search: builder.query({ query:(query, type) => `/search?query=${query}&type=${type}`}),
        getPlaylist: builder.query({ query:(id) => `/playlist?id=${id}`}),
        getAlbum: builder.query({ query:(id) => `/album?id=${id}`}),
        getArtist: builder.query({ query:(id) => `/artist?id=${id}`}),
        getCategoryPlaylist: builder.query({ query:(id) => `/category?id=${id}`})
    })
});

export const {
    useGetDiscoverListQuery,
    useGetTrendingListQuery,
    useGetFeaturedListQuery,
    useGetNewReleasesListQuery,
    useGetHomeListQuery,
    useSearchQuery,
    useGetPlaylistQuery,
    useGetAlbumQuery,
    useGetArtistQuery,
    useGetCategoryPlaylistQuery
} = spotifyAPI;