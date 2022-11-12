import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath:'ShazamCoreApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders:(headers)=>{
            headers.set('X-RAPIDAPI-KEY','a85f770101msh77ad8f0e98ba96cp1c648cjsn9c34ff805696');

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