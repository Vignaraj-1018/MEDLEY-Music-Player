import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyAPI = createApi({
    reducerPath:"spotifyAPI",
    baseQuery:fetchBaseQuery({
        baseUrl: "https://helper-api-vignu.el.r.appspot.com/medley"
    }),
    endpoints: (builder) => ({
        getDiscoverList: builder.query({ query:(country) => `/discover?country=${country}`}),
        getTrendingList: builder.query({ query:(country) => `/trending?country=${country}`}),
        getFeaturedList: builder.query({ query:(country) => `/featured?country=${country}`}),
        getNewReleasesList: builder.query({ query:(country) => `/newreleases?country=${country}`}),
        getHomeList: builder.query({ query:(country) => `/home?country=${country}`}),
        search: builder.query({ query:(query, country, type) => `/search?country=${country}&query=${query}&type=${type}`}),
        getPlaylist: builder.query({ query:(id, country) => `/playlist?id=${id}&country=${country}`}),
        getAlbum: builder.query({ query:(id, country) => `/album?id=${id}&country=${country}`}),
        getArtist: builder.query({ query:(id, country) => `/artist?id=${id}&country=${country}`}),
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
    useGetArtistQuery
} = spotifyAPI;