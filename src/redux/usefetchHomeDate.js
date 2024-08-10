import { useGetDiscoverListQuery, useGetTrendingListQuery, useGetFeaturedListQuery, useGetNewReleasesListQuery, useGetHomeListQuery } from './apiStore/SpotifyAPI.js';

const useFetchHomeData = () => {

    const discoverQuery = useGetDiscoverListQuery();
    const trendingQuery = useGetTrendingListQuery();
    const featuredQuery = useGetFeaturedListQuery();
    const newReleasesQuery = useGetNewReleasesListQuery();
    const homeQuery = useGetHomeListQuery();

    const data = {
        discoverList: discoverQuery.data,
        trendingList: trendingQuery.data,
        featuredList: featuredQuery.data,
        newReleasesList: newReleasesQuery.data,
        homeList: homeQuery.data,
    };

    const isFetching = discoverQuery.isFetching || trendingQuery.isFetching || featuredQuery.isFetching || newReleasesQuery.isFetching || homeQuery.isFetching;

    const errors = {
        discoverListFetchError: discoverQuery.error,
        trendingListFetchError: trendingQuery.error,
        featuredListFetchError: featuredQuery.error,
        newReleasesListFetchError: newReleasesQuery.error,
        homeListFetchError: homeQuery.error,
    };

    return { data, isFetching, errors };
};

export default useFetchHomeData;
