import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetCategoryPlaylistQuery } from '../redux/apiStore/SpotifyAPI';
import { ListPlaylist, Loader } from '../components';

const Genre = () => {

    const params = useParams();
    console.log(params);
    
    const {data : categoryData, isFetching: isDataLoading} = useGetCategoryPlaylistQuery(params.id);

    console.log(categoryData);

    if (isDataLoading){
		return (
			<Loader/>
		)
	}

    return (
        <div className='flex flex-col p-5 gap-5'>
            <div className="flex text-7xl font-semibold pt-20">{categoryData?.message}</div>
            <ListPlaylist dataList={categoryData?.playlists.items}/>
        </div>
    )
}

export default Genre