import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const shazamCoreApi = createApi({
    reducerPath:'ShazamCoreApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders:(headers)=>{
            headers.set('X-RAPIDAPI-KEY','41459ffa84mshedf0d1731254d2ap1a40b7jsnadff3c037d6c');

            return headers;
        },
    }),
    endpoints:(builder)=>({
        getTopCharts:builder.query({ query: () =>'/charts/world'}),
        getSongsByGenre:builder.query({query:(genre)=>`/charts/genre-world?genre_code=${genre}`}),
        getSongDetails:builder.query({query:({songid})=>`/tracks/details?track_id=${songid}`}),
        getSongRelated:builder.query({query:({songid})=>`/tracks/related?track_id=${songid}`}),
        getArtistDetails:builder.query({query:(artistId)=>`/artists/details?artist_id=${artistId}`}),
        getSongsByCountry:builder.query({query:(countryCode)=>`/charts/country?country_code=${countryCode}`}),
        getSongsBySearch:builder.query({query:(searchTerm)=>`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
    }),
});
export const{
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
}=shazamCoreApi;