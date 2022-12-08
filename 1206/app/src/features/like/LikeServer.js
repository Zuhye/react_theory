import { useGetLikesQuery, useSetLikeMutation } from '../../app/api';


const LikeServer = ()=> {

    const {data, isLoading} = useGetLikesQuery();
    const [setLike] = useSetLikeMutation();

    if(isLoading) {
        return "Loading..."
    }
    
    return <div>
        <button className='likeBtn' onClick={()=> {
            setLike({count: data.count+1})
        }}>좋아요({data.count})</button>
    </div>
}

export default LikeServer;